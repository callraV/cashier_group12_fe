import "./styles/App.css";

import { Routes, Route } from "react-router-dom";
//Components
import Navbar from "./components/Navbar";
//Pages
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import Products from "./pages/Products";
import Payment from "./pages/Payment";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verification from "./pages/Verification";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/Dashboard/:id" element={<Dashboard />} />
        <Route path="/Transaction/:id" element={<Transaction />} />
        <Route path="/Products/:id" element={<Products />} />
        <Route path="/Payment/:id" element={<Payment />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/user/verification/:token" element={<Verification />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
