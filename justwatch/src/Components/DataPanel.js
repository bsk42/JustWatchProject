import React, { useState } from "react";
import "./DataPanel.css";

function DataPanel(props) {

  const { usageData } = props;
  
  return (
    <div className="data-panel">
      {`Weekly App Usage: ${usageData.weeklyAppUsage}\n
        Movies Liked: ${usageData.moviesLiked}\n
        Movies Disliked: ${usageData.moviesDisliked}\n
        Movies Superliked: ${usageData.moviesSuperliked}\n
        Number of Groups: ${usageData.numGroups}`} 
    </div>
  );
}

export default DataPanel;
