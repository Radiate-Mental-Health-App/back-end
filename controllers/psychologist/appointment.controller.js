const db = require("../../models");
const Appointment = db.appoinment;
const Schedule = db.schedule;

const schedule = require("node-schedule");

// // Buat aturan penjadwalan menggunakan node-schedule untuk mengupdate status appointment sesuai current time
const job = schedule.scheduleJob("*/60 * * * * *", async function () {
  // Ambil waktu real-time saat ini
  const currentTime = new Date();

  // Cari appointment dengan status "Scheduled"
  const appointments = await Appointment.find().populate("scheduleId");

  // Loop melalui appointment yang ditemukan
  for (const appointment of appointments) {
    // Ambil waktu mulai dan waktu selesai dari timeslots
    const startTime = new Date(appointment.scheduleId.timeSlots.startTime);
    const endTime = new Date(appointment.scheduleId.timeSlots.endTime);

    // Periksa apakah waktu real-time saat ini berada dalam rentang timeslots
    if (appointment.status == "Scheduled") {
      if (currentTime >= startTime && currentTime <= endTime) {
        // Ubah status appointment menjadi "In Progress"
        appointment.status = "In Progress";
        await appointment.save();
        console.log(
          `Status appointment ${appointment._id} diubah menjadi 'In Progress'`
        );
      }
    } else if (appointment.status == "In Progress") {
      if (currentTime >= endTime) {
        appointment.status = "Completed";
        await appointment.save();
        console.log(
          `Status appointment ${appointment._id} diubah menjadi 'Completed'`
        );
      }
    } else if (appointment.status == "Waiting for Payment") {
      if (currentTime >= startTime) {
        appointment.status = "Expired";
        await appointment.save();
        console.log(
          `Status appointment ${appointment._id} diubah menjadi 'Expired'`
        );
      }
    } else {
      console.log("tidak ada perubahan status appointment");
    }
  }
});
// Memulai penjadwalan
// job;

// Create and save a new appointment
exports.create = async (req, res) => {
  const userId = req.decoded.id;
  const { psychologistId, scheduleId, package, amount } = req.body;

  try {
    const schedule = await Schedule.findById(scheduleId);
    if (schedule.isBooked) {
      res.status(400).json({ success: false, message: "Schedule has booked" });
    } else {
      await Schedule.findByIdAndUpdate(
        scheduleId,
        { isBooked: true },
        { useFindAndModify: false }
      );

      const newAppointment = new Appointment({
        psychologistId: psychologistId,
        userId: userId,
        scheduleId: scheduleId,
        package: package,
        status: "Waiting for Payment",
        amount: amount,
        orderTime: new Date().toLocaleString(),
      });

      await newAppointment.save();

      res.status(201).json({ success: true, newAppointment });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message:
        err.message || "An error occurred while creating a new appointment",
    });
  }
};

// Get a list of all appointment
exports.findAll = async (req, res) => {
  try {
    let appointments;
    if (req.decoded.roles == "ROLE_PSYCHOLOGIST") {
      appointments = await Appointment.find({
        psychologistId: req.decoded.id,
      }).populate("scheduleId");
    } else if (req.decoded.roles == "ROLE_USER") {
      appointments = await Appointment.find({
        userId: req.decoded.id,
      }).populate("scheduleId");
    } else {
      appointments = await Appointment.find();
    }

    if (appointments.length <= 0) {
      return res.status(404).json({ message: "No appointments found" });
    }

    res.status(200).json({
      message: "Success get all appointments",
      data: {
        appointments,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "An error occurred while retrieving appointments",
    });
  }
};

// Get appointment by id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res
        .status(404)
        .json({ message: `No appointment found with id ${id}` });
    }

    res.json(appointment);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error retrieving appointment with id ${id}` });
  }
};

exports.updateStatus = async (req, res) => {
  const id = req.params.id;
  const status = req.body.status;

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: req.body.status },
      { useFindAndModify: false }
    );

    if (status == "Scheduled") {
      await Appointment.findByIdAndUpdate(
        id,
        { paymentTime: new Date() },
        { useFindAndModify: false }
      );
    }

    if (status == "Canceled") {
      await Schedule.findByIdAndUpdate(
        appointment.scheduleId,
        { isBooked: false },
        { useFindAndModify: false }
      );
    }

    if (!appointment) {
      return res.status(404).send({
        message: `Cannot update appointment with id=${id}`,
      });
    }

    res.send({ message: "Appointment was updated successfully." });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error updating appointment with id=" + id });
  }
};

// Delete appointment by id
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const appointment = await Appointment.findByIdAndRemove(id);

    if (!appointment) {
      return res.status(404).send({
        message: `Cannot delete appointment with id=${id}`,
      });
    }

    res.send({ message: "Appointment was deleted successfully!" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Could not delete appointment with id=" + id });
  }
};
