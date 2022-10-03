import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.jsx";
import logo from "../../img/foodies.png";
import styles from "../../styles/postcomponent.css";

export const MyPost = () => {
  return (
    <div className="container-post">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src="https://th.bing.com/th/id/R.bc7f1914b1109495ed9edb0dfae00bf0?rik=opGCn2cSlZKi3w&pid=ImgRaw&r=0"
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div className="header-post">
                <h4 className="card-title">Nombre Usuario | Ratatouille</h4>
                <button className="button-trash">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
              <p className="card-text">
                Es una preparación típica de la cocina francesa que consiste en
                un estofado de diferentes hortalizas típicas del sur de Francia.
                Proviene de la región de Provenza y del antiguo condado de Niza
                (sureste de Francia), por lo que se la llama también ratatouille
                niçoise.
              </p>
              <p className="card-level-recipe">
                <medium className="text-muted">
                  📊 Principiante | 🕓 2h | 🍽️ 13 porciones
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
                      <strong>This is the first item's accordion body.</strong>{" "}
                      It is shown by default, until the collapse plugin adds the
                      appropriate classes that we use to style each element.
                      These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify
                      any of this with custom CSS or overriding our default
                      variables. It's also worth noting that just about any HTML
                      can go within the <code>.accordion-body</code>, though the
                      transition does limit overflow.
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
                      <strong>This is the second item's accordion body.</strong>{" "}
                      It is hidden by default, until the collapse plugin adds
                      the appropriate classes that we use to style each element.
                      These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify
                      any of this with custom CSS or overriding our default
                      variables. It's also worth noting that just about any HTML
                      can go within the <code>.accordion-body</code>, though the
                      transition does limit overflow.
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
