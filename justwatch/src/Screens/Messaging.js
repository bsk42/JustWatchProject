import {useRef, useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { getLoggedInUser } from '../Modules/LoginLocalStorage';
import { getMessages } from '../Services/fetcher';
import './Messaging.css';

function Messaging(props) {
  let from = getLoggedInUser().username;
  let to = useLocation().state.username;

  // state for the messages
  const [messages, setmessages] = useState([]);


  useEffect(() =>{
    async function fetchmessages(){
      const mesgs = await getMessages();
      // update the state
      setmessages(mesgs);
    }

    // we want to fetch the users frequently (5 s)
    //we will use server polling with setInterval
    setInterval(() => {
      fetchmessages();
    }, 5000);
    
  },[messages]);

  

  return (
    <div className="div">
      
    <div className="chat">
      <div className="yours messages">
        <div className="message last">
          {from}
        </div>
      </div>
      <div className="mine messages">
        <div className="message">
          {to}
        </div>
        <div className="message last">
          How about you?
        </div>
         <div className="message last">
          How about you?
        </div>
      </div>
      <div className="yours messages">
        <div className="message last">
          {from}
        </div>
      </div>
    </div>
  </div>

  );
}



export default Messaging;
