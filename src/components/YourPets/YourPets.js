import { useEffect } from "react";

import { Typography } from "@material-ui/core";

const YourPets = ({ setRoute }) => {
  useEffect(() => {
    setRoute("/pet");
  }, []);

  return <Typography variant="h5">Your Pets</Typography>;
};

export default YourPets;
