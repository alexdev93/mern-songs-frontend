import axios from "axios";

const API_URL = "https://song-manager-api.onrender.com/api/stats";

export const fetchStatisticsData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching statistics data:", error.message || error);
    throw new Error("Failed to fetch statistics data");
  }
};

export const fetchGenres = async () => {
  try {
    const response = await axios.get(`${API_URL}/genre`);
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching genres:", error.message || error);
    throw new Error("Failed to fetch genres");
  }
};

export const fetchArtists = async () => {
  try {
    const response = await axios.get(`${API_URL}/artist`);
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching artists:", error.message || error);
    throw new Error("Failed to fetch artists");
  }
};

export const fetchAlbums = async () => {
  try {
    const response = await axios.get(`${API_URL}/album`);
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching albums:", error.message || error);
    throw new Error("Failed to fetch albums");
  }
};

// export const fetchSongsInAlbum = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/songs-in-album`);
//     return response.data.data;
//   } catch (error: any) {
//     console.error("Error fetching songs in album:", error.message || error);
//     throw new Error("Failed to fetch songs in album");
//   }
// };
