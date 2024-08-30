/** @jsxImportSource @emotion/react */
import React from "react";
import { Card, CardContent, Typography, Grid, useTheme } from "@mui/material";
import { css } from "@emotion/react";
import Counter from "../Counter";

interface StatisticsProps {
  totalSongs: number;
  totalGenres: number;
  totalAlbums: number;
  totalArtists: number;
}

const StatisticsCard: React.FC<StatisticsProps> = ({
  totalSongs,
  totalGenres,
  totalAlbums,
  totalArtists,
}) => {
  const theme = useTheme();

  const cardStyle = css({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "5px",
    transition: "all 0.4s ease-in-out",
    boxShadow: "1px 2px 15px rgba(0, 0, 0, 0.8)",
    background: "rgba(0, 0, 0, 0.2)", 
    backdropFilter: "blur(10px)", 
    color: theme.palette.text.primary,
    "&:hover": {
      cursor: "default",
      transform: "translateY(-5px)",
      border: `1px solid ${theme.palette.primary.main}`,
      boxShadow: "1px 4px 15px rgba(0, 0, 0, 0.32)",
    },
  });

  const cardContentStyle = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  });

  const largeTextStyle = css({
    fontSize: "3rem",
    fontWeight: 700,
    marginBottom: "0.5rem",
  });

  const smallTextStyle = css({
    fontSize: "1.2rem",
    textTransform: "uppercase",
  });

  const headerStyle = css({
    marginBottom: "1rem",
    textAlign: "center",
  });

  return (
    <Card sx={cardStyle}>
      <CardContent>
        <Typography variant="h5" sx={headerStyle}>
          Statistics Overview
        </Typography>
        <Grid container spacing={2}>
          {[
            { value: totalSongs, label: "Total number of songs" },
            { value: totalArtists, label: "Total number of artists" },
            { value: totalAlbums, label: "Total number of albums" },
            { value: totalGenres, label: "Total number of genres" },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card sx={cardStyle}>
                <CardContent sx={cardContentStyle}>
                  <Counter
                    targetNumber={item.value}
                    largeText={largeTextStyle}
                  />
                  <Typography variant="body1" sx={smallTextStyle}>
                    {item.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
