/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './Groups.css';
import { useNavigate } from 'react-router-dom';


function Groups() {
  const navigator = useNavigate();

  const GoToMessages = () => {
    navigator('/messaging');
  };

  return (
    <div className="div">
        <div className="groupBox"></div>
            <div className="groupText">Group Name!</div>
        <button className="messageGroupButton" type="submit" onClick={GoToMessages}>Message Group</button>
    </div>
  );
}

export default Groups;
