const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true  
    },
    createdDate: {
        type: Date
    }
});

const post = mongoose.model("post", PostSchema);

module.exports = post;