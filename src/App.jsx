import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard.jsx";
import AddListing from "./pages/AddListing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import HowItWorks from "./pages/HowItWorks/HowItWorks.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import About from "./pages/About/About.jsx";

import NavBar from "./components/NavBar";

export default function App({ user }) {
  return (
    <>
      <NavBar user={user} />
      <Routes>
        <Route path="/" element={<HowItWorks />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/add" element={<AddListing user={user} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}
