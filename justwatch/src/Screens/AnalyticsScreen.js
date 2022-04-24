import React from "react";
import DataPanel from "../Components/DataPanel";
import NavBar from "../Components/NavBarComponent";
import "./AnalyticsScreen.css";

function AnalyticsScreen(props) {

  const sampleAvgData = {
    weeklyAppUsage: "20 minutes",
    moviesLiked: 10,
    moviesDisliked: 20,
    moviesSuperliked: 2,
    numGroups: 3,
  }

  const sampleUserData = {
    weeklyAppUsage: "40 minutes",
    moviesLiked: 15,
    moviesDisliked: 12,
    moviesSuperliked: 4,
    numGroups: 5,
  }

  return (
    <div className="analytics-screen">
      {/* <NavBar /> */}
      <div className="panel-container">
        <div className="average-stats">
          {/* ICON HERE */}
          <DataPanel 
            name="Average User Watch Stats"
            usageData={sampleAvgData}
          />
        </div>
        <div className="user-stats">
          {/* ICON HERE */}
          <DataPanel
            name="My Watch Stats"
            usageData={sampleUserData} 
          />
        </div>
      </div>
    </div>
  );
}

export default AnalyticsScreen;
