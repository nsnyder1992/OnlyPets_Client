//components
import { useState } from "react";
import HomeHeader from "./Home/HomeHeader";
import Posts from "./Posts/Posts";

//css
import "./styles/Layouts.css";

const Home = () => {
  const [type, setType] = useState("all");

  return (
    <div className="home">
      <HomeHeader type={type} setType={setType} />
      <Posts />
    </div>
  );
};

export default Home;
