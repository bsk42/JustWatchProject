import React from 'react';
import './NavBarComponent.css';
import { useNavigate } from 'react-router-dom';

function NavBar() {

    const navigator = useNavigate();

    function GoToProfile() {

    }

    function Logout() {
        
    }

    function GoToProfile() {
        navigator('/profile');
    }

    function GoToMovieSelection() {
        
    }

    return (
        <div className="titleBar">
        <div className="titleText">
        JustWatch
        </div>
        <button className="returnButton" type="submit" onClick={Logout}>Return</button>
        <button className="profileButton" type="submit" onClick={GoToProfile}>Profile</button>
        <button className="groupButton" type="submit" onClick={GoToMovieSelection}>Groups</button>
</div>


    );

}

export default NavBar;