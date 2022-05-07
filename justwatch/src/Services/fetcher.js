import { useNavigate } from 'react-router-dom';

const hostUrl = 'http://127.0.0.1:5005'

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

const getMovies = async () => {
  const res = await fetch(`${hostUrl}/movies`, {
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

const getInteractions = async () => {
  const res = await fetch (`${hostUrl}/interactions`, {
    method: 'GET',
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
}