import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import DashboardRoutes from "./components/DashboardRoutes";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
      </Route>
    </Routes>
  );
}

export default App;
