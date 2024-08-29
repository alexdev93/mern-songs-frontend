import axios from "axios";
import { Song } from './types';

const API_URL = "https://song-manager-api.onrender.com/api/songs";

export interface ApiResponses {
  data: Song[];
}
export interface ApiResponse {
  data: Song;
}

export const fetchSongs = async (): Promise<Song[]> => {
  const response = await axios.get<ApiResponses>(API_URL);
  return response.data.data;
};

export const createSong = async (song: Omit<Song, "id">): Promise<Song> => {
  const response = await axios.post<ApiResponse>(API_URL, song);
  return response.data.data;
};

export const updateSong = async (song: Song): Promise<Song> => {
  const response = await axios.patch<ApiResponse>(
    `${API_URL}/${song.id}`,
    song
  );
  return response.data.data;
};

export const deleteSong = async (id: number | string): Promise<void> => {
  console.log("delete song id - ", id)
  await axios.delete(`${API_URL}/${id}`);
};
