import face from '../Assets/Face.jpg';
import './Profile.css';
import TagsInput from "../Components/TagsInput"

function Profile() {
  return (
    <div className="Profile">
      <header className="Profile-header">
        <img src={face} className="Profile-logo" alt="logo" />
        <h1>
          Profile
        </h1>
        <h4>
        	Name: Test Name
        </h4>
        <h4>
        	Username: test
        </h4>
        <p>
        	Genre:
        </p>
        <TagsInput />
        <p>
        	Streaming Services:
        </p>
        <TagsInput />
        <button>
		  Back
	  	</button>
      </header>
      
    </div>
  );
}

export default Profile;
