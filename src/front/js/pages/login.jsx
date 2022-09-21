import React, { useContext } from "react";
import { Context } from "../store/appContext.jsx";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center">
      <div className="container">
        <br />
        <br />
        <br />
        <br />
        <form>
          <h1>¡Bienvenido foodie! Inicia sesión </h1>
          <br />
          <div className="form-group">
            <input
              type={"text"}
              className="form-control m-1"
              placeholder="Usuario"
              name="user"
            />
          </div>
          <div className="form-group">
            <input
              type={"password"}
              className="form-control m-1"
              placeholder="Contraseña"
              name="password"
            />
          </div>
        </form>
        <div>
          <button className="btn btn-primary m-3">Iniciar Sesión</button>
        </div>
        <p>
          ¿No tienes cuenta? <a href="/signup"> Registrate </a>
        </p>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};
