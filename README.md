# ☀️Radiate: Mental Health Web Application


This is the documentation for a web application which developed for Independent Capstone Project Fullstack Engineering path on Generasi GIGIH 3.0 Program.

In this project, we utilize MERN as the tech stack. Node.js and Express.js are used for building the API(s), MongoDB for the database, and React.js for building the user interfaces. We also use Chakra UI as the component library.


## Table of Contents
-    Overview
-    Technology
-    Features
-    How to Install and Run the Project
-    How to Run the Container
-    Database Schema
-    API(s) Structure

## 📃 Overview 
Radiate is a web application dedicated to fostering mental well-being by providing users with essential tools to manage and improve their mental health. Empowering individuals to understand, express, and seek support, Radiate combines a mood tracker, journal writing, appointment booking with a licensed psychologist, and a chatbot.

Radiate also provides psychologist with the flexibility to add their schedules, check on the booked appointments, as well as a dashboard to help them organize their work.

Aside from the users and psychologists, Radiate is complemented with an admin-role feature to manage users, psychologists, and the chatbot.

Radiate is developed with the hope of helping people to be concerned and appreciate more about what they feel and what they have in mind, moreover, to encourage people to seek help from professionals for a better mental state and achieve peace.


---

## Technology
- Node JS
- Express JS

---

## 🗄️ Features
Radiate has 3 roles that consist of user, psychologist, and admin. Every role has their own features.

* ### User
* **1. Dashboard**
    * The Dashboard provides users with an overview of their mental health. It prominently displays mood charts, offering a visual representation of mood fluctuations over time. Additionally, it includes a mood log history, allowing users to reflect on their emotional well-being trends.

* **2. Mood Tracker**
    * The Mood Tracker feature empowers users to actively monitor and record their emotional states. Users can log their moods by selecting from a range of options, and they can also note the social and activity circumstances surrounding their mood at a given time. Furthermore, users have the option to add a short description or note to provide context or details about their feelings.
    
* **3. Chatbot**
    * The Chatbot feature is designed to support users in their mental health journey. The chatbot is tailored to address mental health concerns, offering guidance, resources, and a supportive interaction to enhance the user's well-being.


* ### Psychologist
* **1. Dashboard** 
    * The Dashboard provide psychologists a comprehensive overview of their appointments, schedules, and relevant statistics.
* **2. Schedule**
    * The Schedule feature helps psychologists to efficiently manage their schedules: organizing appointments and availability for counseling sessions.
* **3. Appointment**
    * The Appointment feature enables psychologists to view, schedule, and manage counseling appointments with users.
* **4. Profile**
    * The Profile allows psychologists to maintain and update their professional profiles, including details such as qualifications, expertise, specialties, and other relevant information.

* ### Admin
* **1. Dashboard**
    * The Dashboard for administrators offers an overview of the platform's activity. It displays key metrics such as the number of registered users and psychologists. Additionally, it includes a table that provides details on scheduled appointments between psychologists and users, facilitating efficient management of appointments.

* **2. User Management**
    * The User Management feature allows admins to manage user accounts, overseeing user registration, authentication, and access control.

* **3. Psychologists Management**
    * The Psychologists Management feature allows admins to manage psychologist profiles, ensuring accurate information and overseeing the allocation of counseling resources.

* **4. QNA (Chatbot Management)**
    * The QNA (Chatbot Management) feature allows admins to manage the chatbot's content and responses, ensuring users receive relevant and accurate information.

---

## 🛠️ Installation Steps
1. Clone the Repository
Clone the backend repository using Git:
    ```
    git clone https://github.com/Radiate-Mental-Health-App/back-end.git
    ```
2. Install Dependencies
Navigate to the project directory and install the required dependencies:
    ```
    cd back-end
    npm install
    ```
3. Start the Server
Initiate the server by running the following command:
    ```
    npm start
    ```
    The server should be running on http://localhost:5000

---

## 🧰 How to Run the Container
Make sure you have the following installed on your machine:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
1. Clone the repository:

   ```bash
   git clone https://github.com/Radiate-Mental-Health-App/back-end.git
   cd back-end
2. Create a .env file in the root of the project with the necessary environment variables. Refer to the provided .env.example for guidance.
3. Build and start the Docker containers:
    ```bash
    docker-compose up --build
4. To stop the running containers, press `Ctrl + C` in the terminal where ``docker-compose up`` is running.
5. To remove the containers and associated resources, run:
    ```
    docker-compose down

---

##  🗃️ Database Schema
MongoDB is utilized to store data (document).
![db-schema](https://hackmd.io/_uploads/HyQfr2yEa.png)
![user role database schema-Page-2 (1)](https://github.com/Radiate-Mental-Health-App/back-end/assets/39270680/d90aec57-62af-496f-b6d4-4ed7ca1434df)



The models include:
`Admin` `Appointment` `Category` `CommentCourse` `CounselingResult` `Course` `JournalEntry` `JournalPrompt` `MoodEntry` `PostCourse` `Psychologist` `Qna` `Role` `Schedule` `SelfAssessmentResult` `SelfAssessmentType` `User`


#### `admin`

| Field         | Type                      | Description                                    |
|---------------|---------------------------|------------------------------------------------|
| email         | String (required, unique) | Unique email for admin                        |
| password      | String (required)         | Admin password                                |
| role          | ObjectId (ref: "Role")    | Role reference for the admin                |


#### `appointment`

| Field         | Type                      | Description                                    |
|---------------|---------------------------|------------------------------------------------|
| psychologistId| ObjectId (ref: "Psychologist") | ID of the psychologist.                   |
| userId        | ObjectId (ref: "User")    | ID of the user.                               |
| scheduleId    | ObjectId (ref: "Schedule")| ID of the schedule.                            |
| package       | Array of Strings (required)| ["Video Call", "Voice Call", "Chat Message"]  |
| status        | String (required)         | Status of the appointment.                     |
| amount        | Number (required)         | Amount related to the appointment.             |
| orderTime     | Date (required)           | Timestamp of order.                            |
| paymentTime   | Date                      | Timestamp of payment.                          |
| userProblem   | String                    | Description of user's problem.                 |
| linkSession   | String                    | URL link for the session.                      |

#### `category`

| Field         | Type                      | Description                                    |
|---------------|---------------------------|------------------------------------------------|
| name          | String (required)         | Category name.                                 |

#### `commentCourse`

| Field         | Type                      | Description                                    |
|---------------|---------------------------|------------------------------------------------|
| name          | String (required)         | Commenter's name.                              |
| postId         | String (required)        | Identifier of the associated post.             |
| date          | String (required)         | Date of the comment.                           |
| comments      | String (required)         | Content of the comment.                        |

#### `counselingResult`

| Field         | Type                      | Description                                    |
|---------------|---------------------------|------------------------------------------------|
| psychologistId| ObjectId (ref: "Psychologist") | ID of the psychologist.                   |
| userId        | ObjectId (ref: "User")    | ID of the user.                                |
| scheduleId    | ObjectId (ref: "Schedule")| ID of the schedule.                            |
| observationResult | String (required)   | Observations made.                             |
| interviewResult | String (required)     | Interview insights.                            |
| personalityDynamics | String (required) | Personality dynamics.                         |
| problems      | Enum                      | Problem type - ["Career & HR", "Relationship", "Mood & Emotion"]|
| solutionAndAssignment | String (required) | Suggested solutions/assignments.              |
| conclusion    | String (required)         | Counseling conclusion.                         |

#### `course`

| Field         | Type                      | Description                                    |
|---------------|---------------------------|------------------------------------------------|
| courseTitle   | String (required, unique) | Title of the course.                           |
| courseDescription | String (required)    | Description of the course.                     |
| courseContent | Array                     | Array of course content.                       |
| categories    | Array                     | Array of course categories.                    |
| publishedDate | Date                      | Date of course publication.                    |

#### `journalEntry`

| Field         | Type                      | Description                                    |
|---------------|---------------------------|------------------------------------------------|
| title         | String                    | Title of the entry.                            |
| journalPrompt | ObjectId (ref: "JournalPrompt") | Associated journal prompt ID.            |
| date          | Date                      | Date of the journal entry.                     |
| note          | String                    | Content/note of the entry.                     |

#### JournalPrompt

| Field         | Type                      | Description                                    |
|---------------|---------------------------|------------------------------------------------|
| question      | String                    | Journal prompt question.                        |

#### `moodEntry`

| Field         | Type                      | Description                                    |
|---------------|---------------------------|------------------------------------------------|
| moodValue     | String (enum)             | Mood value - ["Terrible", "Sad", "Okay", "Good", "Wonderful"] |
| social        | Array of Strings (enum)   | Social aspects.                                |
| activities    | Array of Strings          | Associated activities.                         |
| moodNote      | String                    | Additional notes.                              |
| date          | Date                      | Date of the mood entry.                        |

#### `postCourse`

| Field         | Type                      | Description                                    |
|---------------|---------------------------|------------------------------------------------|
| title         | String (required, unique) | Title of the post.                             |
| description   | String (required)         | Post description.                              |
| picture       | String                    | Image link for the post.                       |
| email         | String (required)         | Contact email for the post.                    |
| course        | String (required)         | Associated course.                             |
| createdDate   | Date                      | Post creation date.                            |

#### `psychologist`

| Field                   | Type                      | Description                                             |
|------------------------- |---------------------------|---------------------------------------------------------|
| email                   | String (required, unique) | Unique email for psychologists.                          |
| fullName                | String (required)         | Full name of the psychologist.                           |
| password                | String (required)         | Password for the psychologist.                           |
| role                    | ObjectId (ref: "Role")    | Role reference for the psychologist.                     |
| photo                   | String                    | Photo of the psychologist.                               |
| gender                  | String (enum: ["Female", "Male"]) | Gender of the psychologist.                   |
| cityOfResidence          | String                    | City of residence of the psychologist.                    |
| cityOrDistrict           | String                    | City or district of the psychologist.                     |
| whatsappNo              | String                    | Contact number (WhatsApp) for the psychologist.          |
| devicesUsed             | Array of Strings          | Devices used by the psychologist.                         |
| languagesMastered       | String (enum: ["Bahasa", "English"]) | Languages mastered by the psychologist.     |
| levelOfEducation        | String                    | Educational qualification of the psychologist.           |
| currentJob              | String                    | Present occupation/job of the psychologist.              |
| receivedTrainingAsCounselor | Boolean              | Indicates if the psychologist has received training as a counselor. |
| yearsOfExperienceAsCounselor | Number              | Years of experience as a counselor.                       |
| expertiseFields         | Enum                      | Specialized fields of expertise.                         |
| counselingMethod        | Enum                      | Preferred counseling methods.                            |
| cv                      | String                    | Curriculum Vitae of the psychologist.                    |
| bachelorCertificate     | String                    | Certificate for Bachelor's degree.                       |
| certificates            | Array of Strings          | Any additional certificates held by the psychologist.    |
| isVerified                | Boolean (required)        | Status of the psychologist's account.                    |

#### `qna`

| Field         | Type                      | Description                                    |
|---------------|---------------------------|------------------------------------------------|
| Questions     | String                    | Question text.                                 |
| Answers       | String                    | Answer text.                                   |

#### `role`

| Field         | Type                      | Description                                    |
|---------------|---------------------------|------------------------------------------------|
| name          | String                    | Role name.                                     |

#### `schedule`

| Field                   | Type                      | Description                                             |
|------------------------- |---------------------------|---------------------------------------------------------|
| psychologistId          | ObjectId (ref: "Psychologist") | ID of the associated psychologist.               |
| date                    | Date (required)           | Date for the schedule.                                  |
| timeSlots               | Object                    | Time slot object containing start and end times.        |
| isBooked                | Boolean (required)        | Indicates whether the slot is booked or not.            |

#### `selfAssessmentResult`

| Field              | Type                             | Description                                 |
| ------------------ | -------------------------------- | ------------------------------------------- |
| userId             | ObjectId (ref: "User")           | ID of the associated user.                  |
| assessmentDate     | Date                             | Date of the assessment.                     |
| assessmentTypeId   | ObjectId (ref: "AssessmentType") | ID of the associated assessment type.       |
| userResponses      | Array of userResponseSchema      | User responses to the assessment questions.        |
| assessmentScore     | Number                           | Score obtained in the assessment.                  |
| assessmentFeedback  | String                           | Feedback based on the assessment result.           |

    userResponse

| Field      | Type | Description |
| ---------- | ---- | ----------- |
| questionId | ObjectId (ref: AssessmentType.assessmentQuestions._id) | Question ID from the assessment        |
| response   |  String    | Response from the user            |

#### `SelfAssessmentType`

| Field               | Type                              | Description                        |
| ------------------- | --------------------------------- | ---------------------------------- |
| assessmentQuestions | Array of assessmentQuestionSchema | Questions for the assessment type. |

assessmentQuestion


| Field | Type | Description |
| -------- | -------- | -------- |
| questionText     | String     | Assessment questions.     |


#### `user`

| Field                   | Type                                          | Description                                             |
|------------------------- |-----------------------------------------------|---------------------------------------------------------|
| email                   | String (required, unique)                     | Unique email for users.                                  |
| fullName                | String (required)                             | Full name of the user.                                   |
| password                | String (required)                             | Password for the user.                                   |
| role                    | ObjectId (ref: "Role")                        | Role reference for the user.                             |
| photo                   | String                                        | Photo of the user.                                       |
| gender                  | String (enum: ["Female", "Male"])             | Gender of the user.                                      |
| dateOfBirth             | Date                                          | Date of birth of the user.                               |
| cityOfResidence         | String                                        | City of residence of the user.                           |
| cityOfDistrict          | String                                        | City or district of the user.                            |
| whatsappNo              | String                                        | Contact number (WhatsApp) for the user.                  |
| journalPrompts          | Array of ObjectId (ref: "JournalPrompt")       | References to journal prompts related to the user.       |
| journalEntries          | Array of ObjectId (ref: "JournalEntry")        | References to journal entries related to the user.       |
| moodEntries             | Array of ObjectId (ref: "MoodEntry")           | References to mood entries related to the user.          |
| userCourseProgress      | Array of ObjectId (ref: "UserCourseProgress")  | References to course progress related to the user.       |
| selfAssessmentResults   | Array of ObjectId (ref: "SelfAssessmentResult") | References to self-assessment results related to the user.|

#### `userCourseProgress`

| Field                   | Type                      | Description                                             |
|------------------------- |---------------------------|---------------------------------------------------------|
| courseId                | ObjectId (ref: "Course")  | ID of the associated course.                             |
| isCompleted             | Boolean                   | Status indicating if the course is completed.            |
| progressPercentage      | Number                    | Percentage progress of the course.                       |
| lastAccessed            | Date                      | Last accessed date of the course.                        |


---

## 🗃️ API's Structure

link postman : https://www.postman.com/afisina/workspace/radiate/collection/16152694-2c07110d-cb69-4197-8869-1af30ec1cc68?action=share&creator=16152694

### `Authentication`
| Endpoint                   | Method | Description                      |
|----------------------------|--------|----------------------------------|
| `/api/auth/register`         | POST   | Create a new account in the database  |
| `/api/auth/login`         | POST   | Log in and generate a token for user |
| `/api/all`     | GET    | Retrieve public content                    |
| `/api/user`     | GET    | Access user content                      |
| `/api/admin`    | GET    | Access admin content                     |
| `/api/psychologist` | GET | Access psychologist content               |

#### 1. Register
* Route: `POST /api/auth/register`
* Description: Create a new account in the database.
* Request Body:
    ```
    {
      "email": "String",
      "fullName": "String",
      "password": "String",
      "roles": ["String"] // Specify role: "user", "psychologist", "admin"
    }
    ```
* Responses:
    * 200: Account registered successfully
    * 400: Invalid role specified
    * 500: Error occurred while registering the user
##### 2. Login
* Route: `POST /api/auth/login`
* Description: Log in and generate a token for user information and access.
* Request Body:
    ```
    {
      "email": "String",
      "password": "String"
    }
    ```
* Responses:
    * 200: Successful login, user information, and access token generated
    * 401: Invalid password
    * 404: Account not found
    * 500: Error occurred while signing in

### `Role-Based Access`
##### 1. All access content
* Route: `GET /api/all`
* Description: Retrieve public content.
* Responses:
    * 200: Public content retrieved successfully
    
##### 2. Access user content
* Route: `GET /api/user`
* Description: Access user content.
* Responses:
    * 200: User content retrieved successfully

##### 3. Access admin content
* Route: `GET /api/admin`
* Description: Access admin content.
* Responses:
    * 200: Admin content retrieved successfully

##### 4. Access psychologist content
* Route: `GET /api/psychologist`
* Description: Access psychologist content.
* Responses:
    * 200: Psychologist content retrieved successfully

### `Users`

####    Psychologist
| Endpoint                   | Method | Description                      |
|----------------------------|--------|----------------------------------|
| `/api/psychologist`       | GET    | Get all psychologists account             |
| `/api/psychologist/:id`   | GET    | Get one psychologist by ID       |
| `/api/psychologist/:id`   | PUT    | Update psychologist by ID        |
| `/api/psychologist/:id`   | DELETE | Delete psychologist by ID        |
| `/api/psychologist/:id/activated` | PUT | Activate psychologist account by ID |

##### 1. Get All Psychologists
* Route: `GET /api/psychologist`
* Description: Retrieves a list of all psychologists.
* Responses:
    * 200: Successfully retrieved psychologists
    * 404: No psychologists found
    * 500: Error while getting psychologists
    
##### 2. Get Specific Psychologist
* Route: `GET /api/psychologist/:id`
* Description: Retrieves details of a specific psychologist by ID.
* Responses:
    * 200: Successfully retrieved specific psychologist
    * 404: Psychologist not found
    * 500: Error getting psychologist
    
##### 3. Update Psychologist
* Route: `PUT /api/psychologist/:id`
* Description: Updates a specific psychologist by ID.
* Responses:
    * 200: Psychologist was updated successfully
    * 404: Cannot update psychologist, psychologist not found
    * 500: Error updating psychologist
    
##### 4. Delete Psychologist
* Route: `DELETE /api/psychologist/:id`
* Description: Deletes a specific psychologist by ID.
* Responses:
    * 200: Psychologist was deleted successfully
    * 404: Cannot delete psychologist, psychologist not found
    * 500: Could not delete psychologist by ID

##### 4. Activate Psychologist
* Route: `DELETE /api/psychologist/:id`
* Description: Deletes a specific psychologist by ID.
* Responses:
    * 200: Psychologist was deleted successfully
    * 404: Cannot delete psychologist, psychologist not found
    * 500: Could not delete psychologist by ID


#### User
| Endpoint                   | Method | Description                      |
|----------------------------|--------|----------------------------------|
| `/api/user`               | GET    | Get all users                     |
| `/api/user/:id`           | GET    | Get one user by ID                |
| `/api/user/:id`           | PUT    | Update user by ID                 |
| `/api/user/:id`           | DELETE | Delete user by ID
|
##### 1. Get All Users
* Route: `GET /api/user`
* Description: Retrieves a list of all users.
* Responses:
    * 200: Successfully retrieved users
    * 404: No users found
    * 500: Error while getting users
    * 
##### 2. Get Specific User
* Route: `GET /api/user/:id`
* Description: Retrieves details of a specific user by ID.
* Responses:
    * 200: Successfully retrieved specific user
    * 404: User not found
    * 500: Error getting user
    * 
##### 3. Update User
* Route: `PUT /api/user/:id`
* Description: Updates a specific user by ID.
* Responses:
    * 200: User was updated successfully
    * 404: Cannot update user, user not found
    * 500: Error updating user
    * 
##### 4. Delete User
* Route: `DELETE /api/user/:id`
* Description: Deletes a specific user by ID.
* Responses:
    * 200: User was deleted successfully
    * 404: Cannot delete user, user not found
    * 500: Could not delete user by ID


### `Psychologist`
#### Schedule
| Endpoint                   | Method | Description                      |
|----------------------------|--------|----------------------------------|
| `/api/psychologist/schedule`           | POST   | Create a new schedule            |
| `/api/psychologist/schedule/:id`       | GET    | Get all schedules by psychologist|
| `/api/psychologist/schedule/:id`       | GET    | Get schedule details by ID       |
| `/api/psychologist/schedule/:id`       | PUT    | Update a schedule by ID          |
| `/api/psychologist/schedule/:id`       | DELETE | Delete a schedule by ID          |

##### 1. Create New Schedule
* Route: `POST /api/psychologist/schedule`
* Description: Creates and saves a new schedule.
* Request Body:
```
    {
        "psychologistId": "String",
        "date": "String",
        "timeSlots": "Object",
        "isBooked": "Boolean"
    }
```
* Responses:
    * 201: Successfully created a new schedule
    * 500: An error occurred while creating a new schedule

##### 2. Get All Schedules by Psychologist
* Route: `GET /api/psychologist/schedule/:id`
* Description: Gets a list of all schedules by psychologist.
* Responses:
    * 200: Successfully retrieved all schedules
    * 404: No schedules found
    * 500: Internal Server Error
    
##### 3. Get Schedule by ID
* Route: `GET /api/psychologist/schedule/:id`
* Description: Get schedule details by ID.
* Responses:
    * 200: Successfully retrieved schedule
    * 404: No schedule found with the provided ID
    * 500: Internal Server Error

##### 4. Update Schedule
* Route: `PUT /api/psychologist/schedule/:id`
* Description: Updates a schedule by ID.
* Request Body: Data to update the schedule
* Responses:
    * 200: Schedule updated successfully
    * 400: Data to update cannot be empty
    * 404: Schedule not found
    * 500: Error updating the schedule

##### 5. Update Schedule
* Route: `PUT /api/psychologist/schedule/:id`
* Description: Updates a schedule by ID.
* Request Body: Data to update the schedule
* Responses:
    * 200: Schedule updated successfully
    * 400: Data to update cannot be empty
    * 404: Schedule not found
    * 500: Error updating the schedule

#### Appointments
| Endpoint                   | Method | Description                      |
|----------------------------|--------|----------------------------------|
| `/api/appointment`        | POST   | Create a new appointment         |
| `/api/appointment`        | GET    | Get list of all appointments     |
| `/api/appointment/:id`    | DELETE | Delete an appointment            |
| `/api/appointment/:id`    | PUT    | Update appointment details       |
| `/api/appointment/:id`    | GET    | Get appointment details by ID   |

##### 1. Create New Appointment
* Route: `POST /api/appointment`
* Description: Creates and saves a new appointment.
* Request Body:
    ```
    {
      "psychologistId": "String",
      "scheduleId": "String",
      "package": "String",
      "amount": "Number"
    }
    ```
* Responses:
    * 201: Successfully created a new appointment
    * 400: Bad Request, invalid input parameters.
    * 404: Schedule already booked or appointment not found.
    * 500: Internal Server Error

##### 2. Get All Appointments
* Route: `GET /api/appointment`
* Description: Gets a list of all appointments based on user roles.
* Responses:
    * 200: Successfully retrieved all appointments
    * 404: No appointments found
    * 500: Internal Server Error

##### 3. Get Appointment by ID
* Route: `GET /api/appointment/:id`
* Description: Get appointment details by ID.
* Responses:
    * 200: Successfully retrieved appointment
    * 404: No appointment found with the provided ID
    * 500: Internal Server Error

##### 4.  Update Appointment Status
* Route: `PUT /api/appointment/:id`
* Description: Updates appointment status by ID.
* Request Body: { "status": "String" }
* Responses:
    * 200: Successfully updated appointment status
    * 404: Cannot update appointment with the provided ID
    * 500: Internal Server Error

##### 5. Delete Appointment
* Route: `DELETE /api/appointment/:id`
* Description: Deletes an appointment by ID.
* Responses:
    * 200: Appointment deleted successfully
    * 404: Cannot delete appointment with the provided ID
    * 500: Internal Server Error

#### Counseling Results
| Endpoint                           | Method | Description                      |
|------------------------------------|--------|----------------------------------|
| `/api/counselres`          | POST   | Create a new counseling result   |
| `/api/counselres`          | GET    | Get all counseling results       |
| `/api/counselres/:id`      | GET    | Get counseling result by ID      |
| `/api/counselres/:id`      | PUT    | Update counseling result by ID   |
| `/api/counselres/:id`      | DELETE | Delete counseling result by ID   |

##### 1. Create New Counseling Result
* Route: `POST /api/counselres`
* Description: Creates and saves a new counseling result.
* Request Body:
    ```
    {
      "psychologistId": "String",
      "userId": "String",
      "scheduleId": "String",
      "observationResult": "String",
      "interviewResult": "String",
      "personalityDynamics": "String",
      "problems": "String",
      "solutionAndAssignment": "String",
      "conclusion": "String"
    }
    ```
* Responses:
    * 201: Successfully created a new counseling result
    * 500: Error occurred while creating a new counseling result

##### 2. Get All Counseling Results
* Route: `GET /api/counselres`
* Description: Gets a list of all counseling results.
* Responses:
    * 200: Successfully retrieved all counseling results
    * 404: No counseling results found
    * 500: Internal Server Error

##### 3. Get Counseling Result by ID
* Route: `GET /api/counselres/:id`
* Description: Get counseling result details by ID.
* Responses:
    * 200: Successfully retrieved counseling result
    * 404: No counseling result found with the provided ID
    * 500: Internal Server Error
    
##### 4. Update Counseling Result
* Route: `PUT /api/counselres/:id`
* Description: Updates counseling result by ID.
* Request Body: Data to update the counseling result
* Responses:
    * 200: Counseling result updated successfully
    * 404: Cannot update counseling result with the provided ID
    * 500: Internal Server Error

##### 5. Delete Counseling Result
* Route: `DELETE /api/counselres/:id`
* Description: Deletes a counseling result by ID.
* Responses:
    * 200: Counseling result deleted successfully
    * 404: Cannot delete counseling result with the provided ID
    * 500: Internal Server Error

### `QNA`
| Endpoint                   | Method | Description                      |
|----------------------------|--------|----------------------------------|
| `/api/qna/addqna`          | POST   | Create a new QnA                 |
| `/api/qna/getQnas`    | GET    | Get QnAs for chatbot             |
| `/api/qna/deleteQna:id` | DELETE | Delete QnA by ID                 |
| `/api/qna/updateQna/:id` | PUT|Update QnA by ID                 |
| `api/qna/getQna/:id`|GET| Get Qna by ID          |

##### 1. Add QnA for Article
* Route: `POST /api/qna/addqna`
* Description: Creates a QnA entry related to an article.
* Request Body:
    ```
    {
      "Questions": "String",
      "Answers": "String"
    }
    ```
* Responses:
    * 201: Successfully created QnA
    * 500: Error while creating a new QnA
    
##### 2. Get QnA for Chatbot
* Route: `GET /api/qna/getQnas`
* Description: Retrieves a list of all QnA for the chatbot.
* Responses:
    * 200: Successfully retrieved QnA
    * 404: No QnA found
    * 500: Error while retrieving QnA
    
##### 3. Delete QnA
* Route: `DELETE /api/qna/deleteQna:id`
* Description: Deletes a QnA entry by ID.
* Responses:
    * 200: QnA was deleted successfully
    * 404: Cannot delete QnA, QnA not found
    * 500: Could not delete QnA by ID
    
##### 4. Update QnA
* Route: `PUT /api/qna/updateQna/:id`
* Description: Updates a specific QnA entry.
* Request Body:
    ```
    {
      "Questions": "String",
      "Answers": "String"
    }
    ```
* Responses:
    * 200: QnA updated successfully
    * 400: Data to update cannot be empty
    * 404: Cannot update QnA, QnA not found
    * 500: Error updating QnA

##### 5. Get Specific QnA
* Route: `GET /api/qna/getQna/:id`
* Description: Retrieves details of a specific QnA entry by ID.
* Responses:
    * 200: Successfully retrieved specific QnA
    * 404: QnA not found
    * 500: Error retrieving QnA

### Course


| Endpoint | Method | Description |
| -------- | -------- | -------- |
| `/api/course/createpost` | POST | Create a new article for course |
`/api/course/updatepost/:id` | PUT |Update an article
`/api/course/deletepost/:id` | DELETE | Delete an article
`api/course/post/:id` | GET | Get an article by course
`api/course/posts/` | GET | Get all article by course
`api/course/posts/comment/new` | POST | Create a comment of an article
`api/course/posts/comment/:id` | GET | Get a comment of an article
`api/course/posts/comment/delete/:id` | DELETE | Delete a comment of an article
`/api/course/createcourse/` | POST | Create a new course
`api/course/updatecourse/:id` | PUT | Update a course by ID
`api/course/deletecourse/:id` | DELETE | Delete a course by ID
`api/course/getcourse/:id` | GET | Retrieve a specific course by ID
`api/course/getAllcourses` | GET | Retrieve all courses

#### Article
##### 1. Create Article for Course
* Route: : `PUT /api/course/createpost/`
* Description: Creates a new article for a course.
* Request Body:
    ```
    {
      "title": "String",
      "description": "String",
      "picture": "String",
      "email": "String",
      "course": "String",
      "createdDate": "String"
    }
    ```
* Responses:
    * 201: Successfully created article
    * 500: Error while creating a new article
    
##### 2. Update Article
* Route: `PUT /api/course/updatepost/:id`
* Description: Updates an article by its ID.
* Request Body: Data to update the article
* Responses:
    * 200: Article updated successfully
    * 400: Data to update cannot be empty
    * 404: Article not found
    * 500: Error updating the article
    
##### 3. Delete Article
* Route: `DELETE /api/course/deletepost/:id`
* Description: Delete an article by its ID.
* Responses:
    * 200: Article deleted successfully
    * 404: Article not found
    * 500: Error deleting the article
    
##### 4. Get Article
* Route: `GET /api/course/post/:id`
* Description: Retrieve a specific article by ID.
* Responses:
    * 200: Retrieved article successfully
    * 404: No article found
    * 500: Error while retrieving the article
    
##### 5. Get All Articles
* Route: `GET /api/course/posts/`
* Description: Retrieve all articles.
* Responses:
    * 200: Retrieved articles successfully
    * 404: No articles found
    * 500: Error while retrieving articles

#### Comments
##### 1. Create Comment
* Route: `POST /api/course/posts/comment/new`
* Description: Creates a new comment for an article.
* Request Body:
    ```
    {
      "name": "String",
      "postId": "String",
      "date": "String",
      "comments": "String"
    }
    ```
* Responses:
    * 201: Successfully created comment
    * 500: Error while creating a new comment
    
##### 2. Get Comments
* Route: `GET /api/course/posts/comment/:id`
* Description: Retrieve comments for a specific article.
* Responses:
    * 200: Retrieved comments successfully
    * 404: No comments found
    * 500: Error while retrieving comments
    
##### 3. Delete Comment
* Route: `DELETE /api/course/posts/comment/delete/:id`
* Description: Delete a comment by its ID.
* Responses:
    * 200: Comment deleted successfully
    * 404: Comment not found
    * 500: Error deleting comment

#### Courses
##### 1. Create Course
* Route: : `PUT /api/course/createcourse/:id`
* Description: Creates a new course.
* Request Body:
    ```
    {
      "courseTitle": "String",
      "courseDescription": "String",
      "courseContent": [],
      "categories": []
    }
    ```
* Responses:
    * 201: Successfully created course
    * 500: Error while creating a new course

##### 2. Update Course
* Route: `PUT /api/course/updatecourse/:id`
* Description: Updates a course by its ID.
* Request Body: Data to update the course
* Responses:
    * 200: Course updated successfully
    * 400: Data to update cannot be empty
    * 404: Course not found
    * 500: Error updating the course

##### 3. Delete Course
* Route: `DELETE /api/course/deletecourse/:id`
* Description: Delete a course by its ID.
* Responses:
    * 200: Course deleted successfully
    * 404: Course not found
    * 500: Error deleting the course
    
##### 4. Get Course
* Route: `GET /api/course/getcourse/:id`
* Description: Retrieve a specific course by ID.
* Responses:
    * 200: Retrieved course successfully
    * 404: No course found
    * 500: Error while retrieving the course

##### 5. Get All Courses
* Route: `GET /api/course/getAllcourses`
* Description: Retrieve all courses.
* Responses:
    * 200: Retrieved courses successfully
    * 404: No courses found
    * 500: Error while retrieving courses
