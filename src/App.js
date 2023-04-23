import "./styles/App.css";

import { Routes, Route } from "react-router-dom";
//Components
import Navbar from "./components/Navbar";
//Pages
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verification from "./pages/Verification";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Transaction" element={<Transaction />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/user/verification/:token" element={<Verification />} />
      </Routes>
    </div>
  );
}

export default App;
