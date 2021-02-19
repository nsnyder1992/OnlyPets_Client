import { useState } from "react";
import { Route, Link, Switch } from "react-router-dom";

//material components
import { Grid, IconButton } from "@material-ui/core";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import PetsOutlinedIcon from "@material-ui/icons/PetsOutlined";

//components
import Home from "../components/Home";
import AddNew from "../components/AddNew/AddNew";
import EditPost from "../components/EditPosts/EditPost";
import YourPets from "../components/YourPets";
import Profile from "../components/Profile";

//css
import "./Navbar.css";

// Function name matches file name
const Navbar = ({ sessionToken }) => {
  const [route, setRoute] = useState("/");
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

          <Link to="/profile">
            <IconButton>
              <PersonOutlineIcon style={{ fontSize: 30 }} />
            </IconButton>
          </Link>
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
            <AddNew />
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
