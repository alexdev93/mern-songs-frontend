/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  CircularProgress,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { Edit, Delete, Add } from "@mui/icons-material";
import {
  fetchSongsStart,
  createSongStart,
  updateSongStart,
  deleteSongStart,
} from "../features/songs/songsSlice";
import { RootState } from "../store/store";
import { Song } from "../features/songs/types";
import {
  actionsContainerStyle,
  StyledIconButton,
  StyledTooltip,
  dataGridStyle,
} from "../styles";
import { GENRES } from "../constants"; // Import the genre constants

const SongList: React.FC = () => {
  const dispatch = useDispatch();
  const { songs, loading, error } = useSelector(
    (state: RootState) => state.songs
  );

  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
  });

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 5,
    page: 0,
  });

  const [genreFilter, setGenreFilter] = useState<string>("");

  useEffect(() => {
    dispatch(fetchSongsStart());
  }, [dispatch]);

  const handleEdit = (song: Song) => {
    setSelectedSong(song);
    setFormValues({
      title: song.title,
      artist: song.artist,
      album: song.album,
      genre: song.genre,
    });
    setOpen(true);
  };

  const handleAdd = () => {
    setSelectedSong(null);
    setFormValues({ title: "", artist: "", album: "", genre: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormValues({ title: "", artist: "", album: "", genre: "" });
    setGenreFilter(""); // Reset filter
  };

  const handleSubmit = () => {
    if (selectedSong) {
      dispatch(updateSongStart({ ...selectedSong, ...formValues }));
    } else {
      dispatch(createSongStart({ ...formValues }));
    }
    handleClose();

    // Revalidate the list after create/update
    dispatch(fetchSongsStart());
  };

  const handleDelete = (songId: string) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      dispatch(deleteSongStart(songId));
    }
  };

  // Filter songs by genre
  const filteredSongs = genreFilter
    ? songs.filter((song) => song.genre === genreFilter)
    : songs;

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "artist", headerName: "Artist", flex: 1 },
    { field: "album", headerName: "Album", flex: 1 },
    { field: "genre", headerName: "Genre", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div css={actionsContainerStyle}>
          <StyledTooltip title="Edit">
            <StyledIconButton
              color="primary"
              onClick={() => handleEdit(params.row)}
            >
              <Edit />
            </StyledIconButton>
          </StyledTooltip>
          <StyledTooltip title="Delete">
            <StyledIconButton
              color="error"
              onClick={() => handleDelete(params.row.id as string)}
            >
              <Delete />
            </StyledIconButton>
          </StyledTooltip>
        </div>
      ),
    },
  ];

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error: {error}</Alert>;

  return (
    <Container>
      <StyledTooltip title="Add Song">
        <StyledIconButton
          color="primary"
          onClick={handleAdd}
          aria-hidden={false}
        >
          <Add />
        </StyledIconButton>
      </StyledTooltip>

      {/* Genre Filter Dropdown */}
      <Select
        margin="dense"
        label="Filter by Genre"
        fullWidth
        value={genreFilter}
        onChange={(e) => setGenreFilter(e.target.value)}
        displayEmpty
      >
        <MenuItem value="">All Genres</MenuItem>
        {GENRES.map((genre) => (
          <MenuItem key={genre} value={genre}>
            {genre}
          </MenuItem>
        ))}
      </Select>

      <div css={dataGridStyle}>
        <DataGrid
          rows={filteredSongs}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          disableRowSelectionOnClick
          autoHeight
          getRowId={(row) => row.id} // Use _id as the unique identifier
        />
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedSong ? "Edit Song" : "Add Song"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            value={formValues.title}
            onChange={(e) =>
              setFormValues({ ...formValues, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Artist"
            fullWidth
            value={formValues.artist}
            onChange={(e) =>
              setFormValues({ ...formValues, artist: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Album"
            fullWidth
            value={formValues.album}
            onChange={(e) =>
              setFormValues({ ...formValues, album: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Genre"
            fullWidth
            value={formValues.genre}
            onChange={(e) =>
              setFormValues({ ...formValues, genre: e.target.value })
            }
            select // Add select prop for dropdown
          >
            {GENRES.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>
            {selectedSong ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SongList;
