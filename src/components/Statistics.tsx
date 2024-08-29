/** @jsxImportSource @emotion/react */
import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchStatistics } from "../features/statistics/statisticsSlice";
import { debounce } from "lodash";
import StatisticsCard from "./StaticsCard";
import GenrePieChart from "./GenrePieChart";
import ArtistBarChart from "./ArtistBarChart";
import AlbumslBarChart from "./AlbumBarChart";

const Charts: React.FC = () => {
  const dispatch = useDispatch();
  const { songStats, songsByGenre, songsByArtist, songsByAlbum } = useSelector(
    (state: RootState) => state.statistics
  );
  const [error, setError] = useState<string | null>(null);

  // Debounce fetchStatistics to avoid excessive API calls
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

  // Transform and validate data
  const transformedSongsByArtist = (songsByArtist || []).map((item) => ({
    _id: item._id || "Unknown", // Default value if artist is undefined
    totalAlbums: item.totalAlbums || 0,
  }));

  return (
    <>
      {error && <div>Error: {error}</div>}
      <StatisticsCard
        totalSongs={songStats.totalSongs}
        totalGenres={songStats.totalGenres}
        totalAlbums={songStats.totalAlbums}
        totalArtists={songStats.totalArtists}
      />
      <GenrePieChart data={songsByGenre} />
      <ArtistBarChart data={transformedSongsByArtist} />
      <AlbumslBarChart data={songsByAlbum} />
    </>
  );
};

export default Charts;
