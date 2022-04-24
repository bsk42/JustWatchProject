export async function GetMovieInfoById(id) {
    try{
        const response = await fetch('http://localhost:3001/movies/' + id);
        const movieResponse =  (await response.json())[0];
        console.log(movieResponse);
        const newMovie = {
            title: movieResponse.title,
            description: movieResponse.plot,
            streaming: "prime",
            image: movieResponse.image,
            trailer: movieResponse.trailer,
            rating: movieResponse.imDbRating,
        }
        console.log("nm" + newMovie.title);
        return newMovie;
    }catch(error) {
        console.log(error);
        return [];
    }
}