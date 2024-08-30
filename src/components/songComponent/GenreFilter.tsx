/** @jsxImportSource @emotion/react */
import React from "react";
import { Select, MenuItem, FormControl } from "@mui/material";
import { css } from "@emotion/react";
import { GENRES } from "../../constants";

interface GenreFilterProps {
  genreFilter: string;
  setGenreFilter: (genre: string) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({
  genreFilter,
  setGenreFilter,
}) => {
  return (
    <FormControl fullWidth margin="dense">
      <Select
        value={genreFilter}
        onChange={(e) => setGenreFilter(e.target.value as string)}
        displayEmpty
        css={css({
          "& .MuiSelect-select": {
            color: genreFilter ? "inherit" : "gray",
          },
        })}
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
};

export default GenreFilter;
