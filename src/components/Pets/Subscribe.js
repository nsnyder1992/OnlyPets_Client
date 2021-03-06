import { useState, useEffect, useCallback } from "react";

import { IconButton, Typography } from "@material-ui/core";
import SubscriptionsOutlinedIcon from "@material-ui/icons/SubscriptionsOutlined";

import { BASEURL } from "../../context/base-url-context";

const Subscribe = ({ id, sessionToken }) => {
  //states
  const [isSubed, setIsSubed] = useState(false);
  const [numSubs, setNumSubs] = useState();

  //toggle isSubscribed and update number of subscribers
  const handleSubscribe = () => {
    if (!isSubed) {
      subPet(id);
    } else {
      unsubPet(id);
    }
    setIsSubed(!isSubed);
  };

  //get number of subscribers and if user has subscribed
  const getSubs = useCallback(() => {
    fetch(`${BASEURL}/subscribe/num/${id}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setIsSubed(json.userSub);
        setNumSubs(json.numSub);
      })
      .catch((err) => console.error(err));
  }, [sessionToken, id]);

  //subscribe to pet
  const subPet = (id) => {
    fetch(`${BASEURL}/subscribe/${id}`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setIsSubed(json.userSub);
        setNumSubs(json.numSub);
      })
      .catch((err) => console.error(err));
  };

  //unsubscribe to pet
  const unsubPet = (id) => {
    fetch(`${BASEURL}/subscribe/${id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setIsSubed(json.userSub);
        setNumSubs(json.numSub);
      })
      .catch((err) => console.error(err));
  };

  //on change in id token update card
  useEffect(() => {
    getSubs();
  }, [getSubs]);

  return (
    <IconButton aria-label="add to favorites" onClick={handleSubscribe}>
      <SubscriptionsOutlinedIcon color={isSubed ? "primary" : "inherit"} />
      <Typography>{numSubs}</Typography>
    </IconButton>
  );
};

export default Subscribe;
