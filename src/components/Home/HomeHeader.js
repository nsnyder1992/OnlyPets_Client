import { Grid, Typography, IconButton, Link, Button } from "@material-ui/core";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import SubjectOutlinedIcon from "@material-ui/icons/SubjectOutlined";
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
          <Grid item xs={3} />
          <Grid item xs={1}>
            <IconButton className="button" onClick={(e) => setPage(e, "all")}>
              {" "}
              {/* for explore pets onClick={viewPosts ? toggleView : preventDefault} */}
              <ExploreOutlinedIcon />
            </IconButton>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={1}>
            <IconButton className="button" onClick={(e) => setPage(e, "liked")}>
              <FavoriteIcon />
            </IconButton>
          </Grid>
          <Grid item xs={2} />
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
