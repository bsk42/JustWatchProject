function getValFreq(arr, prop, val) {
  return arr.filter((obj) => obj[prop] === val).length;
}
  
export async function getUserStats(currUser, allInteractions) {
  const userInteractions = allInteractions.filter(obj => obj.username === currUser);
  return {'moviesLiked': getValFreq(userInteractions, 'interaction', 'like'),
          'moviesDisliked': getValFreq(userInteractions, 'interaction', 'dislike'),
          'moviesSuperliked': getValFreq(userInteractions, 'interaction', 'superlike')}
}

export async function getAllUserStats(allInteractions, allUsers) {
  const allUsernames = allUsers.map(user => user.username).filter(username => username !== null);
  return await Promise.all(allUsernames.map(username => getUserStats(username, allInteractions)));
}

/*
[{
  'moviesLiked': 1,
  'moviesDisliked': 2,
  'moviesSuperliked': 3,
}]
*/

export function getAvgValue(arr, prop) {
  console.log(arr);
  return Math.round((arr.reduce((total, next) => total + next[prop], 0) / arr.length) * 100) / 100;
}
  
export async function getAverageStats(allUserStats) {
  return {'moviesLiked': getAvgValue(allUserStats, 'moviesLiked'),
          'moviesDisliked': getAvgValue(allUserStats, 'moviesDisliked'),
          'moviesSuperliked': getAvgValue(allUserStats, 'moviesSuperliked')}
}