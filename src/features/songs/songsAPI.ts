import axios from "axios";
import { Song } from './types';

const API_URL = "https://song-manager-api.onrender.com/api/songs";

export interface ApiResponse {
  data: Song[];
}

export const fetchSongs = async (): Promise<Song[]> => {
  const response = await axios.get<ApiResponse>(API_URL);
  return response.data.data;
};

export const createSong = async (song: Omit<Song, "id">): Promise<Song> => {
  const response = await axios.post<Song>(API_URL, song);
  return response.data;
};

export const updateSong = async (song: Song): Promise<Song> => {
  const response = await axios.put<Song>(`${API_URL}/${song.id}`, song);
  return response.data;
};

export const deleteSong = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
