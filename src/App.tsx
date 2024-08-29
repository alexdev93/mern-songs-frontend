import React from "react";
import SongList from "./components/SongList";
import Statistics from "./components/Statistics";
import { Box, Container } from "@mui/material";
import Sidebar from "./components/Sidebar";

const App: React.FC = () => {


  return (
    <div>
      <Box sx={{ display: "flex", minHeight: "100vh", overflowX: "hidden" }}>
        <Sidebar />
        <Container
          maxWidth="lg"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            px: { xs: 2, md: 3 },
            py: 4,
            overflowX: "hidden",
          }}
        >
          <SongList />
          <Statistics />
        </Container>
      </Box>
    </div>
  );
};

export default App;
