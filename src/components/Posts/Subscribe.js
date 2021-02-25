import { useState, useEffect, useCallback } from "react";

import { IconButton } from "@material-ui/core";
import SubscriptionsOutlinedIcon from "@material-ui/icons/SubscriptionsOutlined";

const Subscribe = ({ id, sessionToken }) => {
  //states
  const [isSubed, setIsSubed] = useState(false);

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
    fetch(`http://localhost:3001/subscribe/num/${id}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setIsSubed(json.userSub);
      })
      .catch((err) => console.error(err));
  }, [sessionToken, id]);

  //subscribe to pet
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
        setIsSubed(json.userSub);
      })
      .catch((err) => console.error(err));
  };

  //unsubscribe to pet
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
        setIsSubed(json.userSub);
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
    </IconButton>
  );
};

export default Subscribe;
