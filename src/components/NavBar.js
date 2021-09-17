import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <Nav variant="pills" defaultActiveKey="/home" as="ul">
      <Nav.Item as="li">
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link as={Link} to="/about">
          About
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link as={Link} to="/contact">
          Contact
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link as={Link} to="/clientspage">
          Client Page
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default NavBar;
