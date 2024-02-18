const apiKey = "930773ddb239aa83502e51680f8fc48c"
const baseUrl = "https://api.themoviedb.org/3"
let RequestsUrl = [
    {title: "Trending", url: `${baseUrl}/trending/all/week?api_key=${apiKey}&language=en-US`},
    {title: "Top Rated", url: `${baseUrl}/tv/top_rated/?api_key=${apiKey}&language=en-US`},
    {title: "Action Movies", url: `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=28`},
    {title: "Comedy Movies", url: `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=35`},
    {title: "Horror Movies", url: `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=27`},
    {title: "Romance Movies", url: `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=10749`},
]

export {RequestsUrl, apiKey, baseUrl}

