import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext.jsx";
import { Post } from "../component/post.jsx";

export const SearchPosts = (props) => {
  const { store, actions } = useContext(Context);
  const [post, setPost] = useState({search: ''})

  let handleSubmit = (event) => {
    event.preventDefault();
    console.log("ejecuto el submit");
    if (actions.searchPosts(post)) {
      console.log("busqueda exitosa")
    } else {
      console.log("negada la busqueda")
    }
      // useEffect(() => {
      //   actions.getPosts()
      // }, [])
  }
  let handleChange = (event) => {
    setPost({search: event.target.value})
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <h1>aqui puedes buscar a cualquier receta</h1>
      </div>
      <br />
      <div>
        <h4>si quieres buscar un usuario dale <a href="/search/users">click aqui</a></h4>
      </div>
      <br />
      <div className="row d-flex justify-content-center">
        <div className="col-10">
          <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input name="search" className="form-control me-2" type="text" placeholder="Search" aria-label="Search" onChange={handleChange}/>
            <button className="btn btn-primary" type="submit">Search</button>
          </form>
        </div>
        <div classname="my-4">
          {store.posts.map((post) => (
            <Post key={post.id} post={post}/>
          ))}
        </div>
      </div>
    </div>
  );
};