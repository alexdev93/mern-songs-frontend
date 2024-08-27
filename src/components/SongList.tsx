import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { fetchSongsStart } from "../features/songs/songsSlice";
import {
  Container,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

const SongList: React.FC = () => {
  const dispatch = useDispatch();
  const { songs, loading, error } = useSelector(
    (state: RootState) => state.songs
  );

  useEffect(() => {
    dispatch(fetchSongsStart());
  }, [dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error: {error}</Alert>;

  return (
    <Container>
      {songs.map((song, index) => (
        <Card key={index} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">{song.title}</Typography>
            <Typography variant="body1">Artist: {song.artist}</Typography>
            <Typography variant="body1">Album: {song.album}</Typography>
            <Typography variant="body1">Genre: {song.genre}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default SongList;
