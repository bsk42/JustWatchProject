/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../src/fetcher';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
        onClick={() => login(username, password)}
      >
        Login
      </button>
    </div>

  );
}

export default Login;
