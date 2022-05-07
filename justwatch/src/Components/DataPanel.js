import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./DataPanel.css";

function DataPanel(props) {

  const { usageData, name } = props;
  
  return (
    <div className="data-panel">
      <div className="name">
        { name }
      </div>
      {/* <div className="icon">
        <FontAwesomeIcon icon="fa-solid fa-user" />
      </div> */}
      <div className="data"> 
        <p className="data-text">{`Movies Liked: ${usageData.moviesLiked}`}</p>
        <p className="data-text">{`Movies Disliked: ${usageData.moviesDisliked}`}</p>
        <p className="data-text">{`Movies Superliked: ${usageData.moviesSuperliked}`}</p>
      </div>
    </div>
  );
}

export default DataPanel;
