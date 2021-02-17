import { Typography } from "@material-ui/core";

//components
import HomeHeader from "./Home/HomeHeader";
import Posts from "./Posts/Posts";

const Home = () => {
  return (
    <div>
      <HomeHeader />
      <Posts />
    </div>
  );
};

export default Home;
