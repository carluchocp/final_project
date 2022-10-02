import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.jsx";
import logo from "../../img/foodies.png";

export const SettingsProfile = () => {
  return (
    <div className="container-page">
      <div className="text-center">
        <br />
        <h1>Ajustes de perfil</h1>
        <br />
      </div>
      <div className="container">
        <form>
          <div className="form-group">
            <label>Modifica tu nombre:</label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Ejemplo: Diana A. Gómez"
              name="description-profile"
            />
          </div>
          <br />
          <div className="form-group">
            <label>Cambia tu foto de perfil:</label>
            <input
              type={"file"}
              className="form-control"
              placeholder="Añade una imagen"
              name="new-photo-profile"
            />
          </div>
          <br />
          <div className="form-group">
            <label>Cambia tu descripción:</label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Ejemplo: Soy arquitect@ y me encanta la cocina oriental..."
              name="description-profile"
            />
          </div>
          <br />
          <div className="container-time">
            <label>Coloca tu ubicación:</label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Caracas, Venezuela"
              name="location-profile"
            />
          </div>
          <br />
          <div className="text-center">
            <button className="btn btn-primary m-3" type="submit">
              Actualizar
            </button>
          </div>
          <br />
          <br />
        </form>
      </div>
    </div>
  );
};
