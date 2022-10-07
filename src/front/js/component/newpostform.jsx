import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.jsx";
import logo from "../../img/foodies.png";

let initialState = {
  name: "",
  caption: "",
  image: "",
  ingredients: "",
  preparation: "",
  level: "",
  time: "",
  portions: "",
}

export const NewPostForm = () => {
  const { store, actions } = useContext(Context);

  const [postData, setPostData] = useState(initialState);
  let navigate = useNavigate();

  let handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData()
    formData.append("image", postData.image)
    formData.append("name", postData.name)
    formData.append("caption", postData.caption)
    formData.append("level", postData.level)
    formData.append("time", postData.time)
    formData.append("portions", postData.portions)
    formData.append("ingredients", postData.ingredients)
    formData.append("preparation", postData.preparation)

    const result = actions.setPost(formData)
    if (result) {
      navigate("/feed");
    } else {
      console.log("registrado fallido");
    }
  };

  let handleChange = ({ target }) => {
    setPostData({
      ...postData,
      [target.name]: target.value,
    });
  };

  let handleImage = (event) => {
    setPostData({
      ...postData,
      image: event.target.files[0]
    })
  }

  return (
    <div className="container-page">
      <div className="text-center">
        <br />
        <h1>¿Qué publicarás hoy foodie?</h1>
        <br />
      </div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre de la receta</label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Ejemplo: Ratatouille"
              name="name"
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="form-group">
            <label>Añade una pequeña descripción:</label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Ejemplo: Es un platillo compuesto por verduras, salsa..."
              name="caption"
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="form-group">
            <label>Añade una imagen de la receta:</label>
            <input
              accept=".jpg, .jpeg, .png"
              type={"file"}
              className="form-control"
              placeholder="Añade una imagen"
              name="image"
              onChange={handleImage}
            />
          </div>
          <br />
          <div className="container-time">
            <label>¿Cuál es la dificultad de la receta?</label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Puede ser: Principiante, Intermedio o Avanzado"
              name="level"
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="container-time">
            <label>Tiempo estimado de preparación</label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Ejemplo: 1h o 35min"
              name="time"
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="form-group">
            <label>¿Para cuantas porciones rinde la receta?</label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Debe ser un número"
              name="portions"
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="form-group">
            <label>Ingredientes necesarios para tu receta:</label>
            <input
              type={"text"}
              className="form-control"
              placeholder=" Ejemplo: 3 tomates, 5 cebollas, 1 rama de romero..."
              name="ingredients"
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="form-group">
            <label>Pasos para preparar tu receta:</label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Ejemplo: cortar los vegetales, precalentar el horno..."
              name="preparation"
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="text-center">
            <button className="btn btn-primary m-3" type="submit">
              Publicar
            </button>
          </div>
          <br />
          <br />
        </form>
      </div>
    </div>
  );
};
