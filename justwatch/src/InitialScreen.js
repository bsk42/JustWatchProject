import React from 'react';
import './InitialScreen.css';
import { useNavigate } from 'react-router-dom';

function InitialScreen() {
  const navigator = useNavigate();

  const handleLogin = () => {
    navigator('/login');
  };

  const handleRegister = () => {
    navigator('/register');
  };

  return (
    <div className="div">
      <div className="div-2">
        <div className="builder-columns div-3">
          <div className="builder-column column">
            <div className="div-4">Just Watch</div>
          </div>
        </div>
      </div>
      <button className="button" type="submit" onClick={handleLogin}>LOGIN</button>
      <button className="button" type="submit" onClick={handleRegister}>REGISTER</button>
    </div>
  );
}

export default InitialScreen;
