import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.jsx";
import logo from "../../img/foodies.png";
import { Post } from "../component/post.jsx";
// import styles from "../../styles/postcomponent.css";

export const Feed = () => {
  return (
    <div className="recipes-feed">
      <Post />
    </div>
  );
};
