import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext.jsx";
import { ProfileCard } from "../component/profilecard.jsx";

export const SearchUsers = (props) => {
  const { store, actions } = useContext(Context);
  const [profile, setProfile] = useState({search: ''})
  const [user, setUser] = useState([])

  let handleSubmit = async(event) => {
    event.preventDefault();
    console.log("ejecuto el submit");
    const result = await actions.searchProfiles(profile)
    if (result) {
      console.log(result)
      setUser(result)
      console.log("busqueda exitosa")
    } else {
      console.log("negada la busqueda")
    }
  }
  let handleChange = (event) => {
    setProfile({search: event.target.value})
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <h1>aqui puedes buscar a cualquier usuario</h1>
      </div>
      <br />
      <div>
        <h4>si quieres buscar una receta dale <a href="/search/posts">click aqui</a></h4>
      </div>
      <br />
      <div className="row d-flex justify-content-center">
        <div className="col-10">
          <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input className="form-control me-2" type="text" placeholder="Search" aria-label="Search" onChange={handleChange}/>
            <button className="btn btn-primary" type="submit">Search</button>
          </form>
        </div>
        <div className="my-4">
          {user?.map((profile) => (
            <ProfileCard key={profile.id} profile={profile}/>
          ))}
        </div>
      </div>
    </div>
  );
};