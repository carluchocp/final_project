import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.jsx";
import logo from "../../img/foodies.png";
import styles from "../../styles/postcomponent.css";

export const Post = ({post}) => {
  const { actions } = useContext(Context)

  let handleDelete = (event) => {
    event.preventDefault();
    console.log("ejecuto el delete");
    if (actions.deletePost(post)) {
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
              <h4 className="card-title">{post.username} | {post.name}</h4>
              <button className="button-trash" onClick={handleDelete}>
                  <i className="fa-solid fa-trash"></i>
              </button>
              <p className="card-text">
                {post.caption}
              </p>
              <div className="card-level-recipe">
                <div className="text-muted">
                  📊 {post.level} | 🕓 {post.time} | 🍽️ {post.portions}
                </div>
              </div>
              <div className="container-buttons">
                <div className="text-like-button">
                  {" "}
                  Me gusta{" "}
                  <button className="like-button">
                    <i className="fa-regular fa-heart"></i>
                  </button>
                </div>
                <div className="text-favorite-button">
                  {" "}
                  Agregar a favoritos
                  <button className="favorite-button">
                    <i className="fa-regular fa-star"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="container-accordion">
              <div className="accordion" id={`collapse${post.id}`}>
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
                    data-bs-parent={`collapse${post.id}`}
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
