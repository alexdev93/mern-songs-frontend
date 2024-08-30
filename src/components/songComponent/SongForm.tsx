/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import {
  TextField,
  Button,
  DialogContent,
  DialogActions,
  MenuItem,
  useTheme,
} from "@mui/material";
import { css } from "@emotion/react";
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
  const [errors, setErrors] = useState({
    title: false,
    artist: false,
    album: false,
    genre: false,
  });

  const validateForm = () => {
    const newErrors = {
      title: !formValues.title,
      artist: !formValues.artist,
      album: !formValues.album,
      genre: !formValues.genre,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const onSubmit = () => {
    if (validateForm()) {
      handleSubmit();
    }
  };

  const textFieldStyles = (hasError: boolean) =>
    css({
      marginBottom: theme.spacing(2),
      "& .MuiInputLabel-root": {
        color: hasError
          ? theme.palette.error.main
          : theme.palette.text.secondary,
      },
      "& .MuiInputBase-input": {
        color: theme.palette.text.primary,
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: hasError
            ? theme.palette.error.main
            : theme.palette.text.secondary,
        },
        "&:hover fieldset": {
          borderColor: hasError
            ? theme.palette.error.main
            : theme.palette.primary.main,
        },
        "&.Mui-focused fieldset": {
          borderColor: hasError
            ? theme.palette.error.main
            : theme.palette.primary.main,
        },
      },
    });

  return (
    <React.Fragment>
      <DialogContent css={{ backgroundColor: theme.palette.background.paper }}>
        <TextField
          margin="dense"
          label="Title"
          fullWidth
          value={formValues.title || ""}
          onChange={(e) =>
            setFormValues({ ...formValues, title: e.target.value })
          }
          css={textFieldStyles(errors.title)}
          error={errors.title}
          helperText={errors.title && "Title is required"}
        />
        <TextField
          margin="dense"
          label="Artist"
          fullWidth
          value={formValues.artist || ""}
          onChange={(e) =>
            setFormValues({ ...formValues, artist: e.target.value })
          }
          css={textFieldStyles(errors.artist)}
          error={errors.artist}
          helperText={errors.artist && "Artist is required"}
        />
        <TextField
          margin="dense"
          label="Album"
          fullWidth
          value={formValues.album || ""}
          onChange={(e) =>
            setFormValues({ ...formValues, album: e.target.value })
          }
          css={textFieldStyles(errors.album)}
          error={errors.album}
          helperText={errors.album && "Album is required"}
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
          css={textFieldStyles(errors.genre)}
          error={errors.genre}
          helperText={errors.genre && "Genre is required"}
        >
          {GENRES.map((genre) => (
            <MenuItem key={genre} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions
        css={{ backgroundColor: theme.palette.background.default }}
      >
        <Button
          onClick={handleClose}
          css={{ color: theme.palette.text.secondary }}
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          css={{
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
