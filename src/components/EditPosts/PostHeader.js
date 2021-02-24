import { Grid, Button, Typography } from "@material-ui/core";

const PostHeader = ({ petId, fileUrl, handleSubmit }) => {
  //handles submitting data from PostBody, and en/disable Post button
  return (
    <header>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Typography variant="h5">New Post</Typography>
        </Grid>
        <Grid item xs={8} />
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            disabled={petId && fileUrl ? false : true}
            onClick={handleSubmit}
          >
            Post
          </Button>
        </Grid>
      </Grid>
    </header>
  );
};

export default PostHeader;
