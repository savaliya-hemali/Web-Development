/*intallation:bash
mkdir student-mongodb
cd student-mongodb
npm init -y
npm install express mongoose*/
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// ================= MIDDLEWARE =================

// Read JSON data from requests
app.use(express.json());

// Serve HTML, CSS and JavaScript from public folder
app.use(express.static("public"));


// ================= MONGODB CONNECTION =================

mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection error:");
        console.log(error.message);
    });


// ================= STUDENT SCHEMA =================

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    course: {
        type: String,
        required: true
    },

    semester: {
        type: Number,
        required: true
    }
});


// ================= STUDENT MODEL =================

const Student = mongoose.model("Student", studentSchema);


// ================= HOME =================

app.get("/", (req, res) => {
    res.send("Student REST API is running");
});


// ================= CREATE =================

// POST - Add new student
app.post("/students", async (req, res) => {

    try {

        const student = new Student({
            name: req.body.name,
            course: req.body.course,
            semester: req.body.semester
        });

        const savedStudent = await student.save();

        res.status(201).json({
            message: "Student added successfully",
            student: savedStudent
        });

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            message: "Error adding student",
            error: error.message
        });
    }
});


// ================= READ =================

// GET - Get all students
app.get("/students", async (req, res) => {

    try {

        const students = await Student.find();

        res.json(students);

    } catch (error) {

        console.log("GET Error:", error.message);

        res.status(500).json({
            message: "Error fetching students",
            error: error.message
        });
    }
});


// GET - Get student by ID
app.get("/students/:id", async (req, res) => {

    try {

        const student = await Student.findById(req.params.id);

        if (!student) {

            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);

    } catch (error) {

        console.log("GET by ID Error:", error.message);

        res.status(500).json({
            message: "Invalid student ID",
            error: error.message
        });
    }
});


// ================= UPDATE =================

// PUT - Update student
app.put("/students/:id", async (req, res) => {

    try {

        const student = await Student.findByIdAndUpdate(
            req.params.id,

            {
                name: req.body.name,
                course: req.body.course,
                semester: req.body.semester
            },

            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {

            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student updated successfully",
            student: student
        });

    } catch (error) {

        console.log("PUT Error:", error.message);

        res.status(500).json({
            message: "Error updating student",
            error: error.message
        });
    }
});


// ================= DELETE =================

// DELETE - Delete student
app.delete("/students/:id", async (req, res) => {

    try {

        const student = await Student.findByIdAndDelete(
            req.params.id
        );

        if (!student) {

            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student deleted successfully",
            student: student
        });

    } catch (error) {

        console.log("DELETE Error:", error.message);

        res.status(500).json({
            message: "Error deleting student",
            error: error.message
        });
    }
});


// ================= START SERVER =================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});
