// src/components/GenreFilter.tsx
import React from "react";
import { Select, MenuItem, FormControl } from "@mui/material";
import { GENRES } from "../constants";

interface GenreFilterProps {
  genreFilter: string;
  setGenreFilter: (genre: string) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({
  genreFilter,
  setGenreFilter,
}) => (
  <FormControl fullWidth margin="dense">
    <Select
      value={genreFilter}
      onChange={(e) => setGenreFilter(e.target.value as string)}
      displayEmpty
    >
      <MenuItem value="">All Genre</MenuItem>
      {GENRES.map((genre) => (
        <MenuItem key={genre} value={genre}>
          {genre}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default GenreFilter;
