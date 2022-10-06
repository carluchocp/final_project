import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.jsx";
import logo from "../../img/foodies.png";

let inicialState = {
  location: "",
  biography: "",
  image: "",
}

export const SettingsProfile = () => {
  const {store, actions} = useContext(Context)
  let navigate = useNavigate()
  const [profileData, setProfileData] = useState(inicialState)

  let handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData()
    formData.append("image", profileData.image)
    formData.append("location", profileData.location)
    formData.append("biography", profileData.biography)
  

    const result = actions.updateProfile(formData)
    if (result) {
      navigate("/main");
    } else {
      console.log("registrado fallido");
    }
  };

  let handleChange = ({ target }) => {
    setProfileData({
      ...profileData,
      [target.name]: target.value,
    });
  };

  let handleImage = (event) => {
    setProfileData({
      ...profileData,
      image: event.target.files[0]
    })
  }

  return (
    <div className="container-page">
      <div className="text-center">
        <br />
        <h1>Ajustes de perfil</h1>
        <br />
      </div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Cambia tu foto de perfil:</label>
            <input
              type={"file"}
              className="form-control"
              placeholder="Añade una imagen"
              name="image"
              onChange={handleImage}
            />
          </div>
          <br />
          <div className="form-group">
            <label>Cambia tu descripción:</label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Ejemplo: Soy arquitect@ y me encanta la cocina oriental..."
              name="biography"
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="container-time">
            <label>Coloca tu ubicación:</label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Caracas, Venezuela"
              name="location"
              onChange={handleChange}
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
