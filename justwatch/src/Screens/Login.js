/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../src/fetcher';
import { setLoggedInUser } from '../Modules/LoginLocalStorage';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigator = useNavigate();

  async function loginUser(usernameInput, passwordInput) {
    //check if user exists
    getUser(username, password).then((data) => {
      // if user exists, set current user in local storage
      if (data.message) {
        setLoggedInUser(data.message); 
        navigator('/movieselection');
      } else { //if info incorrect
        alert("Incorrect Username or Password");
      }
    }).catch((err) => {
      // if user does not, show error
      console.log(err);
    });

    // const result = await getUser(usernameInput, passwordInput);
    // if ()
    // console.log("res: " + result);
    
  }

  return (
    <div className="div">
      <div className="div-2">
        <div className="builder-columns div-3">
          <div className="builder-column column">
            <div className="div-4">Just Watch</div>
          </div>
        </div>
      </div>
      <form className="form">
        <label>
          Username
          <input
            className="label"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            className="label"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </form>
      <button 
        className="button" 
        type="submit"
        onClick={() => loginUser(username, password)}
      >
        Login
      </button>
    </div>

  );
}

export default Login;
