import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { FaClock, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { getAllDeliveries, getDeliveryStats } from "../api/api";
import "../styles/Home.css";

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
  const fetchData = async () => {
    try {
      const deliveriesData = await getAllDeliveries();
      setDeliveries(deliveriesData);

      const statsData = await getDeliveryStats();
      setStats(statsData);
    } catch (err) {
      console.error(err);
    }
  };
  fetchData();
}, []);


  return (
    <Container className="home-container mt-4">
      <Row className="justify-content-center text-center mb-4">
        <Col md={8}>
          <h1 className="home-title">Sve dostave</h1>
          <p className="home-subtitle">
            Pogledajte sve dostave i njihove statistike.
          </p>
        </Col>
      </Row>

      <Row className="text-center mb-4">
        <Col md={4} className="mb-3">
          <Card className="home-card h-100 shadow-sm">
            <Card.Body>
              <FaClock size={40} className="home-icon mb-2" />
              <Card.Title>Prosečno vreme</Card.Title>
              <Card.Text>{stats.avg_time?.toFixed(2) || "-"} min</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card className="home-card h-100 shadow-sm">
            <Card.Body>
              <FaArrowDown size={40} className="home-icon mb-2" />
              <Card.Title>Najkraće vreme</Card.Title>
              <Card.Text>{stats.min_time || "-"} min</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card className="home-card h-100 shadow-sm">
            <Card.Body>
              <FaArrowUp size={40} className="home-icon mb-2" />
              <Card.Title>Najduže vreme</Card.Title>
              <Card.Text>{stats.max_time || "-"} min</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>


      <Row>
        <Col>
          <h3 className="mt-4">Detalji dostava</h3>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Dostavljač</th>
                <th>Tip porudžbine</th>
                <th>Tip vozila</th>
                <th>Vreme (min)</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(deliveries) && deliveries.length > 0 ? (
                deliveries.slice(0, 10).map((d, i) => (
                  <tr key={i}>
                    <td>{d.Delivery_person_ID}</td>
                    <td>{d.Type_of_order}</td>
                    <td>{d.Type_of_vehicle}</td>
                    <td>{d["Time_taken(min)"]}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center">
                    Nema podataka
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Deliveries;
