import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Navbar, Nav } from "react-bootstrap";
import "../stylesheets/navbar.css";

function Navbar2() {
  useEffect(() => {
    document.body.style.backgroundColor = "rgb(43, 64, 75)";
  }, []);

  return (
    <Navbar
      className="custom-navbar"
      collapseOnSelect
      expand="lg"
      variant="dark"
    >
      <Container>
        <Navbar.Brand href="/">For the Culture</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Brand href="/about">About</Navbar.Brand>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar2;
