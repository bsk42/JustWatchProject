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
    }
    getData();
  });

  function testAverageStats(allInteractions, allUsers) {
    const allUsernames = allUsers.map(user => user.username).filter(username => username !== null);
    Promise.all(allUsernames.map(username => getUserStats(username, allInteractions))).then((data) => {
      setAllUserStats(data);
    });
    return 1;
  }

  console.log(getAllUserStats(allInteractions, allUsers));  

  // console.log(testAverageStats(allInteractions, allUsers));

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
