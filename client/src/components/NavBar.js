import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavBar = () => {
  return (
    <Navbar bg="purple" variant="dark" expand="lg">
      <div className="container ">
      <div className="container d-flex justify-content-between align-items-center"> 
        <Navbar.Brand href="/">Student App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </div>
      </div>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto mr-3"> 
          <Nav.Link href="/Log in">Log in</Nav.Link>
          <Nav.Link href="/Management system">Management system</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
