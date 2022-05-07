/* eslint-disable jsx-a11y/label-has-associated-control */
import { register } from '../Services/fetcher';

import React, { useState } from 'react';

import './Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
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
          Name
          <input
            className="label"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email
          <input
            className="label"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
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
        onClick={() => register(username, name, email, password)}
      >
        Register
      </button>
    </div>

  );
}

export default Register;
