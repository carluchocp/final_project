import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.jsx";
import styles from "../../styles/signup.css";

export const SignUp = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center">
      <div className="container">
        <form>
          <img
            className="logo-foodies"
            src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/gwnfuhywcvf7jrordlk0"
          />
          <h1>¡Hey foodie! Registrate aquí</h1>
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
              type={"text"}
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
              placeholder="Ingresa tu email"
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
      <br />
      <br />
      <br />
      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
    </div>
  );
};
