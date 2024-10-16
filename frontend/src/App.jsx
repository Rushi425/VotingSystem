import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Voter from "./components/Voter";
import Admin from "./components/Admin";
import VoterLanding from "./components/VoterLanding";
import AdminLanding from "./components/AdminLanding";
import Dashboard from "./components/Dashboard";
import Addvoter from "./components/Addvoter";
import Navbar from "./components/Navbar";

function App() {
  const [isAdmin, setIsAdmin] = useState(false); // Set this based on your login logic

  return (
    <div>
      <Navbar isAdmin={isAdmin} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/voter' element={<Voter />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/voterlanding' element={<VoterLanding />} />
        <Route path='/adminlanding' element={<AdminLanding />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/addvoter' element={<Addvoter />} />
      </Routes>
    </div>
  );
}

export default App;
