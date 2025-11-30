import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

export default function NavBar({ user }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="brand">ShareFeast</h1>

        <nav className="navlinks">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/add">Add Listing</Link>
          <Link to="/about">About</Link>
          <Link to="/">How It Works</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>

      <div>
        {user ? (
          <button className="btn-ghost" onClick={() => auth.signOut()}>
            Sign out
          </button>
        ) : (
          <>
            <Link to="/login" className="btn-ghost">Sign in</Link>
            <Link to="/register" className="btn-ghost" style={{ marginLeft: "10px" }}>
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
