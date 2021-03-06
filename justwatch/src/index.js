import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import './index.css';
import App from './App';
import Register from './Screens/Register';
import Login from './Screens/Login';
import reportWebVitals from './reportWebVitals';
import Movieselection from './Screens/Movieselection';
import Profile from './Screens/Profile';
import NavBar from './Components/NavBarComponent';
import InitialScreen from './Screens/InitialScreen';
import Groups from './Screens/Groups';
import Messaging from './Screens/Messaging';
import Friends from './Screens/Friends';
import AnalyticsScreen from './Screens/AnalyticsScreen';



ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<InitialScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movieselection" element={<Movieselection />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/messaging" element={<Messaging />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/analytics" element={<AnalyticsScreen />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
