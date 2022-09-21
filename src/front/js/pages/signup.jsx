import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.jsx";
import styles from "../../styles/signup.css";
import logo from "../../img/foodies.png";

export const SignUp = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center">
      <div className="container">
        <br />
        <br />
        <br />
        <br />
        <form>
          <img className="logo-foodies" src={logo} />
          <br />
          <br />
          <h1>¡Hey foodie! Registrate aquí</h1>
          <br />
          <div className="form-group">
            <input
              type={"text"}
              className="form-control m-1"
              placeholder="Ingresa tu nombre"
              name="name"
            />
          </div>
          <div className="form-group">
            <input
              type={"text"}
              className="form-control m-1"
              placeholder="Ingresa tu apellido"
              name="lastname"
            />
          </div>
          <div className="form-group">
            <input
              type={"date"}
              className="form-control m-1"
              placeholder="Ingresa tu edad"
              name="age"
            />
          </div>
          <div className="form-group">
            <input
              type={"text"}
              className="form-control m-1"
              placeholder="Ingresa tu usuario"
              name="user"
            />
          </div>
          <div className="form-group">
            <input
              type={"text"}
              className="form-control m-1"
              placeholder="Ingresa tu email (example@email.com)"
              name="email"
            />
          </div>
          <div className="form-group">
            <input
              type={"password"}
              className="form-control m-1"
              placeholder="Ingresa tu contraseña"
              name="password"
            />
          </div>
        </form>
        <div>
          <button className="btn btn-primary m-3">Registrar</button>
        </div>
        <p>
          ¿Ya tienes una cuenta? <a href="/"> Inicia sesión </a>
        </p>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};
