import { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";

const TimeAgo = ({ dateString }) => {
  //states
  const [timeAgo, setTimeAgo] = useState();

  const getTimeAgo = (dateString) => {
    //seconds to different units constants
    const secToMin = 60;
    const secToHrs = 3600;
    const secToDay = 86400;
    const secToWks = 604800;
    const secToMth = 2.628e6;

    let date = new Date(dateString);
    let today = new Date();
    let secondsAgo = (today - date) / 1000;

    //init text as over a Month ago
    let tempTimeAgo = "over a Month ago";

    //set the text to least time unit
    if (secondsAgo < secToMth)
      tempTimeAgo = Math.floor(secondsAgo / secToWks) + " weeks ago";

    if (secondsAgo < secToWks)
      tempTimeAgo = Math.floor(secondsAgo / secToDay) + " days ago";

    if (secondsAgo < secToDay)
      tempTimeAgo = Math.floor(secondsAgo / secToHrs) + "hrs ago";

    if (secondsAgo < secToHrs)
      tempTimeAgo = Math.floor(secondsAgo / secToMin) + "min ago";

    if (secondsAgo < secToMin) tempTimeAgo = "now";

    setTimeAgo(tempTimeAgo);
  };

  //on change in [dateString] update timeAgo text
  useEffect(() => {
    getTimeAgo(dateString);
  }, [dateString]);

  return (
    <Typography
      variant="body2"
      color="textSecondary"
      component="p"
      align="left"
    >
      {timeAgo}
    </Typography>
  );
};

export default TimeAgo;
