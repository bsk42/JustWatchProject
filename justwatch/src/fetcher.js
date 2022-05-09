

const hostUrl = 'https://powerful-reaches-01306.herokuapp.com'

const register = async (username, name, email, password) => {
  const res = await fetch(`${hostUrl}/register`, {
    method: 'POST',
    body: JSON.stringify({
      username, 
      name,
      email,
      password,
    }),
  });
  return res.json();
}

const login = async (username, password) => {
  const res = await fetch(`${hostUrl}/login?username=${username}&password=${password}`, {
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





export {
  register,
  login,
  getMovies,
  deleteUser,
  updateScore,
}