import react, { useState } from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Products from "./Pages/Products";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </div>
  );
}

export default App;
