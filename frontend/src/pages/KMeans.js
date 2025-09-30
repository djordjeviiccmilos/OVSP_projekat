import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { FaMapMarkerAlt } from "react-icons/fa";
import { getRestaurantClusters } from "../api/api";
import "../styles/Home.css";

const RestaurantClusters = () => {
  const [clusters, setClusters] = useState([]);

  useEffect(() => {
    const fetchClusters = async () => {
      try {
        const data = await getRestaurantClusters();
        setClusters(data);
      } catch (err) {
        console.error("Error fetching clusters:", err);
      }
    };
    fetchClusters();
  }, []);

  return (
    <Container className="home-container mt-4">
      <Row className="justify-content-center text-center mb-4">
        <Col md={8}>
          <h1 className="home-title">Restorani po grupama (cluster-ima)</h1>
          <p className="home-subtitle">Pogledajte restorane iz svih grupa, restorani su grupisani
            pomoću KMeans modela.</p>
        </Col>
      </Row>

      <Row>
        {clusters.map((cluster, i) => (
          <Col md={6} lg={4} className="mb-4" key={i}>
            <Card className="shadow-sm">
              <Card.Body>
                <h5>
                  <FaMapMarkerAlt /> Cluster {cluster._id} ({cluster.coordinates.length})
                </h5>
                <Table striped bordered hover responsive className="mt-2">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Restoran (lat, long)</th>
                      <th>Dostava (lat, long)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cluster.coordinates.slice(0, 10).map((c, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>
                          {c.restaurant_latitude?.toFixed(5)}, {c.restaurant_longitude?.toFixed(5)}
                        </td>
                        <td>
                          {c.delivery_latitude?.toFixed(5)}, {c.delivery_longitude?.toFixed(5)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RestaurantClusters;
