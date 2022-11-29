import { Component } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "../stylesheets/navbar.css";

class Navbar2 extends Component {
  componentDidMount() {
    document.body.style.backgroundColor = "rgb(43, 64, 75)";
  }

  render() {
    return (
      <Navbar className="custom-navbar" variant="dark">
        <Container>
          <Navbar.Brand>For the Culture</Navbar.Brand>
          <div className="float-right">
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Brand href="/about">About</Navbar.Brand>
          </div>
        </Container>
      </Navbar>
    );
  }
}

export default Navbar2;
