// src/components/SongForm.tsx
import React from "react";
import {
  TextField,
  Button,
  DialogContent,
  DialogActions,
  MenuItem,
} from "@mui/material";
import { GENRES } from "../constants";
import { Song } from "../features/songs/types";

interface SongFormProps {
  formValues: Song;
  setFormValues: (values: Song) => void;
  handleSubmit: () => void;
  handleClose: () => void;
}

const SongForm: React.FC<SongFormProps> = ({
  formValues,
  setFormValues,
  handleSubmit,
  handleClose,
}) => (
  <React.Fragment>
    <DialogContent>
      <TextField
        margin="dense"
        label="Title"
        fullWidth
        value={formValues.title || ""}
        onChange={(e) =>
          setFormValues({ ...formValues, title: e.target.value })
        }
      />
      <TextField
        margin="dense"
        label="Artist"
        fullWidth
        value={formValues.artist || ""}
        onChange={(e) =>
          setFormValues({ ...formValues, artist: e.target.value })
        }
      />
      <TextField
        margin="dense"
        label="Album"
        fullWidth
        value={formValues.album || ""}
        onChange={(e) =>
          setFormValues({ ...formValues, album: e.target.value })
        }
      />
      <TextField
        margin="dense"
        label="Genre"
        fullWidth
        value={formValues.genre || ""}
        onChange={(e) =>
          setFormValues({ ...formValues, genre: e.target.value })
        }
        select
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
        {formValues.id ? "Update" : "Add"}
      </Button>
    </DialogActions>
  </React.Fragment>
);

export default SongForm;
