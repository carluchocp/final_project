import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.jsx";
import logo from "../../img/foodies.png";
import styles from "../../styles/profilecard.css";


export const ProfileCard = (props) => {
  const {store, actions} = useContext(Context)
  const [profiles, setProfiles] = useState(props.profile)
  console.log(props)
  return (
    <div className="container-card-profile">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={profiles?.image_url}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div className="header-profile">
                <h4 className="card-title">{profiles?.username}</h4>
                
                <button className="button-settings">
                  <Link to="/settings"><i className="fa-solid fa-gear"></i></Link>
                </button>
              </div>
              <div>
                <h6>{profiles?.name}</h6>
              </div>
              <div className="card-level-recipe">
                <div className="text-muted">
                  👥 30 seguidores | 👥 60 seguidos | ⭐ 23 Favoritos
                </div>
              </div>
              <div className="card-level-recipe">
                <div className="text-muted">{profiles?.location}</div>
              </div>
              <p className="card-text">
                {profiles?.biography}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
