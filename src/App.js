import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from "./pages/Inicio";
import Nosotros from "./pages/Nosotros"
import Servicio from "./pages/Servicio"
import Contacto from "./pages/Contacto"
import Ingresar from "./pages/Formularios/Ingresar"
import Menu from "./components/Dashboard/Menu.jsx";
import "./index.css";

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/servicios" element={<Servicio />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/ingresar" element={<Ingresar />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
