import React, { useState } from "react";
import { useHistory } from "react-router-dom";

//material components
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import Hidden from "@material-ui/core/Hidden";
import PetsOutlinedIcon from "@material-ui/icons/PetsOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import AccountBalanceOutlinedIcon from "@material-ui/icons/AccountBalanceOutlined";
import CreditCardOutlinedIcon from "@material-ui/icons/CreditCardOutlined";
import {
  Avatar,
  Typography,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";

//components
import CreditCards from "./CreditCards";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const ProfilePanel = ({
  sessionToken,
  userName,
  clearToken,
  toggleDrawer,
  state,
}) => {
  const classes = useStyles();

  //use history to set route
  const history = useHistory();

  const handleYourPets = () => {
    history.push("/pet");
  };

  const handleAddCard = () => {
    history.push("/addCard");
  };

  const handleOnboarding = () => {
    fetch("http://localhost:3001/stripe/account/onboard", {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
        authorization: sessionToken,
      }),
    });
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
            <ListItemIcon>
              <CreditCardOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Your Cards</ListItemText>
          </ListItem>
          <CreditCards sessionToken={sessionToken} />
          <ListItem button onClick={handleAddCard}>
            <ListItemIcon>
              <AddOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Credit Card</ListItemText>
          </ListItem>
          <Divider />
          <Hidden only={["xs", "sm", "md", "lg", "xl"]}>
            <ListItem button onClick={handleOnboarding}>
              <ListItemIcon>
                <AccountBalanceOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Add Account</ListItemText>
            </ListItem>
            <Divider />
          </Hidden>

          <ListItem button onClick={clearToken}>
            <ListItemIcon>
              <ExitToAppOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default ProfilePanel;
