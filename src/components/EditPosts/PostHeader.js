import { Grid, Button, Typography } from "@material-ui/core";

const PostHeader = ({ petId, fileUrl, handleSubmit }) => {
  return (
    <header>
      <Grid container spacing={3}>
        <Grid item xs={1} />
        <Grid item xs={4}>
          <Typography variant="h5">New Post</Typography>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            disabled={petId && fileUrl ? false : true}
            onClick={handleSubmit}
          >
            Post
          </Button>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </header>
  );
};

export default PostHeader;
