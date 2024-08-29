import React from "react";
import {
  TextField,
  Button,
  DialogContent,
  DialogActions,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { GENRES } from "../../constants";
import { Song } from "../../features/songs/types";

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
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Optional: adjust layout based on screen size

  return (
    <React.Fragment>
      <DialogContent sx={{ bgcolor: theme.palette.background.paper }}>
        <TextField
          margin="dense"
          label="Title"
          fullWidth
          value={formValues.title || ""}
          onChange={(e) =>
            setFormValues({ ...formValues, title: e.target.value })
          }
          sx={{
            mb: 2,
            "& .MuiInputLabel-root": {
              color: theme.palette.text.secondary,
            },
            "& .MuiInputBase-input": {
              color: theme.palette.text.primary,
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: theme.palette.text.secondary,
              },
              "&:hover fieldset": {
                borderColor: theme.palette.primary.main,
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.main,
              },
            },
          }}
        />
        <TextField
          margin="dense"
          label="Artist"
          fullWidth
          value={formValues.artist || ""}
          onChange={(e) =>
            setFormValues({ ...formValues, artist: e.target.value })
          }
          sx={{
            mb: 2,
            "& .MuiInputLabel-root": {
              color: theme.palette.text.secondary,
            },
            "& .MuiInputBase-input": {
              color: theme.palette.text.primary,
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: theme.palette.text.secondary,
              },
              "&:hover fieldset": {
                borderColor: theme.palette.primary.main,
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.main,
              },
            },
          }}
        />
        <TextField
          margin="dense"
          label="Album"
          fullWidth
          value={formValues.album || ""}
          onChange={(e) =>
            setFormValues({ ...formValues, album: e.target.value })
          }
          sx={{
            mb: 2,
            "& .MuiInputLabel-root": {
              color: theme.palette.text.secondary,
            },
            "& .MuiInputBase-input": {
              color: theme.palette.text.primary,
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: theme.palette.text.secondary,
              },
              "&:hover fieldset": {
                borderColor: theme.palette.primary.main,
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.main,
              },
            },
          }}
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
          sx={{
            mb: 2,
            "& .MuiInputLabel-root": {
              color: theme.palette.text.secondary,
            },
            "& .MuiInputBase-input": {
              color: theme.palette.text.primary,
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: theme.palette.text.secondary,
              },
              "&:hover fieldset": {
                borderColor: theme.palette.primary.main,
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.main,
              },
            },
          }}
        >
          {GENRES.map((genre) => (
            <MenuItem key={genre} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions sx={{ bgcolor: theme.palette.background.default }}>
        <Button
          onClick={handleClose}
          sx={{ color: theme.palette.text.secondary }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          sx={{
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          {formValues.id ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};

export default SongForm;
