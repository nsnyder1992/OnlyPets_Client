import { Grid, Typography, IconButton, Link } from "@material-ui/core";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import SubjectOutlinedIcon from "@material-ui/icons/SubjectOutlined";

//components
import Categories from "./Categories";

//css
import "./styles/HomeHeader.css";

const HomeHeader = ({ type, setType, toggleView, viewPosts }) => {
  return (
    <div>
      <header className="header">
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <Typography variant="h5">Home</Typography>
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={4}>
            <IconButton className="button" onClick={toggleView}>
              {viewPosts ? <ExploreOutlinedIcon /> : <SubjectOutlinedIcon />}
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
