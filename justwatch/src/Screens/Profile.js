import './Profile.css';

function Profile({ name, username, email}) {

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
        <h4>
            Email: {email}
        </h4>
  
      </header>
      
    </div>
  );
}

export default Profile;
