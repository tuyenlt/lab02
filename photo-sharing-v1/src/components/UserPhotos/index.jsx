import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Avatar,
  Box,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const data = await fetchModel(`/photosOfUser/${userId}`);
        setPhotos(data);
      } catch (err) {
        console.error("Failed to fetch photos:", err);
        setPhotos([]);
      }
    };

    fetchPhotos();
  }, [userId]);

  if (photos === null) {
    return <Typography variant="h6" sx={{ mt: 4 }}>Loading photos...</Typography>;
  }

  if (photos.length === 0) {
    return <Typography variant="h6" sx={{ mt: 4 }}>No photos found for user ID: {userId}</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>User Photos</Typography>

      {photos.map((photo) => (
        <Card key={photo._id} sx={{ mb: 4 }}>
          <CardMedia
            component="img"
            image={`/images/${photo.file_name}`}
            alt="User photo"
            sx={{ maxHeight: 500, objectFit: "contain", backgroundColor: "#f0f0f0" }}
          />
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Uploaded: {new Date(photo.date_time).toLocaleString()}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Comments</Typography>
            {photo.comments && photo.comments.length > 0 ? (
              <List>
                {photo.comments.map((comment) => (
                  <ListItem alignItems="flex-start" key={comment._id}>
                    <ListItemAvatar>
                      <Avatar>
                        {comment.user.first_name[0]}{comment.user.last_name[0]}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <>
                          <Link
                            component={RouterLink}
                            to={`/users/${comment.user._id}`}
                            underline="hover"
                            color="primary"
                          >
                            {comment.user.first_name} {comment.user.last_name}
                          </Link>{" "}
                          <Typography variant="caption" color="text.secondary">
                            on {new Date(comment.date_time).toLocaleString()}
                          </Typography>
                        </>
                      }
                      secondary={comment.comment}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No comments yet.
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserPhotos;
