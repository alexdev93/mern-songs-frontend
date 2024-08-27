import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { fetchSongsStart } from "../features/songs/songsSlice";
import styled from "@emotion/styled";

const SongListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const SongItem = styled.div`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

const SongList: React.FC = () => {
  const dispatch = useDispatch();
  const { songs, loading, error } = useSelector(
    (state: RootState) => state.songs
  );

  useEffect(() => {
    dispatch(fetchSongsStart());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <SongListContainer>
      {songs.map((song, index) => (
        <SongItem key={index}>
          {" "}
          {/* Use unique key here */}
          <h3>{song.title}</h3>
          <p>Artist: {song.artist}</p>
          <p>Album: {song.album}</p>
          <p>Genre: {song.genre}</p>
        </SongItem>
      ))}
    </SongListContainer>
  );
};

export default SongList;
