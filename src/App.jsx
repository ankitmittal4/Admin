import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import DashboardRoutes from "./components/DashboardRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardRoutes />} />
      <Route path="/dashboard/*" element={<DashboardRoutes />} />
    </Routes>
  );
}

export default App;
