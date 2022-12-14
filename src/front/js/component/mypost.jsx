import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.jsx";
import logo from "../../img/foodies.png";
import styles from "../../styles/postcomponent.css";

export const MyPost = ({post}) => {

  const { store, actions } = useContext(Context)
  let navigate = useNavigate();

  let handleDelete = (event) => {
    event.preventDefault();
    console.log("ejecuto el delete");
    const result = actions.deletePost(post.id)
    if (result) {
      navigate("/main");
      console.log("eliminado exitoso")
    } else {
      console.log("no se pudo eliminar")
    }
  }

  return (
    <div className="container-post">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={post.image_url}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div className="header-post">
                <h4 className="card-title">{post.username} | {post.name}</h4>
                <button className="button-trash" onClick={handleDelete}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
              <p className="card-text">
                {post.caption}
              </p>
              <div className="card-level-recipe">
                <div className="text-muted">
                  📊 {post.level} | 🕓 {post.time} | 🍽️ {post.portions}
                </div>
              </div>
              <div className="container-buttons">
                <p className="text-like-button">
                  {" "}
                  Me gusta{" "}
                  <button className="like-button">
                    <i className="fa-regular fa-heart"></i>
                  </button>
                </p>
                <p className="text-favorite-button">
                  {" "}
                  Agregar a favoritos
                  <button className="favorite-button">
                    <i className="fa-regular fa-star"></i>
                  </button>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="container-accordion">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Ingredientes
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      {post.ingredients}
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Preparación
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      {post.preparation}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
