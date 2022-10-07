import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.jsx";
import logo from "../../img/foodies.png";
import { ProfileCard } from "../component/profilecard.jsx";
import { MyPost } from "../component/mypost.jsx";
import { Post } from "../component/post.jsx";
import styles from "../../styles/main.css";

export const Main = () => {
  const {store, actions} = useContext(Context)
  useEffect(() => {
    actions.getMainPosts()
    actions.getProfiles()
  }, [])
  console.log(store.profiles)

  return (
    <div className="container-main">
      <div className="container-profile">
        {
          store.profiles && <ProfileCard profile={store.profiles} />
        }
      </div>
      <h2 className="tittle-recipes">Mis recetas</h2>
      <div className="container-my-recipes">
        {store.posts.map((post) => (
          <MyPost key={post.id} post={post}/>
        ))}
      </div>
    </div>
  );
};
