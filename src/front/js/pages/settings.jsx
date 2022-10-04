import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.jsx";
import logo from "../../img/foodies.png";
import { SettingsProfile } from "../component/settingsprofile.jsx";
// import styles from "../../styles/postcomponent.css";

export const Settings = () => {
  return (
    <div className="settings-form-container">
      <SettingsProfile />
    </div>
  );
};
