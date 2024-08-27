// import styled from "@emotion/styled";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch } from "../store/store"; // Adjust the path according to your project structure
// import { fetchStatistics } from "../features/statistics/statisticsSlice";

// // Define TypeScript interfaces for your statistics data
// interface GenreStat {
//   genre: string;
//   count: number;
// }

// interface ArtistStat {
//   artist: string;
//   totalSongs: number;
//   totalAlbums: number;
// }

// interface AlbumStat {
//   album: string;
//   count: number;
// }

// interface StatisticsState {
//   totalSongs: number;
//   totalArtists: number;
//   totalAlbums: number;
//   totalGenres: number;
//   songsByGenre: GenreStat[];
//   songsByArtist: ArtistStat[];
//   songsByAlbum: AlbumStat[];
//   songsInAlbum: AlbumStat[];
// }

// // Define styled components
// const Container = styled.div`
//   padding: 20px;
// `;

// const Header = styled.h1`
//   font-size: 2rem;
//   color: #333;
// `;

// const Statistics: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   // Use the selector with typed state
//   const statistics = useSelector(
//     (state: { statistics: StatisticsState }) => state.statistics
//   );

//   // Fetch statistics on component mount
//   // useEffect(() => {
//   //   dispatch(fetchStatistics());
//   // }, [dispatch]);

//   return (
//     <Container>
//       <Header>Statistics</Header>
//       <div>Total Songs: {statistics.totalSongs}</div>
//       <div>Total Artists: {statistics.totalArtists}</div>
//       <div>Total Albums: {statistics.totalAlbums}</div>
//       <div>Total Genres: {statistics.totalGenres}</div>

//       <div>
//         <h2>Songs by Genre</h2>
//         {statistics.songsByGenre.map(({ genre, count }) => (
//           <div key={genre}>
//             {genre}: {count}
//           </div>
//         ))}
//       </div>

//       <div>
//         <h2>Songs by Artist</h2>
//         {statistics.songsByArtist.map(({ artist, totalSongs, totalAlbums }) => (
//           <div key={artist}>
//             {artist}: {totalSongs} songs, {totalAlbums} albums
//           </div>
//         ))}
//       </div>

//       <div>
//         <h2>Songs by Album</h2>
//         {statistics.songsByAlbum.map(({ album, count }) => (
//           <div key={album}>
//             {album}: {count} songs
//           </div>
//         ))}
//       </div>

//       <div>
//         <h2>Number of Songs in Each Album</h2>
//         {statistics.songsInAlbum.map(({ album, count }) => (
//           <div key={album}>
//             {album}: {count} songs
//           </div>
//         ))}
//       </div>
//     </Container>
//   );
// };

// export default Statistics;
