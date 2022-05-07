import React, { useState, useEffect } from "react";
import DataPanel from "../Components/DataPanel";
import { getLoggedInUser } from "../Modules/LoginLocalStorage";
import { getUserStats, getAverageStats } from "../Utils/analyticsHelpers";
import "./AnalyticsScreen.css";

function AnalyticsScreen(props) {

  const [username, setUsername] = useState(JSON.parse(getLoggedInUser()).username);
  const [interactions, setInteractions] = useState([]); // GET ALL INTERACTIONS
  const [users, setUsers] = useState([]); // GET ALL USERS

  const sampleUsers = [{
    "username": "matt",
    "password": "password",
    "name": "matt",
    "email": "mp@gmail.com",
  },
  {
    "username": "matt",
    "password": "password",
    "name": "matt",
    "email": "mp@gmail.com",
  },
  {
    "username": "oliver",
    "password": "password",
    "name": "matt",
    "email": "mp@gmail.com",
  },
  {
    "username": "jono",
    "password": "password",
    "name": "matt",
    "email": "mp@gmail.com",
  },]

  const sampleInteractions = [{
    "username": "oliver",
    "movie": "tt1877830",
    "interaction": "like"
  },
  {
    "username": "oliver",
    "movie": "tt1877831",
    "interaction": "dislike"
  },
  {
    "username": "matt",
    "movie": "tt1877830",
    "interaction": "like"
  },
  {
    "username": "kush",
    "movie": "tt1877830",
    "interaction": "superlike"
  },
  {
    "username": "kush",
    "movie": "tt1877831",
    "interaction": "superlike"
  },
  {
    "username": "ben",
    "movie": "tt1877830",
    "interaction": "like"
  }];

  function getValFreq(arr, prop, val) {
    return arr.filter((obj) => obj[prop] === val).length;
  }

  function getUserStats(currUser, allInteractions) {
    const userInteractions = allInteractions.filter(obj => obj.username === currUser);
    return {'like': getValFreq(userInteractions, 'interaction', 'like'),
            'dislike': getValFreq(userInteractions, 'interaction', 'dislike'),
            'superlike': getValFreq(userInteractions, 'interaction', 'superlike')};
  }

  // console.log(getUserStats('oliver', sampleInteractions)); // existing user
  // console.log(getUserStats('asdjfkgansdg', sampleInteractions)); // non-existant user

  function getAverageStats(allInteractions, allUsers) {
    const interactionUsers = allInteractions.map(inter => inter.username);
    const interactionUserSet = interactionUsers.filter((val, idx, arr) => arr.indexOf(val) === idx);
    const allUsersSet = allUsers.map(user => user.username).filter((val, idx, arr) => arr.indexOf(val) === idx);
    const userUnion = [...new Set([...interactionUserSet, ...allUsersSet])];
    let allUserStats = [];
    for (let i = 0; i < userUnion.length; ++i) {
      let currUser = userUnion[i];
      let currUserStats = getUserStats(currUser, allInteractions);
      allUserStats.push(currUserStats);
    }
    return {'like': allUserStats.map(obj => obj.like).reduce((a, b) => a + b) / allUserStats.length,
            'dislike': allUserStats.map(obj => obj.dislike).reduce((a, b) => a + b) / allUserStats.length,
            'superlike': allUserStats.map(obj => obj.superlike).reduce((a, b) => a + b) / allUserStats.length};
  }
  
  console.log(getAverageStats(sampleInteractions, sampleUsers));

  const sampleAvgData = {
    moviesLiked: 10,
    moviesDisliked: 20,
    moviesSuperliked: 2,
    numGroups: 3,
  }

  const sampleUserData = {
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
