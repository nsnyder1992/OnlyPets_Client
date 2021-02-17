import { Link } from "react-router-dom";
import { Grid, Button, Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

//css
import "./styles/EditHeader.css";

const EditHeader = ({ route, petId, fileUrl, handleSubmit }) => {
  return (
    <header>
      <Grid container spacing={3}>
        <Grid item xs={1} />
        <Grid item xs={4} className="back-group">
          <Link to={route} id="back">
            <ArrowBackIcon />
          </Link>
          <Typography variant="h5">Edit Post</Typography>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={4}>
          <Link to={route}>
            <Button>Cancel</Button>
          </Link>
          <Button
            variant="contained"
            color="primary"
            disabled={petId && fileUrl ? false : true}
            onClick={handleSubmit}
          >
            Done
          </Button>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </header>
  );
};

export default EditHeader;
