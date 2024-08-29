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
import { Link, useLocation } from "react-router-dom"; // Updated import

const mainRoutes = [
  { path: "/", name: "Song List" },
  { path: "/statistics", name: "Statistics" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { pathname } = useLocation(); // Get current pathname to highlight active route

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      {isMobile && (
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            position: "absolute",
            top: 16,
            left: open ? "" : 16,
            right: open ? 16 : "",
            zIndex: 1201, // Ensure the button is above the Drawer
          }}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={() => isMobile && setOpen(false)}
        sx={{
          width: 300,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 300,
            boxSizing: "border-box",
            bgcolor: "background.default",
            color: "text.secondary",
          },
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            p: 2,
          }}
        >
          <List>
            {mainRoutes.map(({ path, name }) => (
              <ListItem key={path} disablePadding>
                <ListItemButton
                  component={Link}
                  to={path} // Use `to` instead of `href`
                  selected={pathname === path} // Highlight active route
                  sx={{
                    color: theme.palette.text.primary,
                    borderRadius: 1,
                    mb: 1,
                    "&:hover": { bgcolor: theme.palette.action.hover },
                    ...(pathname === path && {
                      bgcolor: theme.palette.action.selected,
                    }),
                  }}
                >
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: "auto", textAlign: "center" }}>
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
