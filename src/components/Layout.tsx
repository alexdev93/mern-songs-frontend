/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Box, Container } from "@mui/material";

const Layout: React.FC = () => {
  return (
    <Box
      css={css`
        display: flex;
        min-height: 100vh;
        overflow: hidden;
      `}
    >
      <Sidebar />
      <Container
        maxWidth="lg"
        css={css`
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 32px;
          padding-left: 16px;
          padding-right: 16px;
          @media (min-width: 600px) {
            padding-left: 24px;
            padding-right: 24px;
          }
          overflow: hidden;
        `}
      >
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;
