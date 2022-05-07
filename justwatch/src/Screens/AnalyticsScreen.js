import React, { useState, useEffect } from "react";
import DataPanel from "../Components/DataPanel";
import { getInteractions, getUsers } from "../Services/fetcher";
import { getLoggedInUser } from '../Modules/LoginLocalStorage';
import { getUserStats, getAllUserStats, getAverageStats } from "../Utils/analyticsHelpers";
import "./AnalyticsScreen.css";

function AnalyticsScreen(props) {

  const [currUser, setCurrUser] = useState(getLoggedInUser().username);
  const [allInteractions, setAllInteractions] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [avgData, setAvgData] = useState({});
  const [userData, setUserData] = useState({});
  const [allUserStats, setAllUserStats] = useState([]);

  useEffect(() => {
    async function getData() {
      await getInteractions().then((data) => {
        setAllInteractions(JSON.parse(data.message));
      });
      await getUsers().then((data) => {
        setAllUsers(JSON.parse(data.message));
      });
      await setUserData(await getUserStats(currUser, allInteractions));
      await setAllUserStats(await getAllUserStats(allInteractions, allUsers));
      await setAvgData(await getAverageStats(allUserStats));
    }
    getData();
  });

  return (
    <div className="div">
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
