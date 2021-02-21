import { useEffect, useState } from "react";
import { Route, Link, Switch } from "react-router-dom";

//material components
import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import { Avatar, IconButton, Typography, Button } from "@material-ui/core";

import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import PetsOutlinedIcon from "@material-ui/icons/PetsOutlined";

//components
import Home from "../components/Home/Home";
import AddNew from "../components/AddNew/AddNew";
import EditPost from "../components/EditPosts/EditPost";
import YourPets from "../components/YourPets/YourPets";
import Profile from "../components/Profile/Profile";

//css
import "./Navbar.css";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

// Function name matches file name
const Navbar = ({ sessionToken, clearToken }) => {
  const [route, setRoute] = useState("/");
  const [userName, setUsername] = useState();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const classes = useStyles();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    fetch(`http://localhost:3001/user/`, {
      method: "GET",
      headers: new Headers({
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        console.log(user);
        setUsername(user.username);
      })
      .catch((err) => console.log(err));
  }, []);

  // return must have one parent element
  return (
    <header>
      <div className="navbar">
        <nav>
          <Link to="/">
            <IconButton>
              <HomeOutlinedIcon style={{ fontSize: 30 }} />
            </IconButton>{" "}
          </Link>

          <Link to="/post">
            <IconButton>
              <AddBoxOutlinedIcon style={{ fontSize: 30 }} />
            </IconButton>
          </Link>

          <Link to="/pet">
            <IconButton>
              <PetsOutlinedIcon style={{ fontSize: 30 }} />
            </IconButton>
          </Link>

          <IconButton onClick={toggleDrawer("right", true)}>
            <PersonOutlineIcon style={{ fontSize: 30 }} />
          </IconButton>
        </nav>
      </div>

      <hr
        style={{
          width: "99%",
        }}
      />

      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        <div
          className={clsx(classes.list)}
          role="presentation"
          onClick={toggleDrawer("right", false)}
          onKeyDown={toggleDrawer("right", false)}
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

      <div className="apps">
        <Switch>
          <Route exact path="/">
            <Home
              route={route}
              setRoute={setRoute}
              sessionToken={sessionToken}
            />
          </Route>
          <Route exact path="/post">
            <AddNew
              route={route}
              setRoute={setRoute}
              sessionToken={sessionToken}
            />
          </Route>
          <Route path="/editPost/:postId/:id/:desc/:file">
            <EditPost
              route={route}
              setRoute={setRoute}
              sessionToken={sessionToken}
            />
          </Route>
          <Route exact path="/pet">
            <YourPets
              route={route}
              setRoute={setRoute}
              sessionToken={sessionToken}
            />
          </Route>
          <Route exact path="/editPet">
            <YourPets
              route={route}
              setRoute={setRoute}
              sessionToken={sessionToken}
            />
          </Route>
          <Route exact path="/profile">
            <Profile
              route={route}
              setRoute={setRoute}
              sessionToken={sessionToken}
            />
          </Route>
        </Switch>
      </div>
    </header>
  );
};

// Makes it available for import
export default Navbar;
