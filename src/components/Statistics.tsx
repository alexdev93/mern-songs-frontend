import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatistics } from "../features/statistics/statisticsSlice";
import { RootState, AppDispatch } from "../store/store";
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
 const dispatch = useDispatch<AppDispatch>();

  // Access the statistics state from the Redux store
  const {
    totalSongs,
    totalArtists,
    totalAlbums,
    totalGenres,
    songsByGenre,
    loading,
    error,
  } = useSelector((state: RootState) => state.statistics);

  // Dispatch the fetchStatistics action when the component mounts
  useEffect(() => {
    console.log(totalSongs)
    dispatch(fetchStatistics() as any);  
  }, [dispatch]);

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

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Statistics
        </Typography>
        <Typography variant="h6">Total Songs: {totalSongs}</Typography>
        <Typography variant="h6">Total Artists: {totalArtists}</Typography>
        <Typography variant="h6">Total Albums: {totalAlbums}</Typography>
        <Typography variant="h6">Total Genres: {totalGenres}</Typography>

        <Typography variant="h5" gutterBottom sx={{ marginTop: 2 }}>
          Songs by Genre
        </Typography>
        <List>
          {songsByGenre.map((genreStat) => (
            <ListItem key={genreStat.genre}>
              <ListItemText
                primary={genreStat.genre}
                secondary={`Count: ${genreStat.count}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Statistics;
