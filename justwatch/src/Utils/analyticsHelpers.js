function getValFreq(arr, prop, val) {
  return arr.filter((obj) => obj[prop] === val).length;
}
  
export function getUserStats(currUser, allInteractions) {
  const userInteractions = allInteractions.filter(obj => obj.username === currUser);
  return {'moviesLiked': getValFreq(userInteractions, 'interaction', 'like'),
          'moviesDisliked': getValFreq(userInteractions, 'interaction', 'dislike'),
          'moviesSuperliked': getValFreq(userInteractions, 'interaction', 'superlike')}
}
  
export function getAverageStats(allInteractions, allUsers) {
  const interactionUsers = allInteractions.map(inter => inter.username);
  const interactionUserSet = interactionUsers.filter((val, idx, arr) => arr.indexOf(val) === idx);
  const allUsersSet = allUsers.map(user => user.username).filter((val, idx, arr) => arr.indexOf(val) === idx);
  const userUnion = [...new Set([...interactionUserSet, ...allUsersSet])];
  let allUserStats = [];
  for (let i = 0; i < userUnion.length; ++i) {
    let currUser = userUnion[i];
    let currUserStats = getUserStats(currUser, allInteractions);
    allUserStats.push(currUserStats);
  }
  return {'moviesLiked': allUserStats.map(obj => obj.like).reduce((a, b) => a + b) / allUserStats.length,
          'moviesDisliked': allUserStats.map(obj => obj.dislike).reduce((a, b) => a + b) / allUserStats.length,
          'moviesSuperliked': allUserStats.map(obj => obj.superlike).reduce((a, b) => a + b) / allUserStats.length};
}