import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";
import AppStrapi from "./pages/AppStrapi";
import AppStrapiTuto from "./pages/AppStrapiTuto";
import AppTP from "./pages/AppTP";
import AppTPAxios from "./pages/AppTPAxios";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
      </div>
      <Routes>
        <Route path="AppStrapi" element={<AppStrapi />} />
        <Route path="AppStrapiTuto" element={<AppStrapiTuto />} />
        <Route path="AppTP" element={<AppTP />} />
        <Route path="AppTPAxios" element={<AppTPAxios />} />
      </Routes>
    </Router>
  );
}

export default App;
