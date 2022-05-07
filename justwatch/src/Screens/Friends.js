import React, {useEffect, useState} from 'react';
import './Friends.css'

import { useNavigate, useLocation } from 'react-router-dom';
import { getFriendsList } from '../Services/fetcher';
import { dummyUsers } from './Users';
import "regenerator-runtime/runtime.js";

function Friends() {

    const navigator = useNavigate();
    
    function goToMessage(user) {
        console.log(user.username);
        navigator('/messaging', {state: {
            username: user.username,
        }});
    }
    

    const [friendsList, setFriendsList] = useState([{
        _id: "6275db4460226a7666661363",
        username: "ben1",
        name: "ben",
        email: "email",
        password: "pass",
        likes: [
            "tt0443453",
            "tt8178634",
            "tt1160419",
            "tt1464335",
            "tt13610562"
        ],
        matches: [
            "tt0443453",
            "tt8178634",
            "tt1160419",
            "tt1464335",
            "tt13610562"
        ],
        numMatches: 5
    }]);

    useEffect(() => {
        console.log("hi");
        getFriendsList().then((data) => setFriendsList(data));
    }, []);

    // let mounted = true;
    //     getFriendsList()
    //     .then((data) => {
    //         if (mounted) {
    //           setFriendsList(data);
    //         }
    //     })
    //     .catch((err) => console.log(err));
    //     return () => mounted = false;


    return (
        <div className="div">
            <div className="users">
                <div className="users-container"> 
                    <ul>
                        { friendsList.map(user => 
                            <li key={user._id} className="user">
                                <div className="user-info-container">
                                    <div className="user-info">
                                        <h4>{user.name}</h4>
                                        <p>Email: {user.email}</p>
                                        <p>Number Matches: {user.numMatches}</p>
                                        <p>Movies you both like: {user.movieMatches}</p>
                                    </div>
                                    <div className="user-action">
                                        <button className="messageButton" onClick={() => goToMessage(user)}>Message</button>
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