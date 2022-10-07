import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/foodies.png";
import styles from "../../styles/navbar.css";
import { Context } from "../store/appContext.jsx";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/feed">
        <img className="logo-foodies py-0 my-0 cover" src={logo} />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/feed">
              <i className="fa-solid fa-house"></i> Feed{" "}
              <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/search/users">
              <i className="fa-solid fa-magnifying-glass"></i> Búsqueda
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/main">
              <i className="fa-regular fa-user"></i> Mi espacio
            </a>
          </li>
          <div className="ml-auto">
            <Link to="/newpost">
              <button className="btn btn-primary">Nueva Receta</button>
            </Link>
          </div>
        </ul>
        <div className="ml-auto">
          <Link to="/">
            <button className="logout-button" onClick={actions.userLogOut}>
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
