import { useState, useEffect } from "react";

import { IconButton } from "@material-ui/core";
import SubscriptionsOutlinedIcon from "@material-ui/icons/SubscriptionsOutlined";

const Subscribe = ({ id, sessionToken }) => {
  //states
  const [numSubs, setNumSubs] = useState();
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
  const getSubs = (id) => {
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
        setNumSubs(json.numSub);
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
        let numSub = json.numSub ? json.numSub : 0;
        setNumSubs(numSub);
        setIsSubed(json.userSub);
      })
      .catch((err) => console.error(err));
  };

  //on change in id token update card
  useEffect(() => {
    getSubs(id);
  }, [id]);

  return (
    <IconButton aria-label="add to favorites" onClick={handleSubscribe}>
      <SubscriptionsOutlinedIcon color={isSubed ? "primary" : "inherit"} />
    </IconButton>
  );
};

export default Subscribe;
