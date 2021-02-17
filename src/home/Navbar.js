import { Route, Link, Switch } from "react-router-dom";

//material components
import { Grid, IconButton } from "@material-ui/core";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import PetsOutlinedIcon from "@material-ui/icons/PetsOutlined";

//components
import NewPost from "../components/NewPost/NewPost";

//css
import "./Navbar.css";

// Function name matches file name
const Navbar = () => {
  // return must have one parent element
  return (
    <header>
      <div className="navbar">
        <nav>
          <Grid container spacing={1}>
            <Grid item xs={4} />

            <Grid item xs={1}>
              <IconButton>
                <Link to="/">
                  <HomeOutlinedIcon style={{ fontSize: 27 }} />
                </Link>
              </IconButton>
            </Grid>

            <Grid item xs={1}>
              <IconButton>
                <Link to="/post">
                  <AddBoxOutlinedIcon style={{ fontSize: 27 }} />
                </Link>
              </IconButton>
            </Grid>

            <Grid item xs={1}>
              <IconButton>
                <Link to="/pet">
                  <PetsOutlinedIcon style={{ fontSize: 27 }} />
                </Link>
              </IconButton>
            </Grid>

            <Grid item xs={1}>
              <IconButton>
                <Link to="/profile">
                  <PersonOutlineIcon style={{ fontSize: 27 }} />
                </Link>
              </IconButton>
            </Grid>

            <Grid item xs={4} />
          </Grid>
        </nav>
      </div>

      <hr />

      <div className="apps">
        <Switch>
          <Route exact path="/">
            <div />
          </Route>
          <Route exact path="/post">
            <NewPost />
          </Route>
          <Route exact path="/profile">
            <div />
          </Route>
        </Switch>
      </div>
    </header>
  );
};

// Makes it available for import
export default Navbar;
