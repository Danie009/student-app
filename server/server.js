const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'school_database', // Change to your MySQL username
  password: 'school_database', // Change to your MySQL password
  database: 'school_database',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Define API routes

// Get all students from the MySQL database
app.get('/api/students', (req, res) => {
  connection.query('SELECT * FROM students', (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ error: 'Error fetching data' });
      return;
    }
    res.json(results);
  });
});

// Get a single student by ID from the MySQL database
app.get('/api/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  connection.query('SELECT * FROM students WHERE id = ?', [studentId], (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ error: 'Error fetching data' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }
    res.json(results[0]);
  });
});

// Add a new student to the MySQL database
app.post('/api/students', (req, res) => {
  const { name, className, stream, address, city } = req.body;
  connection.query(
    'INSERT INTO students (name, className, stream, address, city) VALUES (?, ?, ?, ?, ?)',
    [name, className, stream, address, city],
    (err, results) => {
      if (err) {
        console.error('Error adding data to MySQL:', err);
        res.status(500).json({ error: 'Error adding data' });
        return;
      }
      const newStudentId = results.insertId;
      res.status(201).json({ message: 'Student added successfully', studentId: newStudentId });
    }
  );
});

// Update an existing student by ID in the MySQL database
app.put('/api/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const { name, className, stream, address, city } = req.body;
  connection.query(
    'UPDATE students SET name = ?, className = ?, stream = ?, address = ?, city = ? WHERE id = ?',
    [name, className, stream, address, city, studentId],
    (err, results) => {
      if (err) {
        console.error('Error updating data in MySQL:', err);
        res.status(500).json({ error: 'Error updating data' });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ message: 'Student not found' });
        return;
      }
      res.json({ message: 'Student updated successfully', studentId });
    }
  );
});

// Delete a student by ID from the MySQL database
app.delete('/api/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  connection.query('DELETE FROM students WHERE id = ?', [studentId], (err, results) => {
    if (err) {
      console.error('Error deleting data from MySQL:', err);
      res.status(500).json({ error: 'Error deleting data' });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }
    res.json({ message: 'Student deleted successfully', studentId });
  });
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
