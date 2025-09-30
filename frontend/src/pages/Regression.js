import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { getDeliveriesWithPrediction } from "../api/api";
import "../styles/Home.css";

const LinearRegression = () => {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({ avg_prediction: 0, min_prediction: 0, max_prediction: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deliveriesData = await getDeliveriesWithPrediction();
        setData(deliveriesData);

        if (deliveriesData.length > 0) {
          const predictions = deliveriesData.map(d => d.prediction).filter(Boolean);
          const avg = predictions.reduce((a, b) => a + b, 0) / predictions.length;
          const min = Math.min(...predictions);
          const max = Math.max(...predictions);
          setStats({ avg_prediction: avg, min_prediction: min, max_prediction: max });
        }
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
          <h1 className="home-title">Predikcije trajanja dostave</h1>
          <p className="home-subtitle">
            Pogledajte nekoliko dostava sa realnim trajanjem dostave i predikcijom metodom linearne regresije!
            Nakon treniranja algoritma, utvrdjena je greska od 8 minuta prilikom predikcije vremena.
          </p>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Dostavljač</th>
                <th>Tip porudžbine</th>
                <th>Tip vozila</th>
                <th>Vreme (min)</th>
                <th>Predikcija (min)</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data.length > 0 ? (
                data.slice(0, 10).map((d, i) => (
                  <tr key={i}>
                    <td>{d.Delivery_person_ID}</td>
                    <td>{d.Type_of_order}</td>
                    <td>{d.Type_of_vehicle}</td>
                    <td>{d["Time_taken(min)"]}</td>
                    <td>{d.prediction?.toFixed(2) || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">Nema podataka</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default LinearRegression;
