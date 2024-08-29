// src/components/Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Box, Container } from "@mui/material";

const Layout: React.FC = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          px: { xs: 2, md: 3 },
          py: 4,
          overflow: "hidden",
        }}
      >
        <Outlet /> {/* This will render the routed components */}
      </Container>
    </Box>
  );
};

export default Layout;
