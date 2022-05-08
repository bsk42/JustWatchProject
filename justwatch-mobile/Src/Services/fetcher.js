import { getLoggedInUser } from '../Modules/LoginLocalStorage';

const hostUrl = 'http://127.0.0.1:5005'


async function getNewMovie() {
  try{
    const user = getLoggedInUser();
      const response = await fetch(`${hostUrl}/users/getNewMovie?username=${user.username}`, 
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
        });
      const movieResponseData =  (await response.json());
      const movieResponse = JSON.parse(movieResponseData.data);
      const newMovie = {
          id: movieResponse._id,
          title: movieResponse.title,
          description: movieResponse.plot,
          image: movieResponse.image,
          trailer: movieResponse.trailer.linkEmbed,
          rating: movieResponse.imDbRating,
      }
      return newMovie;
  }catch(error) {
      console.log(error);
      return [];
  }
}

async function interactWithMovie(movie, interaction) {
  try{
    const user = getLoggedInUser();
      await fetch(`${hostUrl}/newInteraction?username=${user.username}&movie=${movie}&interaction=${interaction}`, {method: 'POST'});
  }catch(error) {
      console.log(error);
  }
}

async function getFriendsList() {
  try{
    const user = getLoggedInUser();

      const response = await fetch(`${hostUrl}/users/friendsList?username=${user.username}`, {method: 'GET'});
      const data =  await response.json();
      console.log('friends list');
      console.log(data);
      return data.data;
  }catch(error) {
      console.log(error);
  }
}

const register = async (username, name, email, password) => {
  console.log(`${hostUrl}/register`);
  const res = await fetch(`${hostUrl}/register`, {
    method: 'POST',
    body: JSON.stringify({
      username, 
      name,
      email,
      password,
    }),
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return res.json();
}

// FIX THIS
// const login = async (username, password) => {
//   console.log('in login fetcher');
//   fetch(`${hostUrl}/login`, {
//     method: 'POST',
//     body: JSON.stringify({
//       username,
//       password
//     }),
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//   }).then((res) => {
//     res.json();
//   }).then((data) => {
//     console.log(data);
//   })
  
// }

const getUser = async (username, password) => {
  const res = await fetch(`${hostUrl}/users/getUser?username=${username}&password=${password}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return res.json();
}

const getUsers = async (username, password) => {
  const res = await fetch(`${hostUrl}/users`, {
    method: 'GET',
  });
  return res.json();
}

const getMovies = async () => {
  const res = await fetch(`${hostUrl}/movies`, {
    method: 'GET',
  });
  return res.json();
}

const getInteractions = async () => {
  const res = await fetch(`${hostUrl}/interactions`, {
    method: 'GET',
  });
  return res.json();
}

// const getMovieById = async (id) => {
//   const res = await fetch(`${hostUrl}/`)
// }

const deleteUser = async (player) => {
  const res = await fetch(`${hostUrl}/delete?player=${player}`, {
    method: 'DELETE'
  });
  return res.json();
}

const updateScore = async (player, points) => {
  const res = await fetch(`${hostUrl}/leaders`, {
    method: 'POST',
    body: JSON.stringify({
      player,
      points,
    }),
  });
  return res.json();

  
}


// retrieves all the messages
const getMessages = async (from, to) =>{
  
  try{
      //console.log('getting messages fetcher');
      const response = await fetch(`${hostUrl}/messages?username1=${from}&username2=${to}`, {
        method: 'GET',
        mode: 'cors'
      });
      let data = await response.json();
      console.log(data);
      return data.messages;
  }
  catch(err){
      return 'error'; // return  error
  }
}

// send a message to the server
const sendMessage = async (from, to, content) =>{
  const res = await fetch(`${hostUrl}/messages`, {
    method: 'POST',
    body: JSON.stringify({
      from, 
      to,
      content,
    }),
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return res.json();
}


export {
  register,
  // login,
  getUser,
  getMovies,
  deleteUser,
  updateScore,
  getNewMovie,
  interactWithMovie,
  getMessages,
  sendMessage,
  getInteractions,
  getUsers,
  getFriendsList
}