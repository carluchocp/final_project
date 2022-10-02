import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.jsx";
import logo from "../../img/foodies.png";
import { NewPostForm } from "../component/newpostform.jsx";
// import styles from "../../styles/postcomponent.css";

export const NewPost = () => {
  return (
    <div className="pageform-container">
      <NewPostForm />
    </div>
  );
};
