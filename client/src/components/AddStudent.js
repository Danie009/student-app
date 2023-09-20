import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap'; 

function AddStudent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    className: '',
    parentContact: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/students', formData)
      .then((response) => {
        alert('Student added successfully');
        navigate('/');
      })
      .catch((error) => {
        console.error('Error adding student:', error);
      });
  };

  return (
    <Container className="mt-5"> 
      <h1>Add New Student</h1>
      <Form onSubmit={handleSubmit}> 
        <Form.Group className="mb-3">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Class:</Form.Label>
          <Form.Control type="text" name="className" value={formData.className} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Parent Contact:</Form.Label>
          <Form.Control type="text" name="parentContact" value={formData.parentContact} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">Add Student</Button> 
        
        <Link to="/" className="btn btn-secondary ms-2">Cancel</Link>
      </Form>
    </Container>
  );
}

export default AddStudent;
