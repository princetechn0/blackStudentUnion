import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function Navbar2() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">UCI Black</Navbar.Brand>
          <Navbar.Brand href="#home">About</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbar2;
