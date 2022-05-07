import React, {useEffect} from 'react';
import { dummyUsers } from "./Users";
import './Friends.css'

import { useNavigate } from 'react-router-dom';

function Friends() {

    const navigator = useNavigate();

    function goToMessage() {
        navigator('/messaging');
    }

    /*
    useEffect(() => {
        Talk.ready.then(() => {
          var me = new Talk.User({
            id: 1,
            name: 'oliver',
            email: 'oliver@sample.com',
            photoUrl: 'https://scontent-iad3-1.xx.fbcdn.net/v/t1.18169-9/970139_1383007531924595_2013075611_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=de6eea&_nc_ohc=QWSQ8AFnQzAAX-gQ1bK&_nc_ht=scontent-iad3-1.xx&oh=00_AT_f7ri5uKcJi0d4y9J3pZFx8WEA3T_nr2gPq2fzg1goIA&oe=628CC9FA',
            welcomeMessage: 'Hey there! How are you? :-)',
            role: 'default',
          });
        });
      }, []);
*/
 
    return (
        <div className="div">
            <div className="users">
                <div className="users-container"> 
                    <ul>
                        { dummyUsers.map(user => 
                            <li key={user.id} className="user">
                                <picture className="user-picture">
                                    <img src={user.photoUrl} alt={`${user.name}`} className ="photo" />
                                </picture>
                                <div className="user-info-container">
                                    <div className="user-info">
                                        <h4>{user.name}</h4>
                                        <p>{user.info}</p>
                                    </div>
                                    <div className="user-action">
                                        <button className="messageButton" onClick={goToMessage}>Message</button>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                    <div className="chatbox-container">
                    <div id="talkjs-container" style={{height: "300px"}}></div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Friends;