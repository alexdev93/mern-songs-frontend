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
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";

const Charts: React.FC = () => {
  const dispatch = useDispatch();
  const { songStats, songsByGenre, songsByArtist, songsByAlbum, loading } =
    useSelector((state: RootState) => state.statistics);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const debouncedFetchStatistics = useCallback(
    debounce(() => {
      dispatch(fetchStatistics() as any).catch((err: Error) => {
        setError(err.message);
      });
    }, 500), // Adjust the debounce delay as needed
    [dispatch]
  );

  useEffect(() => {
    if (songsByGenre === undefined) return;
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {error && <div>Error: {error}</div>}
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
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 4, 
          mb: 4,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flex: 1,
            minHeight: 300,
            maxWidth: "95%", 
          }}
        >
          <StatisticsCard
            totalSongs={songStats.totalSongs}
            totalGenres={songStats.totalGenres}
            totalAlbums={songStats.totalAlbums}
            totalArtists={songStats.totalArtists}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 4,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: "300px", 
            maxWidth: "500px", 
          }}
        >
          <ArtistBarChart data={transformedSongsByArtist} />
        </Box>
        <Box
          sx={{
            flex: 1,
            minWidth: "300px",
            maxWidth: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <GenrePieChart data={songsByGenre} />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 4,
          mt: 4,
        }}
      >
        <Box
          sx={{
            width: "100%",
            minHeight: 300,
          }}
        >
          <AlbumslBarChart data={songsByAlbum} />
        </Box>
      </Box>
    </>
  );
};

export default Charts;
