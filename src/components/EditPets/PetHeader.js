import { Grid, Button, Typography } from "@material-ui/core";

//css
import "./styles/PetHeader.css";

const PostHeader = ({ handleSubmit }) => {
  return (
    <header>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Typography variant="h5">New Pet</Typography>
        </Grid>
        <Grid item xs={8} />
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            disabled
            onClick={handleSubmit}
          >
            Post
          </Button>
        </Grid>
      </Grid>
      <hr />
    </header>
  );
};

export default PostHeader;
