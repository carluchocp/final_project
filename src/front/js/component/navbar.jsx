import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/foodies.png";
import styles from "../../styles/navbar.css";

export const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
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
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/feed">
              Feed <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/search">
              Búsqueda
            </a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="/main"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Mi espacio
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="/logout">
                Cerrar sesión
              </a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">
              Favoritos
            </a>
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
