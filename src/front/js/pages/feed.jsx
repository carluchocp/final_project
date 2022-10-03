import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.jsx";
import logo from "../../img/foodies.png";
import { Post } from "../component/post.jsx";
// import styles from "../../styles/postcomponent.css";

export const Feed = () => {
  const {store, actions} = useContext(Context)
  useEffect(() => {
    actions.getPosts()
  }, [])
  
  return (
    <div className="recipes-feed">
      {store.posts.map((post) => (
        <Post key={post.id} post={post}/>
      ))}
    </div>
  );
};
