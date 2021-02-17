import { Grid, Button, Typography } from "@material-ui/core";

const HomeHeader = () => {
  return (
    <header>
      <Grid container spacing={3}>
        <Grid item xs={1} />
        <Grid item xs={4}>
          <Typography variant="h5">Home</Typography>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={4}></Grid>
      </Grid>
    </header>
  );
};

export default HomeHeader;
