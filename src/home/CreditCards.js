import { useState, useEffect } from "react";

import CreditCard from "./CreditCard";

//get base url of backend
import { BASEURL } from "../context/base-url-context";

const CreditCards = ({ sessionToken }) => {
  const [cards, setCards] = useState();

  useEffect(() => {
    fetch(`${BASEURL}/stripe/customer/payment/methods`, {
      method: "GET",
      headers: new Headers({
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => setCards(json.paymentMethods.data))
      .catch((err) => {});
  }, [sessionToken]);

  return (
    <div>
      {cards?.map((card) => {
        return <CreditCard card={card} sessionToken={sessionToken} />;
      })}
    </div>
  );
};

export default CreditCards;
