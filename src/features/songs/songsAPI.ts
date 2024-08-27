import axios from "axios";
import { Song } from './types';

const API_URL = "http://localhost:8080/api/songs"; // Update with your backend URL

export interface ApiResponse {
  data: Song[];
}

export const fetchSongs = async (): Promise<Song[]> => {
  const response = await axios.get<ApiResponse>(API_URL);
  return response.data.data; // Access the nested data property
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
