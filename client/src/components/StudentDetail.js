import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';

function StudentDetail() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/students/${id}`)
      .then((response) => {
        setStudent(response.data);
      })
      .catch((error) => {
        console.error('Error fetching student details:', error);
      });
  }, [id]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <h1>Student Details</h1>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>className:</strong> {student.className}</p> 
      <p><strong>Stream:</strong> {student.stream}</p> 
      <p><strong>Address:</strong> {student.address}</p> 
      <p><strong>City:</strong> {student.city}</p> 
      <Link to={`/edit-student/${student.id}`}>
        <Button variant="primary">Edit Student</Button>
      </Link>
      <Link to="/" className="btn btn-secondary ms-2">Back to Student List</Link>
    </Container>
  );
}

export default StudentDetail;
