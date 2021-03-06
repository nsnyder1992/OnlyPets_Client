import { useState, useEffect } from "react";

import CreditCard from "./CreditCard";

//get base url of backend
import { BASEURL } from "../context/base-url-context";
import { CircularProgress, ListItem, ListItemText } from "@material-ui/core";

const CreditCards = ({ sessionToken }) => {
  const [cards, setCards] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${BASEURL}/stripe/customer/payment/methods`, {
      method: "GET",
      headers: new Headers({
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setLoading(false);
        setCards(json.paymentMethods.data);
      })
      .catch((err) => setLoading(false));
  }, [sessionToken]);

  return (
    <div>
      {loading ? (
        <ListItem>
          <CircularProgress />
        </ListItem>
      ) : null}
      {cards?.map((card) => {
        return <CreditCard card={card} sessionToken={sessionToken} />;
      })}
    </div>
  );
};

export default CreditCards;
