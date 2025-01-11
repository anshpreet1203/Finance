import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { ToastContainer, toast } from "react-toastify";
import Dashboard from "./pages/Dashboard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
