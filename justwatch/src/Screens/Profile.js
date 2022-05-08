import './Profile.css';
import { getLoggedInUser } from '../Modules/LoginLocalStorage';


function Profile() {

  return (
    <div className="Profile">
      <header className="Profile-header">
        <h1>
          Profile
        </h1>
        <h3>
            Name: {getLoggedInUser().name}
        </h3>
        <h3>
            Username: {getLoggedInUser().username}
        </h3>
        <h3>
            Email: {getLoggedInUser().email}
        </h3>
  
      </header>
      
    </div>
  );
}

export default Profile;
