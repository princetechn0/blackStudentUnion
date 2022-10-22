import { Component } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class Navbar2 extends Component {
  componentDidMount() {
    document.body.style.backgroundColor = "#f2e1bf";
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">UCI - Black Student Resources</Navbar.Brand>
          <div className="float-right">
            <Navbar.Brand href="/submissions">Recommend</Navbar.Brand>
            <Navbar.Brand href="/about">About</Navbar.Brand>
          </div>
        </Container>
      </Navbar>
    );
  }
}

export default Navbar2;
