export default function selectRandomMovieId(likedMovies, superLikedMovies, dislikedMovies, allMovies) {
  let diff1 = allMovies.filter(id => !likedMovies.includes(id));
  let diff2 = diff1.filter(id => !superLikedMovies.includes(id));
  let possibleIds = diff2.filter(id => !dislikedMovies.includes(id));
  return possibleIds[Math.floor(Math.random() * possibleIds.length)];
}