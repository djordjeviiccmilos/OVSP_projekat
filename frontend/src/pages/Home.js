import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import {FaChartBar, FaMapMarkerAlt, FaProjectDiagram, FaRocket, FaTruck} from "react-icons/fa";
import "../styles/Home.css";

const Home = () => {
  return (
    <Container className="home-container">
      <Row className="justify-content-center text-center mb-5">
        <Col md={8}>
          <h1 className="home-title">Dobrodošli na web aplikaciju za analizu dostava</h1>
          <p className="home-subtitle">
            Analizirajte podatke o dostavi hrane i vizualizujte rezultate.
          </p>
        </Col>
      </Row>

      <Row className="text-center">
        <Col md={3} className="mb-4">
          <Link to="/predict" style={{ textDecoration: "none", color: "inherit" }}>
            <Card className="home-card h-100 shadow-sm hover-shadow">
              <Card.Body>
                <FaMapMarkerAlt size={50} className="home-icon mb-3" />
                <Card.Title>Predikcija dostave</Card.Title>
                <Card.Text>
                  Unesite svoje koordinate i saznajte predviđeno vreme dostave od najbližih restorana.
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>

        <Col md={3} className="mb-4">
          <Link to="/analytics" style={{ textDecoration: "none", color: "inherit" }}>
            <Card className="home-card h-100 shadow-sm">
              <Card.Body>
                <FaChartBar size={50} className="home-icon mb-3" />
                <Card.Title>Analitika podataka</Card.Title>
                <Card.Text>Pogledajte analitike najboljih dostavljača, najpopularnijih porudžbina...</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>

        <Col md={3} className="mb-4">
          <Link to="/kmeans" style={{ textDecoration: "none", color: "inherit" }}>
            <Card className="home-card h-100 shadow-sm">
              <Card.Body>
                <FaProjectDiagram size={50} className="home-icon mb-3" />
                <Card.Title>KMeans Klasterovanje</Card.Title>
                <Card.Text>
                  Grupisanje restorana pomoću KMeans algoritma za bolju analizu podataka.
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>

        <Col md={3} className="mb-4">
          <Link to="/regression" style={{ textDecoration: "none", color: "inherit" }}>
            <Card className="home-card h-100 shadow-sm">
              <Card.Body>
                <FaRocket size={50} className="home-icon mb-3" />
                <Card.Title>Predikcije vremena dostave</Card.Title>
                <Card.Text>
                  Pogledajte kako naš algoritam pomaže da predvidimo vreme dostave.
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>

        <Col md={3} className="mb-4">
          <Link to="/deliveries" style={{ textDecoration: "none", color: "inherit" }}>
            <Card className="home-card h-100 shadow-sm hover-shadow">
              <Card.Body>
                <FaTruck size={50} className="home-icon mb-3" />
                <Card.Title>Sve dostave</Card.Title>
                <Card.Text>Pogledajte nekoliko poslednjih dostava i njihove statistike.</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
