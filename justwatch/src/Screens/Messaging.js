import {useRef, useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { getLoggedInUser } from '../Modules/LoginLocalStorage';
import { getMessages, sendMessage } from '../Services/fetcher';
import './Messaging.css';

function Messaging(props) {
  let from = getLoggedInUser().username;
  let to = useLocation().state.username;
  let content = useRef('');
  

  // state for the messages
  const [messages, setmessages] = useState([]);


  useEffect(() =>{
    async function fetchmessages(){
      const mesgs = await getMessages(from, to);
      console.log(from);
      // update the state
      setmessages(mesgs);
    }

    // we want to fetch the users frequently (5 s)
    //we will use server polling with setInterval
    setInterval(() => {
      fetchmessages();
    }, 5000);
    
  });

  const handleSendMessage = async(e) =>{
    e.preventDefault();
    await sendMessage(from, to, {sender: from, message: content.current});
  }

  

  return (
    <div>
    <div>
      <h2>Previous Messages</h2>
      <div>{messages.map( msg => <p>{JSON.stringify(msg)}</p>)}</div>
      <hr />
    </div>
    <h2>New Message</h2>
    <textarea  cols="15" rows="5"  onChange={(e) => content.current = e.target.value}/>
    <button type="button" onClick={(e) => handleSendMessage(e)}>Send</button>
  </div>
    /*
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
  */

  );
}



export default Messaging;
