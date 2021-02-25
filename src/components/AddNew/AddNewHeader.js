import { Grid, IconButton, Typography } from "@material-ui/core";
import PetsOutlinedIcon from "@material-ui/icons/PetsOutlined";
import SubjectOutlinedIcon from "@material-ui/icons/SubjectOutlined";

//components

//css
import "./styles/AddNewHeader.css";

const HomeHeader = ({ toggleView, viewPosts }) => {
  //handles toggling between NewPost or NewPet
  return (
    <div className="header-div">
      <header className="header">
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <Typography variant="h5">Add</Typography>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={3}>
            <IconButton
              className="button"
              onClick={viewPosts ? null : toggleView}
            >
              <SubjectOutlinedIcon />
            </IconButton>
          </Grid>
          <Grid item xs={3}>
            <IconButton
              className="button"
              onClick={viewPosts ? toggleView : null}
            >
              <PetsOutlinedIcon />
            </IconButton>
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </header>
      <hr />
    </div>
  );
};

export default HomeHeader;
