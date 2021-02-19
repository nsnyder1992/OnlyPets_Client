import { useEffect, useState } from "react";

//components
import HomeHeader from "./Home/HomeHeader";
import Posts from "./Posts/Posts";
import Pets from "./Pets/Pets.js";

//css
import "./styles/Layouts.css";

const Home = ({ setRoute, sessionToken }) => {
  const [type, setType] = useState("all");
  const [viewPosts, setViewPosts] = useState(true); //true posts, false explore pets

  const toggleView = () => {
    setViewPosts(!viewPosts);
  };

  useEffect(() => {
    setRoute("/");
  }, []);

  return (
    <div className="home">
      <HomeHeader
        type={type}
        setType={setType}
        sessionToken={sessionToken}
        toggleView={toggleView}
        viewPosts={viewPosts}
      />
      {viewPosts ? (
        <Posts sessionToken={sessionToken} setRoute={setRoute} />
      ) : (
        <Pets sessionToken={sessionToken} />
      )}
    </div>
  );
};

export default Home;
