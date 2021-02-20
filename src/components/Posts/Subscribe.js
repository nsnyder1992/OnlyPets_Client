import { useState, useEffect } from "react";

import { IconButton, Typography } from "@material-ui/core";
import SubscriptionsOutlinedIcon from "@material-ui/icons/SubscriptionsOutlined";

const Subscribe = ({ id, sessionToken }) => {
  const [numSubs, setNumSubs] = useState();
  const [isSubed, setIsSubed] = useState(false);

  const handleSubscribe = () => {
    if (!isSubed) {
      subPet(id);
    } else {
      unsubPet(id);
    }
    setIsSubed(!isSubed);
  };

  const getSubs = () => {
    fetch(`http://localhost:3001/subscribe/num/${id}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setNumSubs(json.numSub);
        setIsSubed(json.userSub);
      })
      .catch((err) => console.error(err));
  };

  const subPet = (id) => {
    fetch(`http://localhost:3001/subscribe/${id}`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setNumSubs(json.numSub);
        setIsSubed(json.userSub);
      })
      .catch((err) => console.error(err));
  };

  const unsubPet = (id) => {
    fetch(`http://localhost:3001/subscribe/${id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        let numSub = json.numSub ? json.numSub : 0;
        setNumSubs(numSub);
        setIsSubed(json.userSub);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getSubs();
  }, []);

  return (
    <IconButton aria-label="add to favorites" onClick={handleSubscribe}>
      <SubscriptionsOutlinedIcon color={isSubed ? "primary" : "inherit"} />
    </IconButton>
  );
};

export default Subscribe;
