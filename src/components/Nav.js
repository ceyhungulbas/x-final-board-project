import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
  <div>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/contact">Contact</Link>
    <Link to="/clientspage">Clients Page</Link>
    <Link to="/weeklyboard">Weekly Board</Link>
  </div>
  );
};

export default Nav;