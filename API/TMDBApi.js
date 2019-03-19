// API/TMDBApi.js

const API_TOKEN = "...";

/*
******
MOVIES FUNCTIONS
******
*/
export function getFilmsFromApiWithSearchedText (text, page) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getFilmDetailFromApi (id) {
  return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr&append_to_response=credits,release_dates,recommendations,similar,images,keywords,videos')
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


export function getNowPlayingFilmsFromApi (page) {
  return fetch('https://api.themoviedb.org/3/movie/now_playing?api_key='+ API_TOKEN +'&language=fr&page='+ page +'&region=Fr')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

/*
******
TV SHOWS FUNCTIONS
******
*/

export function getTvShowFromApiWithSearchedText (text, page) {
  const url = 'https://api.themoviedb.org/3/search/tv?api_key=' + API_TOKEN + '&language=fr-FR&query=' + text + "&page=" + page
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getTvShowDetailFromApi (id) {
  return fetch('https://api.themoviedb.org/3/tv/' + id + '?api_key=' + API_TOKEN + '&language=fr-FR&append_to_response=credits,similar,images,videos,keywords')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function getSeasonDetailFromApi (id, number) {
  return fetch('https://api.themoviedb.org/3/tv/' + id + '/season/' + number + '?api_key=' + API_TOKEN + '&language=fr-FR&append_to_response=credits,images,videos')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function getEpisodeDetailFromApi (idTvShow, idSeason, number) {
  return fetch('https://api.themoviedb.org/3/tv/' + idTvShow + '/season/' + idSeason + '/episode/' + number + '?api_key=' + API_TOKEN + '&language=fr-FR&append_to_response=credits,images,videos')
    .then((response) => response.json())
    .catch((error) => console.error(error));
  }
