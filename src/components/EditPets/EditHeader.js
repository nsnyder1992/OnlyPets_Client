import { Link } from "react-router-dom";
import { Grid, Button, Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

//css
import "./styles/EditHeader.css";

const EditHeader = ({ route, handleSubmit }) => {
  // this header handles back button to route, setting the post button disabled and submitting the form
  return (
    <header>
      <Grid container spacing={3}>
        <Grid item xs={1} />
        <Grid item xs={4} className="back-group">
          <Link to={route} id="back" className="link">
            <ArrowBackIcon />
          </Link>
          <Typography variant="h5">Edit Pet</Typography>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={4}>
          <Link to={route} className="link">
            <Button>Cancel</Button>
          </Link>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Done
          </Button>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </header>
  );
};

export default EditHeader;
