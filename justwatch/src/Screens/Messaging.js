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
  let [showNot, setShowNot] = useState(false);

  useEffect(() =>{
    async function fetchmessages(){
      let result = await getMessages(from, to);
      //console.log('messages FE')
     // console.log(result);
      console.log(messages);
      console.log(result.length);
      if (messages.length !== result.length && showNot === true){
        alert('You got a new message');
      }
      setShowNot(true);
      setmessages(result);
    }
    
    const counterInterval = setInterval(() => {
      fetchmessages();
    }, 5000);

    return () => clearInterval(counterInterval);

  }, [messages, showNot]);

  const handleSendMessage = async(e) =>{
    e.preventDefault();
    await sendMessage(from, to, {sender: from, message: content.current});
    setShowNot(false);
  }

  function whoMessage(sender) {
    if (sender === getLoggedInUser().username) {
      return 'mine messages';
    } else {
      return 'yours messages';
    }
  }
  

  return (
    <div className="div">
      <div className = "chat">
    <div>
          { messages.map(message => 
              <div className={whoMessage(message.sender)}>
              <div className="message last">
                {message.message}
              </div>
            </div>
          )}
      <hr />
    </div>
    <textarea  cols="15" rows="5"  onChange={(e) => content.current = e.target.value}/>
    <button type="button" onClick={(e) => handleSendMessage(e)}>Send</button>
  </div>
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
