import React, { useState, useEffect } from "react";
import DataPanel from "../Components/DataPanel";
import { getInteractions, getUsers } from "../Services/fetcher";
import { getLoggedInUser } from '../Modules/LoginLocalStorage';
import { getUserStats, getAverageStats } from "../Utils/analyticsHelpers";
import "./AnalyticsScreen.css";

function AnalyticsScreen(props) {

  const [currUser, setCurrUser] = useState(getLoggedInUser().username);
  const [allInteractions, setAllInteractions] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [avgData, setAvgData] = useState({});
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function getData() {
      await getInteractions().then((data) => {
        setAllInteractions(JSON.parse(data.message));
      });
      await getUsers().then((data) => {
        setAllUsers(JSON.parse(data.message));
      });
      await setUserData(await getUserStats(currUser, allInteractions));
    }
    // getInteractions().then((data) => {
    //   setAllInteractions(JSON.parse(data.message));
    // });
    // getUsers().then((data) => {
    //   setAllUsers(JSON.parse(data.message));
    // });
    // setUserData(getUserStats(currUser, allInteractions));
    getData();
  });



  // const sampleAvgData = {
  //   weeklyAppUsage: "20 minutes",
  //   moviesLiked: 10,
  //   moviesDisliked: 20,
  //   moviesSuperliked: 2,
  //   numGroups: 3,
  // }

  // const sampleUserData = {
  //   weeklyAppUsage: "40 minutes",
  //   moviesLiked: 15,
  //   moviesDisliked: 12,
  //   moviesSuperliked: 4,
  //   numGroups: 5,
  // }

  return (
    <div className="analytics-screen">
      {/* <NavBar /> */}
      <div className="panel-container">
        <div className="average-stats">
          {/* ICON HERE */}
          <DataPanel 
            name="Average User Watch Stats"
            usageData={avgData}
          />
        </div>
        <div className="user-stats">
          {/* ICON HERE */}
          <DataPanel
            name="My Watch Stats"
            usageData={userData} 
          />
        </div>
      </div>
    </div>
  );
}

export default AnalyticsScreen;
