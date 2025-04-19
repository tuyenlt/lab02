import React, { useEffect, useState } from "react";
import { Typography, Box, Avatar, Button } from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";
/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await fetchModel(`/user/${userId}`);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }



  return (
    <Box className="user-detail-container">
      <Box className="user-header">
        <Avatar className="user-avatar">
          {user.first_name[0]}{user.last_name[0]}
        </Avatar>
        <Typography variant="h4" gutterBottom className="user-name">
          {user.first_name} {user.last_name}
        </Typography>
      </Box>

      <Typography className="user-info">
        <strong>Location:</strong> {user.location}
      </Typography>
      <Typography className="user-info">
        <strong>Occupation:</strong> {user.occupation}
      </Typography>
      <Typography className="user-info">
        <strong>Description:</strong> {user.description}
      </Typography>

      <Box className="view-photos-button">
        <Button
          variant="contained"
          component={RouterLink}
          to={`/photos/${user._id}`}
        >
          View Photos
        </Button>
      </Box>
    </Box>


  );
}

export default UserDetail;
