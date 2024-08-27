import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { fetchStatistics } from "../features/statistics/statisticsSlice";
import { RootState } from "../store/store";
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
} from "@mui/material";

const Statistics: React.FC = () => {
  const dispatch = useDispatch();

  // Access the statistics state from the Redux store
  const { songStats, songsByGenre, songsByAlbum, songsByArtist, loading } =
    useSelector((state: RootState) => state.statistics);

  const debouncedDispatch = useCallback(
    debounce(() => dispatch(fetchStatistics() as any), 300),
    [dispatch]
  );

  const handleFetchStatistics = useCallback(() => {
    debouncedDispatch();
  }, [debouncedDispatch]);

  useEffect(() => {
    handleFetchStatistics();
  }, [handleFetchStatistics]);

  if (loading) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Statistics
        </Typography>
        <Typography variant="h6">
          Total Songs: {songStats?.totalSongs}
        </Typography>
        <Typography variant="h6">
          Total Artists: {songStats?.totalArtists}
        </Typography>
        <Typography variant="h6">
          Total Albums: {songStats?.totalAlbums}
        </Typography>
        <Typography variant="h6">
          Total Genres: {songStats?.totalGenres}
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ marginTop: 2 }}>
          Songs by Genre
        </Typography>
        <List>
          {songsByGenre?.map((genreStat, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={genreStat.genre}
                secondary={`Count: ${genreStat.count}`}
              />
            </ListItem>
          ))}
        </List>

        <Typography variant="h5" gutterBottom sx={{ marginTop: 2 }}>
          Songs by Album
        </Typography>
        <List>
          {songsByAlbum?.map((albumStat, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={albumStat.album}
                secondary={`Count: ${albumStat.count}`}
              />
            </ListItem>
          ))}
        </List>

        <Typography variant="h5" gutterBottom sx={{ marginTop: 2 }}>
          Songs by Artist
        </Typography>
        <List>
          {songsByArtist?.map((artistStat, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={artistStat.artist}
                secondary={`Count: ${artistStat.totalAlbums}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Statistics;
