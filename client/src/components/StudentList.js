import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, ListGroup, Button } from 'react-bootstrap';
import ConfirmationModal from './ConfirmationModal'; // Import the ConfirmationModal component

function StudentList() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/students')
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDelete = (student) => {
    setStudentToDelete(student);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      axios
        .delete(`http://localhost:8000/api/students/${studentToDelete.id}`)
        .then(() => {
          setStudents((prevStudents) =>
            prevStudents.filter((student) => student.id !== studentToDelete.id)
          );
          setShowModal(false);
        })
        .catch((error) => {
          console.error('Error deleting student:', error);
        });
    }
  };

  return (
    <Container className="mt-5">
      <div className='d-flex justify-content-between mb-3'>
      <h1>Student List</h1>
      <Link to="/add-student">
        <Button variant="success" className="mt-2">Add New Student</Button>
      </Link>
      </div>
      <ListGroup>
        {students.map((student) => (
          <ListGroup.Item key={student.id} className="d-flex justify-content-between align-items-center">
            <Link className='studentlist' to={`/student/${student.id}`}>{student.name}</Link>
            <div className='d-flex gap-3'>
              <Link to={`/edit-student/${student.id}`} className="btn btn-primary btn-sm studentlist">Edit</Link>
              <Button
                variant="danger"
                size="sm"
                className="ml-2"
                onClick={() => handleDelete(student)}
              >
                Delete
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Render Deletion  ConfirmationModal */}
      <ConfirmationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
    </Container>
  );
}

export default StudentList;
