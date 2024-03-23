// handel all the api calls to the tmdb api

// get details of a movie by name 
export const getMovieDetails = async (movieName: string) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${movieName}`);
    const data = await response.json();
    return data;
}