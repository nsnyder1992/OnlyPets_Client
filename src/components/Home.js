//components
import { useEffect, useState } from "react";
import HomeHeader from "./Home/HomeHeader";
import Posts from "./Posts/Posts";

//css
import "./styles/Layouts.css";

const Home = ({ setRoute, sessionToken }) => {
  const [type, setType] = useState("all");

  useEffect(() => {
    setRoute("/");
  }, []);

  return (
    <div className="home">
      <HomeHeader type={type} setType={setType} sessionToken={sessionToken} />
      <Posts sessionToken={sessionToken} />
    </div>
  );
};

export default Home;
