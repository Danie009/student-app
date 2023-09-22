import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: '',
    className: '',
    stream: '',
    address: '',
    city: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/students/${id}`)
      .then((response) => {
        setStudent(response.data);
      })
      .catch((error) => {
        console.error('Error fetching student details:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/students/${id}`, student)
      .then((response) => {
        alert('Student updated successfully');
        navigate(`/student/${id}`);
      })
      .catch((error) => {
        console.error('Error updating student:', error);
      });
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <h1>Edit Student</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" name="name" value={student.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Class:</Form.Label>
          <Form.Control type="text" name="className" value={student.className} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Stream:</Form.Label>
          <Form.Control type="text" name="stream" value={student.stream} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address:</Form.Label>
          <Form.Control type="text" name="address" value={student.address} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>City:</Form.Label>
          <Form.Control type="text" name="city" value={student.city} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Student
        </Button>
        <Link to={`/student/${id}`} className="btn btn-secondary ms-2">
          Cancel
        </Link>
      </Form>
    </Container>
  );
}

export default EditStudent;
