import axios from "axios";

const API_URL = "https://song-manager-api.onrender.com/api/stats";

export const fetchStatisticsData = async () => {
   const response = await axios.get(API_URL);
   return response.data;
};

export const fetchGenres = async () => {
  const response = await axios.get(`${API_URL}/genre`);
  return response.data;
};

export const fetchArtists = async () => {
  const response = await axios.get(`${API_URL}/artist`);
  return response.data;
};

export const fetchAlbums = async () => {
  const response = await axios.get(`${API_URL}/artist`);
  return response.data;
};

export const fetchSongsInAlbum = async () => {
  const response = await axios.get(`${API_URL}/songs-in-album`);
  return response.data;
};
