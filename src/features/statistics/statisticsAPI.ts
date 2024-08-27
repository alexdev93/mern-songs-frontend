import axios from "axios";

export const fetchStatisticsData = () => {
  return axios.get("/api/stats");
};

export const fetchGenres = () => {
  return axios.get("/api/stats/genre");
};

export const fetchArtists = () => {
  return axios.get("/api/stats/artist");
};

export const fetchAlbums = () => {
  return axios.get("/api/stats/album");
};

export const fetchSongsInAlbum = () => {
  return axios.get("/api/stats/songs-in-album");
};
