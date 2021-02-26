import React, { useState } from "react";
import { useHistory } from "react-router-dom";

//material components
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import PetsOutlinedIcon from "@material-ui/icons/PetsOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import {
  Avatar,
  Typography,
  Button,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const ProfilePanel = ({
  userName,
  clearToken,
  toggleDrawer,
  state,
  handleOpen,
}) => {
  const classes = useStyles();

  //use history to set route
  const history = useHistory();

  const handleYourPets = () => {
    history.push("/pet");
  };

  return (
    <Drawer
      anchor={"right"}
      open={state["right"]}
      onClose={toggleDrawer(false)}
    >
      <div
        className={clsx(classes.list)}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          <ListItem>
            <Avatar style={{ marginRight: 5 }}>
              {userName ? userName[0].toUpperCase() : null}
            </Avatar>
            <Typography>{userName}</Typography>
          </ListItem>
          <Divider />
          <ListItem button onClick={handleYourPets}>
            <ListItemIcon>
              <PetsOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Your Pets</ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText>Your Cards</ListItemText>
          </ListItem>
          <ListItem button onClick={handleOpen}>
            <ListItemIcon>
              <AddOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Credit Card</ListItemText>
          </ListItem>
          <Divider />
          <ListItem button onClick={clearToken}>
            <ListItemText>Logout</ListItemText>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default ProfilePanel;
