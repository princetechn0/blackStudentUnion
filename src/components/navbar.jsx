import { Component } from "react";
import Container from "react-bootstrap/Container";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "../stylesheets/navbar.css";

class Navbar2 extends Component {
  componentDidMount() {
    document.body.style.backgroundColor = "rgb(43, 64, 75)";
  }

  render() {
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
}

export default Navbar2;
