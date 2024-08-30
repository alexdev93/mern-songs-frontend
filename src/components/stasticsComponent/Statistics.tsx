/** @jsxImportSource @emotion/react */
import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { fetchStatistics } from "../../features/statistics/statisticsSlice";
import { debounce } from "lodash";
import StatisticsCard from "./StaticsCard";
import GenrePieChart from "./GenrePieChart";
import ArtistBarChart from "./ArtistBarChart";
import AlbumslBarChart from "./AlbumBarChart";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  useTheme,
} from "@mui/material";
import { css } from "@emotion/react";

// Modular styles using Emotion
const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    gap: 4rem;
    margin-bottom: 4rem;
    justify-content: center;
    align-items: center;
    @media (min-width: 768px) {
      flex-direction: row;
      flex-wrap: wrap;
    }
  `,
  statisticsCard: css`
    flex: 1;
    min-width: 300px;
    max-width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (min-width: 768px) {
      margin-right: 2rem;
    }
  `,
  chartContainer: css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* Center the charts */
    align-items: center;
    gap: 2rem;
    width: 100%;
  `,
  chartItem: css`
    flex: 1;
    min-width: 400px; /* Adjusted minimum width */
    max-width: 45%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
      max-width: 100%;
    }
  `,
  fullWidth: css`
    width: 100%;
    min-height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  loadingContainer: css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  `,
  errorContainer: css`
    margin-bottom: 4rem;
  `,
};

const Charts: React.FC = () => {
  const dispatch = useDispatch();
  const { songStats, songsByGenre, songsByArtist, songsByAlbum, loading } =
    useSelector((state: RootState) => state.statistics);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  const debouncedFetchStatistics = useCallback(
    debounce(() => {
      dispatch(fetchStatistics() as any).catch((err: Error) => {
        setError(err.message);
      });
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    debouncedFetchStatistics();
    return () => {
      debouncedFetchStatistics.cancel();
    };
  }, [debouncedFetchStatistics]);

  const transformedSongsByArtist = (songsByArtist || []).map((item) => ({
    _id: item._id || "Unknown",
    totalAlbums: item.totalAlbums || 0,
  }));

  if (loading) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {error && (
        <Box sx={styles.errorContainer}>
          <Alert severity="error">Error: {error}</Alert>
        </Box>
      )}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          marginBottom: 4,
          color: theme.palette.text.primary,
        }}
      >
        Music Statistics Overview
      </Typography>
      <Box css={styles.container}>
        <Box css={styles.statisticsCard}>
          <StatisticsCard
            totalSongs={songStats.totalSongs}
            totalGenres={songStats.totalGenres}
            totalAlbums={songStats.totalAlbums}
            totalArtists={songStats.totalArtists}
          />
        </Box>
        <Box css={styles.chartContainer}>
          <Box css={styles.chartItem}>
            <ArtistBarChart data={transformedSongsByArtist} />
          </Box>
          <Box css={styles.chartItem}>
            <GenrePieChart data={songsByGenre} />
          </Box>
        </Box>
      </Box>
      <Box css={styles.fullWidth}>
        <AlbumslBarChart data={songsByAlbum} />
      </Box>
    </>
  );
};

export default Charts;
