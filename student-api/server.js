/* intallation:in terminal,
mkdir student-api
cd student-api
npm init -y
npm install express*/

/*output: node server.js */
/*postman for put,post,delete*/

const express = require("express");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// Student data
let students = [
    {
        id: 1,
        name: "Hemali",
        course: "Information Technology",
        semester: 3
    },
    {
        id: 2,
        name: "Rahul",
        course: "Computer Engineering",
        semester: 3
    }
];

// Home
app.get("/", (req, res) => {
    res.send("Student REST API is running");
});

// GET - All students
app.get("/students", (req, res) => {
    res.json(students);
});

// GET - Student by ID
app.get("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});

// POST - Add student
app.post("/students", (req, res) => {

    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        course: req.body.course,
        semester: req.body.semester
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});

// PUT - Update student
app.put("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    student.name = req.body.name;
    student.course = req.body.course;
    student.semester = req.body.semester;

    res.json({
        message: "Student updated successfully",
        student: student
    });
});

// DELETE - Delete student
app.delete("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students.splice(index, 1);

    res.json({
        message: "Student deleted successfully"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


