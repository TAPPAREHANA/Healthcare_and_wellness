import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavigationBar from "./components/Navbar";
import Welcome from "./Pages/Welcome";
import Patients from "./Pages/Patients";
import Providers from "./Pages/Providers";
import Appointments from "./Pages/Appointments";
import WellnessServices from "./Pages/WellnessServices";
import Enrollments from "./Pages/Enrollments";
import Payments from "./Pages/Payments";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  return (
    <Router>
      <NavigationBar />
      <div className="container mt-4">
        <Routes> 

          <Route path="/" element={<Welcome />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/providers" element={<Providers />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/wellness" element={<WellnessServices />} />
          <Route path="/enrollments" element={<Enrollments />} />
          <Route path="/payments" element={<Payments />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
