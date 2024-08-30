/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  Typography,
  Box,
} from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { Edit, Delete, Add } from "@mui/icons-material";
import {
  fetchSongsStart,
  createSongStart,
  updateSongStart,
  deleteSongStart,
} from "../../features/songs/songsSlice";
import { RootState } from "../../store/store";
import { Song } from "../../features/songs/types";
import GenreFilter from "./GenreFilter";
import SongForm from "./SongForm";
import { css } from "@emotion/react";

// Define Emotion styles
const actionsContainerStyle = css`
  display: flex;
  gap: 0.5rem;
`;

const StyledIconButton = css`
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

const StyledTooltip = css`
  .MuiTooltip-tooltip {
    font-size: 0.75rem;
  }
`;

const dataGridStyle = css`
  height: 400px;
  width: 100%;
  margin-top: 1rem;
`;

const SongList: React.FC = () => {
  const dispatch = useDispatch();
  const { songs, loading, error } = useSelector(
    (state: RootState) => state.songs
  );

  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState<Song>({
    title: "",
    artist: "",
    album: "",
    genre: "",
  });
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 6,
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
    setGenreFilter("");
  };

  const handleSubmit = () => {
    if (selectedSong) {
      dispatch(updateSongStart({ ...selectedSong, ...formValues }));
    } else {
      dispatch(createSongStart({ ...formValues }));
    }
    handleClose();
    dispatch(fetchSongsStart());
  };

  const handleDelete = (songId: string) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      dispatch(deleteSongStart(songId));
    }
  };

  // Filter songs by genre
  const filteredSongs = genreFilter
    ? songs.filter((song: any) => song.genre === genreFilter)
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
          <div css={StyledTooltip} title="Edit">
            <div css={StyledIconButton} onClick={() => handleEdit(params.row)}>
              <Edit />
            </div>
          </div>
          <div css={StyledTooltip} title="Delete">
            <div
              css={StyledIconButton}
              onClick={() => handleDelete(params.row.id as string)}
            >
              <Delete />
            </div>
          </div>
        </div>
      ),
    },
  ];

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

  if (error) return <Alert severity="error">Error: {error}</Alert>;

  return (
    <Container>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          marginBottom: 4,
          color: (theme) => theme.palette.text.primary,
        }}
      >
        Song List
      </Typography>

      <div css={StyledTooltip} title="Add Song">
        <div css={StyledIconButton} onClick={handleAdd}>
          <Add />
        </div>
      </div>

      <GenreFilter genreFilter={genreFilter} setGenreFilter={setGenreFilter} />

      <div css={dataGridStyle}>
        <DataGrid
          rows={filteredSongs}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          disableRowSelectionOnClick
          autoHeight
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10, 20]}
        />
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedSong ? "Edit Song" : "Add Song"}</DialogTitle>
        <SongForm
          formValues={formValues}
          setFormValues={setFormValues}
          handleSubmit={handleSubmit}
          handleClose={handleClose}
        />
      </Dialog>
    </Container>
  );
};

export default SongList;
