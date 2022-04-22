export async function GetMovieInfoById(id) {
    try{
        const response = await fetch('http://localhost:3001/movies/' + id);
        const movieResponse =  (await response.json())[0];
        console.log(movieResponse);
        const newMovie = {
            title: movieResponse.title,
            description: "2006 ‧ Adventure ‧ 1h 24m Kazakh TV talking head Borat is dispatched to the United States to report on the greatest country in the world. With a documentary crew in tow, Borat becomes more interested in locating and marrying Pamela Anderson.",
            streaming: "prime",
            image: movieResponse.image,
            trailer: "https://www.imdb.com/video/imdb/vi1712300569/imdb/embed",
            rating: movieResponse.imDbRating,
        }
        console.log("nm" + newMovie.title);
        return newMovie;
    }catch(error) {
        console.log(error);
        return [];
    }
}