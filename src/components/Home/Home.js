import { Typography } from "@material-ui/core";

//components
import Posts from "./Posts";

const Home = () => {
  return (
    <div>
      <Typography variant="h5">Home</Typography>
      <Posts />
    </div>
  );
};

export default Home;
