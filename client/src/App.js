import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentList from './components/StudentList';
import StudentDetail from './components/StudentDetail';
import AddStudent from './components/AddStudent';
import EditStudent from './components/editStudent';
import NavBar from './components/NavBar';

function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/student/:id" element={<StudentDetail />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/edit-student/:id" element={<EditStudent />} />
      </Routes>
    </div>
  );
}

export default App;
