import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.jsx";
import styles from "../../styles/signup.css";

let initialState = {
    username: "",
    name: "",
    lastname: "",
    age: "",
    email: "",
    password: "",
  }

export const SignUp = () => {
  const { store, actions } = useContext(Context);

  const [userData, setUserData] = useState(initialState)
  let navigate = useNavigate()

  let handleSubmit = async (event) =>{
    event.preventDefault()
    if (actions.userSignUp(userData)) {
      navigate("/feed")
    } else {
      console.log("registrado fallido")
    }
    // console.log("me ejecuto el submit")
    // if (actions.signUpCredentials(userData)) {
    //   await actions.userSignUp(userData)
    //   return navigate("/feed")
    // } else {
    //   alert("Invalid credentials")
    // }
  }

  let handleChange = ({ target }) =>{
	setUserData({
    ...userData,
    [target.name]: target.value,
    })
  };

  return (
    <div className="text-center">
      <div className="container">
        <form onSubmit={handleSubmit}>
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
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type={"text"}
              className="form-control m-1"
              placeholder="Ingresa tu apellido"
              name="lastname"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type={"text"}
              className="form-control m-1"
              placeholder="Ingresa tu edad"
              name="age"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type={"text"}
              className="form-control m-1"
              placeholder="Ingresa tu usuario (debe contener un maximo de 12 caracteres)"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type={"text"}
              className="form-control m-1"
              placeholder="Ingresa tu email(debe ser un gmail o hotmail)"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type={"password"}
              className="form-control m-1"
              placeholder="Ingresa tu contraseña (debe tener al menos 8 caracteres)"
              name="password"
              onChange={handleChange}
            />
          </div>
        <div>
              <button className="btn btn-primary m-3" type="submit">Registrar</button>          
        </div>
        </form>
        
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
