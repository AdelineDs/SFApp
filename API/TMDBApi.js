// API/TMDBApi.js

const API_TOKEN = "...";

export function getFilmsFromApiWithSearchedText (text, page) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getFilmDetailFromApi (id) {
  return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function getBestFilmsFromApi (page) {
  return fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + API_TOKEN + '&vote_count.gte=1000&sort_by=release_date.desc&language=fr&page=' + page)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function getImageFromApi (name) {
  return 'https://image.tmdb.org/t/p/w300' + name
}

export function getUpcomingFilmsFromApi (page) {
  return fetch('https://api.themoviedb.org/3/movie/upcoming?api_key='+ API_TOKEN +'&language=fr&page='+ page +'&region=Fr')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function getFrenchReleaseDateFromApi (id) {
  return fetch('https://api.themoviedb.org/3/movie/' + id + '/release_dates?api_key=' + API_TOKEN)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function getSimilarFilmsFilmsFromApi (id) {
  return fetch('https://api.themoviedb.org/3/movie/' + id + '/similar?api_key='+ API_TOKEN +'&language=fr-FR&page=1')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function getNowPlayingFilmsFromApi (page) {
  return fetch('https://api.themoviedb.org/3/movie/now_playing?api_key='+ API_TOKEN +'&language=fr&page='+ page +'&region=Fr')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function getFilmCreditsFromAPI (id){
  return fetch('https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=' + API_TOKEN)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}