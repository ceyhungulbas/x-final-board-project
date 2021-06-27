import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return <div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/weeklyschedule">Weekly Schedule</Link>
  </div>;
};

export default Nav;