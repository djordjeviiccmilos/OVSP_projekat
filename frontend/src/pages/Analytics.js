import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import {FaUserCheck, FaBox, FaTruck, FaArrowDown, FaArrowUp} from "react-icons/fa";
import {getTopDeliveryPersons, getMostPopularOrders, getAverageTimePerVehicle, getGlobalStats} from "../api/api";
import "../styles/Home.css";

const Analytics = () => {
  const [topDeliveryPersons, setTopDeliveryPersons] = useState([]);
  const [mostPopularOrders, setMostPopularOrders] = useState([]);
  const [vehicleStats, setVehicleStats] = useState([]);

  const [stats, setStats] = useState({
    totalDeliveries: 0,
    avgTime: 0,
    minTime: 0,
    maxTime: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await getGlobalStats();
        setStats(stats);

        const topPersons = await getTopDeliveryPersons();
        setTopDeliveryPersons(topPersons);

        const popularOrders = await getMostPopularOrders();
        setMostPopularOrders(popularOrders);

        const vehicles = await getAverageTimePerVehicle();
        setVehicleStats(vehicles);

      } catch (err) {
        console.error("Error fetching analytics:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <Container className="home-container mt-4">
      <Row className="justify-content-center text-center mb-4">
        <Col md={8}>
          <h1 className="home-title">Analitika dostava</h1>
          <p className="home-subtitle">Pogledajte statistike i detalje dostava.</p>
        </Col>
      </Row>

      <Row className="text-center mb-4">
        <Col md={3} className="mb-3">
          <Card className="home-card h-100 shadow-sm">
            <Card.Body>
              <FaTruck size={40} className="home-icon mb-2" />
              <Card.Title>Ukupno dostava</Card.Title>
              <Card.Text>{stats.totalDeliveries}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} className="mb-3">
          <Card className="home-card h-100 shadow-sm">
            <Card.Body>
              <FaBox size={40} className="home-icon mb-2" />
              <Card.Title>Prosečno vreme</Card.Title>
              <Card.Text>{stats.avgTime?.toFixed(2) || "-"} min</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} className="mb-3">
          <Card className="home-card h-100 shadow-sm">
            <Card.Body>
              <FaArrowDown size={40} className="home-icon mb-2" />
              <Card.Title>Najkraće vreme</Card.Title>
              <Card.Text>{stats.minTime?.toFixed(2) || "-"} min</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} className="mb-3">
          <Card className="home-card h-100 shadow-sm">
            <Card.Body>
              <FaArrowUp size={40} className="home-icon mb-2" />
              <Card.Title>Najduže vreme</Card.Title>
              <Card.Text>{stats.maxTime?.toFixed(2) || "-"} min</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <h5><FaUserCheck /> Top dostavljači</h5>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Dostavljač</th>
                    <th>Ocena dostavljača</th>
                  </tr>
                </thead>
                <tbody>
                  {topDeliveryPersons.map((d, i) => (
                    <tr key={i}>
                      <td>{d._id}</td>
                      <td>{d.avg_rating}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <h5><FaBox /> Najpopularnije porudžbine</h5>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Tip porudžbine</th>
                    <th>Broj porudžbina</th>
                  </tr>
                </thead>
                <tbody>
                  {mostPopularOrders.map((o, i) => (
                    <tr key={i}>
                      <td>{o._id}</td>
                      <td>{o.count}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <h5><FaTruck /> Prosečno vreme po tipu vozila</h5>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Tip vozila</th>
                    <th>Prosečno vreme (min)</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleStats.map((v, i) => (
                    <tr key={i}>
                      <td>{v._id}</td>
                      <td>{v.avg_time?.toFixed(2) || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Analytics;
