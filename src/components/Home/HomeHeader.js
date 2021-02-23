import { Grid, Typography, IconButton, Link, Button } from "@material-ui/core";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import PetsOutlinedIcon from "@material-ui/icons/PetsOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";

//components
import Categories from "./Categories";

//css
import "./styles/HomeHeader.css";

const HomeHeader = ({ type, setType, toggleView, viewPosts, setPage }) => {
  const preventDefault = (event) => event.preventDefault();
  return (
    <div>
      <header className="header">
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <Button
              onClick={(e) => setPage(e, "subscribed")}
              disableUnderline
              color="inherit"
            >
              <Typography variant="h5">Home</Typography>
            </Button>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={2}>
            <IconButton className="button" onClick={(e) => setPage(e, "all")}>
              <ExploreOutlinedIcon />
            </IconButton>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={2}>
            <IconButton
              className="button"
              onClick={viewPosts ? toggleView : preventDefault}
            >
              <PetsOutlinedIcon />
            </IconButton>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={2}>
            <IconButton className="button" onClick={(e) => setPage(e, "liked")}>
              <FavoriteIcon />
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            <Categories type={type} setType={setType} />
          </Grid>
        </Grid>
      </header>
      <hr />
    </div>
  );
};

export default HomeHeader;
