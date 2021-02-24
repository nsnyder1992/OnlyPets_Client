import { useEffect, useState } from "react";
import { Route, Link, Switch } from "react-router-dom";

//material components
import { IconButton } from "@material-ui/core";
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
import ProfilePanel from "./ProfilePanel";

//css
import "./Navbar.css";

// Function name matches file name
const Navbar = ({ sessionToken, clearToken }) => {
  //states
  const [route, setRoute] = useState("/"); //where are we in relation to "/"
  const [drawerState, setDrawerState] = useState({ right: false }); //is profilePanel displayed
  const [userName, setUsername] = useState(); //whose the user?

  //on change in sessionToken update userName state above
  useEffect(() => {
    if (sessionToken) {
      fetch(`http://localhost:3001/user/self`, {
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
    }
  }, [sessionToken]);

  //open in close profilePanel
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerState({ ...drawerState, right: open });
  };

  // return must have one parent element
  return (
    <header>
      <ProfilePanel
        userName={userName}
        clearToken={clearToken}
        toggleDrawer={toggleDrawer}
        state={drawerState}
      />
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
