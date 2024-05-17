import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"

import "bootstrap/dist/css/bootstrap.min.css"

function NavigationBar() {
  return (
    <>
      <Navbar sticky="top" bg="dark" data-bs-theme="dark">
        <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/">
              <img
                src=""
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
          </Container>
        </Navbar>
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/products">Products</Nav.Link>
            <Nav.Link href="/contact-us">Contact Us</Nav.Link>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          </Nav>
        </Container>
        <Navbar.Text>
          Signed in as: <a href="#login">TurkiD</a>
        </Navbar.Text>
      </Navbar>
    </>
  )
}
export default NavigationBar
