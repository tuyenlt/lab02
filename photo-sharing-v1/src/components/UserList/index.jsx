import { useEffect, useState, Fragment } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
} from "@mui/material";

import "./styles.css";
import { useNavigate } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const navigate = useNavigate()

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetchModel("/user/list");
      setUsers(data);
    };
    fetchUsers();
  }, [])

  return (

    <List component="nav">
      {users ? users.map((user) => (
        <Fragment key={user._id}>
          <ListItem
            alignItems="flex-start"
            sx={{
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                cursor: "pointer",
              },
            }}
            onClick={() => navigate(`/users/${user._id}`)}
          >
            <ListItemAvatar>
              <Avatar>{user.first_name[0]}{user.last_name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${user.first_name} ${user.last_name}`}
              secondary={
                <Box component="span" sx={{ display: "block" }}>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {user.occupation} - {user.location}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </Fragment>
      ))
        : "Loading..."}
    </List>
  );
}

export default UserList;
