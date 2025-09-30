import { Link } from "react-router-dom";
import {FaChartBar, FaHome, FaMapMarkerAlt, FaProjectDiagram, FaRocket, FaTruck} from "react-icons/fa";
import { Navbar, Nav, Container } from "react-bootstrap";

const Navigation = () => {
  return (
    <Navbar bg="light" expand="md" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          🍔 Dostava Analiza
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="d-flex align-items-center me-3">
              <FaHome className="me-1" /> Početna
            </Nav.Link>
            <Nav.Link as={Link} to="/deliveries" className="d-flex align-items-center">
              <FaTruck className="me-1" /> Dostave
            </Nav.Link>
            <Nav.Link as={Link} to="/analytics" className="d-flex align-items-center">
              <FaChartBar className="me-1" /> Analitika
            </Nav.Link>
            <Nav.Link as={Link} to="/regression" className="d-flex align-items-center">
              <FaRocket className="me-1" /> Predikcija prethodnih dostava
            </Nav.Link>
            <Nav.Link as={Link} to="/kmeans" className="d-flex align-items-center">
              <FaProjectDiagram className="me-1" /> Restorani po grupama
            </Nav.Link>
            <Nav.Link as={Link} to="/predict" className="d-flex align-items-center">
              <FaMapMarkerAlt className="me-1" /> Predvidite brzinu Vaše dostave
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;