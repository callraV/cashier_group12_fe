import "./styles/App.css";

import { Routes, Route } from "react-router-dom";
//Components
import Navbar from "./components/Navbar";
//Pages
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Transaction" element={<Transaction />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
