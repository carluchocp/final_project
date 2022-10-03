import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.jsx";
import logo from "../../img/foodies.png";
import styles from "../../styles/profilecard.css";

export const ProfileCard = () => {
  return (
    <div className="container-card-profile">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src="https://img.bekiapsicologia.com/articulos/portada/94000/94965.jpg"
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div className="header-profile">
                <h4 className="card-title">Diana Gómez</h4>
                <Link to="/settings">
                  <button className="button-settings">
                    <i className="fa-solid fa-gear"></i>
                  </button>
                </Link>
              </div>
              <p className="card-level-recipe">
                <medium className="text-muted">
                  👥 30 seguidores | 👥 60 seguidos | ⭐ 23 Favoritos
                </medium>
              </p>
              <p className="card-level-recipe">
                <medium className="text-muted">📍 Caracas, Venezuela</medium>
              </p>
              <p className="card-text">
                Me encanta cocinar y aprender nuevas recetas, soy arquitecta
                pero la cocina es mi pasión. Y aquí sigue una biografía corta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
