import { useEffect, useState } from "react";

//material components
import CircularProgress from "@material-ui/core/CircularProgress";

//components
import HomeHeader from "./HomeHeader";
import Posts from "../Posts/Posts";
import Pets from "../Pets/Pets.js";

//css
import "../styles/Layouts.css";

const Home = ({ setRoute, sessionToken, openAlert }) => {
  //pet type is initialized from local storage or set to 'all'
  const [type, setType] = useState(
    localStorage.getItem("petType") ? localStorage.getItem("petType") : "all"
  );
  const [viewPosts, setViewPosts] = useState(true); //true posts, false explore pets
  const [postType, setPostType] = useState("subscribed"); //sets endpoint to get posts

  //toggle which post you will see, subscribed or likes!
  const postToggle = (e, type) => {
    e.preventDefault();
    if (postType !== type) setPostType(type);
    if (!viewPosts) setViewPosts(!viewPosts);
    console.log(type);
  };

  //toggles to see explore pets
  const toggleView = (e) => {
    e.preventDefault();
    setViewPosts(!viewPosts);
  };

  //route the app is on
  setRoute("/");

  return (
    <div className="home">
      <HomeHeader
        type={type}
        setType={setType}
        sessionToken={sessionToken}
        toggleView={toggleView}
        viewPosts={viewPosts}
        setPage={postToggle}
      />
      {/* Toggle Posts or Pets*/}
      {viewPosts ? (
        <Posts
          sessionToken={sessionToken}
          petType={type}
          postType={postType}
          openAlert={openAlert}
        />
      ) : (
        <Pets
          sessionToken={sessionToken}
          petType={type}
          openAlert={openAlert}
        />
      )}
    </div>
  );
};

export default Home;
