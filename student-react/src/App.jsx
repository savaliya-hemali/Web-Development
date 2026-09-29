import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    console.log("Student Management App Loaded");
  }, []);

  function addStudent() {
    if (studentName.trim() === "") {
      alert("Please enter student name");
      return;
    }

    setStudents([...students, studentName]);
    setStudentName("");
  }

  function deleteStudent(index) {
    setStudents(students.filter((_, i) => i !== index));
  }

  return (
    <div className="app">
      <div className="card">

        <div className="header">
          <div className="icon">🎓</div>
          <div>
            <h1>Student Manager</h1>
            <p>React.js Functional Components</p>
          </div>
        </div>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter student name..."
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />

          <button onClick={addStudent}>
            + Add Student
          </button>
        </div>

        <div className="list-header">
          <h2>Students</h2>
          <span>{students.length} Total</span>
        </div>

        <div className="student-list">

          {students.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">👤</div>
              <h3>No Students Yet</h3>
              <p>Add a student using the form above.</p>
            </div>
          ) : (
            students.map((student, index) => (
              <div className="student" key={index}>

                <div className="student-info">
                  <div className="avatar">
                    {student.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3>{student}</h3>
                    <p>Student #{index + 1}</p>
                  </div>
                </div>

                <button
                  className="delete"
                  onClick={() => deleteStudent(index)}
                >
                  Delete
                </button>

              </div>
            ))
          )}

        </div>

        <footer>
          Built with React.js & Hooks
        </footer>

      </div>
    </div>
  );
}

export default App;