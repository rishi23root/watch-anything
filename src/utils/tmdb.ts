// handel all the api calls to the tmdb api

// get details of a movie by name 
export const getMovieDetails = async (movieName: string) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${movieName}`);
    const data = await response.json();
    return data;
}

// take bulk ar
// get trending movies
export const getTrendingMovies = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_API_KEY}`);
    const data = await response.json();
    return data;
}

// get trending tv shows
export const getTrendingTvShows = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.TMDB_API_KEY}`);
    const data = await response.json();
    return data;
}





// curl --request GET \
//      --url 'https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=9d0bed43de1207a95e38f2b2bad271a1'