import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/foodies.png";
import styles from "../../styles/navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/">
        <img className="logo-foodies py-0 my-0 cover" src={logo} />
      </Link>
      <button
        class="navbar-toggler"
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
            <a className="nav-link" href="/search">
              <i className="fa-solid fa-magnifying-glass"></i> Búsqueda
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fa-regular fa-star"></i> Favoritos
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="/main"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa-regular fa-user"></i> Mi espacio
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/logout">
                Cerrar sesión
              </a>
            </div>
          </li>
          <div className="ml-auto">
            <Link to="/newrecipe">
              <button className="btn btn-primary">Nueva Receta</button>
            </Link>
          </div>
        </ul>
        <div className="ml-auto">
          <Link to="/signup">
            <button className="btn btn-primary">Registrate</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
