import { Grid, Typography, IconButton } from "@material-ui/core";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import PetsOutlinedIcon from "@material-ui/icons/PetsOutlined";

//components
import Categories from "./Categories";

//css
import "./styles/HomeHeader.css";

const HomeHeader = ({ type, setType }) => {
  return (
    <div>
      <header className="header">
        <Grid container spacing={2}>
          <Grid item xs={3} />
          <Grid item xs={2}>
            <Typography variant="h5">Home</Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton className="button">
              <ExploreOutlinedIcon />
            </IconButton>
          </Grid>
          <Grid item xs={1}>
            <IconButton className="button">
              <PetsOutlinedIcon />
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            <Categories type={type} setType={setType} />
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </header>
      <hr />
    </div>
  );
};

export default HomeHeader;
