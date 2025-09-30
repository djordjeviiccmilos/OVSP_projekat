import React, { useState } from "react";
import { Container, Row, Col, Card, Table, Button, Form } from "react-bootstrap";
import { FaMapMarkerAlt } from "react-icons/fa";
import { getPrediction } from "../api/api";
import "../styles/Home.css";

const Predict = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!latitude || !longitude) {
      alert("Unesite obe koordinate.");
      return;
    }

    setLoading(true);
    try {
      const data = await getPrediction(parseFloat(latitude), parseFloat(longitude));
      console.log("Odgovor backend-a:", data);

      if (!Array.isArray(data)) {
        alert("Backend ne vraća niz podataka!");
        setPredictions([]);
      } else {
        setPredictions(data);
      }
    } catch (error) {
      console.error("Error fetching prediction:", error);
      alert("Došlo je do greške prilikom predikcije.");
      setPredictions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="home-container mt-5 mb-5">
      <Row className="justify-content-center text-center mb-4">
        <Col md={8}>
          <h1 className="home-title mb-3">Predikcija vremena dostave</h1>
          <p className="home-subtitle">
            Ova stranica će izlistati <strong>10 najbližih restorana</strong> prema vašim koordinatama i predvideti vreme dostave za svaki.
          </p>
          <p className="text-muted">
            Savet: Latitude između -30 i 30, Longitude između -88 i 88.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center align-items-center mb-4 g-2">
        <Col md={3}>
          <Form.Control
            type="number"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Control
            type="number"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Button
            variant="primary"
            size="lg"
            onClick={handlePredict}
            disabled={loading}
            className="w-100"
          >
            {loading ? "Predikcija..." : "Predikcija"}
          </Button>
        </Col>
      </Row>

      {Array.isArray(predictions) && predictions.length > 0 && (
        <Row className="mt-4">
          <Col>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <h5 className="mb-3"><FaMapMarkerAlt /> Predikcija restorana</h5>
                <Table striped bordered hover responsive className="text-center align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Latitude restorana</th>
                      <th>Longitude restorana</th>
                      <th>Predikcija vremena (min)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {predictions.map((p, i) => (
                      <tr key={i}>
                        <td>{p.lat.toFixed(8)}</td>
                        <td>{p.lon.toFixed(8)}</td>
                        <td>{p.predicted_time?.toFixed(4)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Predict;
