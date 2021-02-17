import { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";

const TimeAgo = ({ createdAt }) => {
  const [timeAgo, setTimeAgo] = useState();

  const getTimeAgo = () => {
    const secToMin = 60;
    const secToHrs = 3600;
    const secToDay = 86400;
    const secToWks = 604800;
    const secToMth = 2.628e6;

    let date = new Date(createdAt);
    let today = new Date();
    let secondsAgo = (today - date) / 1000;
    console.log(secondsAgo);

    let tempTimeAgo = "< 1min";

    if (secondsAgo < secToMth)
      tempTimeAgo = Math.floor(secondsAgo / 2.628e6) + "weeks ago";

    if (secondsAgo < secToWks)
      tempTimeAgo = Math.floor(secondsAgo / secToDay) + "days ago";

    if (secondsAgo < secToDay)
      tempTimeAgo = Math.floor(secondsAgo / secToHrs) + "hrs ago";

    if (secondsAgo < secToHrs)
      tempTimeAgo = Math.floor(secondsAgo / secToMin) + "min ago";

    if (secondsAgo < secToMin) tempTimeAgo = "< 1min";

    setTimeAgo(tempTimeAgo);
  };

  useEffect(() => {
    getTimeAgo();
  }, []);

  return (
    <Typography variant="body2" color="textSecondary" component="p">
      {timeAgo}
    </Typography>
  );
};

export default TimeAgo;
