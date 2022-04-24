import React from 'react';
import './NavBarComponent.css';
import { useNavigate } from 'react-router-dom';

function NavBar() {

    const navigator = useNavigate();

    function Logout() {
        navigator('/');
    }

    function GoToProfile() {
        navigator('/profile');
    }

    function GoToMovieSelection() {
        navigator('/movieselection')
    }

    function GoToGroups() {
        navigator('/groups')
    }

    function GoToFriends() {
        navigator('/friends')
    }

    return (
        <div className="titleBar">
        <div className="titleText">
        JustWatch
        </div>
        <button className="logoutButton" type="submit" onClick={Logout}>Logout</button>
        <button className="profileButton" type="submit" onClick={GoToProfile}>Profile</button>
        <button className="movieSelectionButton" type="submit" onClick={GoToMovieSelection}>Movie Selection</button>
        <button className="groupsButton" type="submit" onClick={GoToGroups}>Groups</button>
        <button className="friendsButton" type="submit" onClick={GoToFriends}>Friends</button>
</div>


    );

}

export default NavBar;