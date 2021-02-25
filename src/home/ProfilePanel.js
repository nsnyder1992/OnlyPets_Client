//material components
import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import { Avatar, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const ProfilePanel = ({ userName, clearToken, toggleDrawer, state }) => {
  const classes = useStyles();

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
          <ListItem>
            <Button onClick={clearToken}>Logout</Button>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default ProfilePanel;
