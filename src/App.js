import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Transaksi from "./pages/transaksi/Transaksi";
import HomePage from "./pages/utama/HomePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/transaksi" element={<Transaksi />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
