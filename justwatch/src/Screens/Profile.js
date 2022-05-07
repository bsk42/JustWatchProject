import './Profile.css';
import TagsInput from "../Components/TagsInput"

function Profile({ name, username, genre, streamingServices}) {

    genre = ["comedy"];
    streamingServices = ["netflix"];

  return (
    <div className="Profile">
      <header className="Profile-header">
        <h1>
          Profile
        </h1>
        <h4>
            Name: {name}
        </h4>
        <h4>
            Username: {username}
        </h4>
        <p>
            Genre: 
        </p>
        <TagsInput existingTags = {genre} />
        <p>
            Streaming Services:
        </p>
        <TagsInput existingTags={streamingServices} />
        <button>
          Back
        </button>
      </header>
      
    </div>
  );
}

export default Profile;
