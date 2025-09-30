import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Deliveries from "./pages/Deliveries";
import Navigation from "./components/Navigation"
import Analytics from "./pages/Analytics";
import Regression from "./pages/Regression"
import KMeans from "./pages/KMeans"
import Predict from "./pages/Predict";

function App() {
  return (
    <div>
      <Navigation>
          <Link to="/">Home</Link> |{" "}
          <Link to="/deliveries">Deliveries</Link>
          <Link to="/analytics">Analytics</Link>
      </Navigation>

      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deliveries" element={<Deliveries />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/regression" element={<Regression />} />
          <Route path="/kmeans" element={<KMeans />} />
          <Route path="/predict" element={<Predict />} />
      </Routes>
    </div>
  );
}

export default App;
