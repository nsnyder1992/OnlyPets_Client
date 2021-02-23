import { useEffect, useState } from "react";

//components
import HomeHeader from "./HomeHeader";
import Posts from "../Posts/Posts";
import Pets from "../Pets/Pets.js";

//css
import "../styles/Layouts.css";

const Home = ({ setRoute, sessionToken }) => {
  const [type, setType] = useState(
    localStorage.getItem("petType") ? localStorage.getItem("petType") : "all"
  );
  const [viewPosts, setViewPosts] = useState(true); //true posts, false explore pets
  const [postType, setPostType] = useState("subscribed");

  const postToggle = (e, type) => {
    e.preventDefault();
    if (postType !== type) setPostType(type);
    if (!viewPosts) setViewPosts(!viewPosts);
    console.log(type);
  };

  const toggleView = (e) => {
    e.preventDefault();
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
        setPage={postToggle}
      />
      {viewPosts ? (
        <Posts
          sessionToken={sessionToken}
          setRoute={setRoute}
          petType={type}
          postType={postType}
        />
      ) : (
        <Pets sessionToken={sessionToken} setRoute={setRoute} petType={type} />
      )}
    </div>
  );
};

export default Home;
