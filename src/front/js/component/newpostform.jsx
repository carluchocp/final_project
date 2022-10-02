import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.jsx";
import logo from "../../img/foodies.png";

export const NewPostForm = () => {
  return (
    <div className="container-page">
      <div className="text-center">
        <br />
        <h1>¿Qué publicarás hoy foodie?</h1>
        <br />
      </div>
      <div className="container">
        <form>
          <div className="form-group">
            <label>Nombre de la receta</label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Ejemplo: Ratatouille"
              name="recipe-name"
            />
          </div>
          <br />
          <div className="form-group">
            <label>Añade una pequeña descripción:</label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Ejemplo: Es un platillo compuesto por verduras, salsa..."
              name="description-recipe"
            />
          </div>
          <br />
          <div className="form-group">
            <label>Añade una imagen de la receta:</label>
            <input
              type={"file"}
              className="form-control"
              placeholder="Añade una imagen"
              name="photo-recipe"
            />
          </div>
          <br />
          <div className="container-time">
            <label>¿Cuál es la dificultad de la receta?</label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Puede ser: Principiante, Intermedio o Avanzado"
              name="difficulty-recipe"
            />
          </div>
          <br />
          <div className="container-time">
            <label>Tiempo estimado de preparación</label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Ejemplo: 1h o 35min"
              name="time-recipe"
            />
          </div>
          <br />
          <div className="form-group">
            <label>¿Para cuantas porciones rinde la receta?</label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Debe ser un número"
              name="portions-recipe"
            />
          </div>
          <br />
          <div className="form-group">
            <label>Ingredientes necesarios para tu receta:</label>
            <input
              type={"text"}
              className="form-control"
              placeholder=" Ejemplo: 3 tomates, 5 cebollas, 1 rama de romero..."
              name="ingredients-recipe"
            />
          </div>
          <br />
          <div className="form-group">
            <label>Pasos para preparar tu receta:</label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Ejemplo: cortar los vegetales, precalentar el horno..."
              name="preparation-recipe"
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
