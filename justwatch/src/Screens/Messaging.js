/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './Messaging.css';

function Messaging() {
  const SendMessage = null;
  const ReturnButton = null;
  const GoToProfile = null;
  const GoToGroups = null;
  const textMessage = null;

  return (
    <div className="div">
      <div className="titleBar">
        <div className="titleText">
          JustWatch
        </div>
      </div>
      <button className="returnButton" type="submit" onClick={ReturnButton}>Return</button>
      <button className="profileButton" type="submit" onClick={GoToProfile}>Profile</button>
      <button className="groupButton" type="submit" onClick={GoToGroups}>Groups</button>
      <div className="chat">
        <div className="yours messages">
          <div className="message last">
            Hello, how is it going?
          </div>
        </div>
        <div className="mine messages">
          <div className="message">
            Great thanks!
          </div>
          <div className="message last">
            How about you?
          </div>
        </div>
      </div>
      <label>
        Enter Text
        <input className="label" type="text" value={textMessage} />
      </label>
      <button className="sendButton" type="submit" onClick={SendMessage}>Send</button>
    </div>

  );
}

export default Messaging;
