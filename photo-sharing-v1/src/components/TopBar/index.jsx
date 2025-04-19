// components/TopBar/index.jsx
import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom"; // Import useLocation
import fetchModel from "../../lib/fetchModelData";

import "./styles.css";

function TopBar() {
  const location = useLocation();
  const [topBarTitle, setTopBarTitle] = useState("Photo Sharing App");

  useEffect(() => {
    const updateTitle = async () => {
      const path = location.pathname;

      if (path.startsWith("/users/")) {
        const userId = path.split("/users/")[1];
        try {
          const user = await fetchModel(`/user/${userId}`);
          setTopBarTitle(`User ${user.first_name} ${user.last_name}`);
        } catch {
          setTopBarTitle("User Unknown");
        }
      } else if (path.startsWith("/photos/")) {
        const userId = path.split("/photos/")[1];
        try {
          const user = await fetchModel(`/user/${userId}`);
          setTopBarTitle(`Photos of ${user.first_name} ${user.last_name}`);
        } catch {
          setTopBarTitle("Photos of Unknown User");
        }
      } else {
        setTopBarTitle("Photo Sharing App");
      }
    };

    updateTitle();
  }, [location]);

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit" sx={{ flexGrow: 1 }}>
          <RouterLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Le Trong Tuyen
          </RouterLink>
        </Typography>

        <Typography variant="h6" color="inherit">
          {topBarTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
