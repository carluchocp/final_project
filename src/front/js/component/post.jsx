import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.jsx";
import logo from "../../img/foodies.png";
import styles from "../../styles/postcomponent.css";

export const Post = ({post}) => {
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
              <p className="card-text">
                {post.caption}
              </p>
              <p className="card-level-recipe">
                <medium className="text-muted">
                  📊 {post.level} | 🕓 {post.time} | 🍽️ {post.portions}
                </medium>
              </p>
              <div className="container-buttons">
                <p className="text-like-button">
                  {" "}
                  Me gusta{" "}
                  <button className="like-button">
                    <i class="fa-regular fa-heart"></i>
                  </button>
                </p>
                <p className="text-favorite-button">
                  {" "}
                  Agregar a favoritos
                  <button className="favorite-button">
                    <i class="fa-regular fa-star"></i>
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
