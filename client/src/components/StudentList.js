import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, ListGroup, Button } from 'react-bootstrap'; 

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/students')
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Container className="mt-5"> 
      <h1>Student List</h1>
      <ListGroup>
        {students.map((student) => (
          <ListGroup.Item key={student.id} className="d-flex justify-content-between align-items-center">
            <Link to={`/student/${student.id}`}>{student.name}</Link>
            <Link to={`/edit-student/${student.id}`} className="btn btn-primary btn-sm">Edit</Link> 
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Link to="/add-student">
        <Button variant="success" className="mt-3">Add New Student</Button> 
      </Link>
    </Container>
  );
}

export default StudentList;
