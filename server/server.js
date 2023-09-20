const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Import the path module

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define routes
const students = [
  { id: 1, name: 'Allan Kanoonya', className: 'Grade 10', parentContact: '+256-756-7890' },
  { id: 2, name: 'Edgar Walugembe', className: 'Grade 10', parentContact: '+256-706-7890' },
  { id: 3, name: 'Sharon Nakalema', className: 'Grade 10', parentContact: '+256-786-7890' },
  { id: 4, name: 'Samuel Kiwumulo', className: 'Grade 10', parentContact: '+256-796-7890' },
  { id: 5, name: 'Robert Ssekandi', className: 'Grade 10', parentContact: '+256-736-7890' },
  { id: 6, name: 'Marvin Mugerwa', className: 'Grade 10', parentContact: '+256-746-7890' }
  // Add more student data here
];

// Get all students
app.get('/api/students', (req, res) => {
  res.json(students);
});

// Get a single student by ID
app.get('/api/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  res.json(student);
});

// Add a new student
app.post('/api/students', (req, res) => {
  const newStudent = req.body;
  newStudent.id = students.length + 1;
  students.push(newStudent);

  // Send a success response
  res.status(201).json({ message: 'Student added successfully', student: newStudent });
});

// Update an existing student by ID
app.put('/api/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const updatedStudent = req.body;
  
  // Find the student by ID
  const studentIndex = students.findIndex((s) => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }

  // Update the student data
  students[studentIndex] = {
    ...students[studentIndex],
    ...updatedStudent,
    id: studentId, // Ensure the ID remains unchanged
  };

  res.json({ message: 'Student updated successfully', student: students[studentIndex] });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle other routes and return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
