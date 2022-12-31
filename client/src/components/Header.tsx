import React from "react";
import { Container, Navbar, Nav, Form, Button } from "react-bootstrap";
import { useAppSelector } from "../store/configureStore";

function Header() {
  const { basket } = useAppSelector((state) => state.basket);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
  console.log(basket);
  // console.log(itemCount);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">ReStore</Navbar.Brand>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-sm-2"
              aria-label="Search"
            />
            <Button variant="btn btn-secondary my-2 my-sm-0">Search</Button>
          </Form>
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
                <i className="fas fa-shopping-cart"></i> {itemCount}
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
