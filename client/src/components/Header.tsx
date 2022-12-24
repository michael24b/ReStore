import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

function Header() {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">ReStore</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="flex-grow-0" id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/about">
                <i className="fa-solid fa-circle-info"></i> About
              </Nav.Link>
              <Nav.Link href="/contact">
                <i className="fa-solid fa-message"></i> Contact
              </Nav.Link>
              <Nav.Link href="/basket">
                <i className="fas fa-shopping-cart"></i> 0
              </Nav.Link>
              <Nav.Link href="#link">
                <i className="fa-solid fa-right-to-bracket"></i> Login
              </Nav.Link>
              <Nav.Link href="#link">
                <i className="fa-solid fa-user-plus"></i> Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
