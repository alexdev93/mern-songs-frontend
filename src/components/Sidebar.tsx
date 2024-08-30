/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const mainRoutes = [
  { path: "/", name: "Song List" },
  { path: "/statistics", name: "Statistics" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { pathname } = useLocation();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      {isMobile && (
        <IconButton
          onClick={handleDrawerToggle}
          css={css`
            position: absolute;
            top: 16px;
            left: ${open ? "auto" : "16px"};
            right: ${open ? "16px" : "auto"};
            z-index: 1201;
          `}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={() => isMobile && setOpen(false)}
        css={css`
          width: 300px;
          flex-shrink: 0;
          & .MuiDrawer-paper {
            width: 300px;
            box-sizing: border-box;
            background-color: ${theme.palette.background.default};
            color: ${theme.palette.text.secondary};
          }
        `}
      >
        <Box
          css={css`
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 16px;
          `}
        >
          <List>
            {mainRoutes.map(({ path, name }) => (
              <ListItem key={path} disablePadding>
                <ListItemButton
                  component={Link}
                  to={path}
                  selected={pathname === path}
                  css={css`
                    color: ${theme.palette.text.primary};
                    border-radius: 4px;
                    margin-bottom: 8px;
                    &:hover {
                      background-color: ${theme.palette.action.hover};
                    }
                    ${pathname === path &&
                    css`
                      background-color: ${theme.palette.action.selected};
                    `}
                  `}
                >
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box
            css={css`
              margin-top: auto;
              text-align: center;
            `}
          >
            {/* Example for CircularProgress, define `isLoading` accordingly */}
            {/* {isLoading && pathname !== "/" && (
              <CircularProgress size={28} sx={{ mb: 2 }} />
            )} */}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
