import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/foodies.png";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <img className="logo-foodies py-0 my-0 cover" src={logo} />
        </Link>
        <div className="ml-auto">
          <Link to="/signup">
            <button className="btn btn-primary">Sign Up</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
