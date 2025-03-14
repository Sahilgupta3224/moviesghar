export const TMDB_CONFIG = {
    BASE_URL: "https://api.themoviedb.org/3",
    API_KEY: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGYwMjA1ODcxMzRmNGNjYjMyYzNjYTMxMWM4MDM0MiIsIm5iZiI6MTc0MTUwMTA4Mi4xODMsInN1YiI6IjY3Y2QzMjlhODU2ZTEzY2IzZDEwZDFhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8hNWqe_pPQwB6Vwx4hz2TgWW_347Mbf9VMMLjHHJmOY",
    headers: {
        accept: "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGYwMjA1ODcxMzRmNGNjYjMyYzNjYTMxMWM4MDM0MiIsIm5iZiI6MTc0MTUwMTA4Mi4xODMsInN1YiI6IjY3Y2QzMjlhODU2ZTEzY2IzZDEwZDFhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8hNWqe_pPQwB6Vwx4hz2TgWW_347Mbf9VMMLjHHJmOY`,
    },
};

export const fetchmovies = async ({query} :{query:string}) => {
    const search = `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    const bypopularity = `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`
    const endpoint = query ? search : bypopularity

    const response = await fetch(endpoint,
        {
            method: 'GET',
            headers: TMDB_CONFIG.headers
        }
    )
    if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
}