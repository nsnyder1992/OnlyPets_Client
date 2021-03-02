import { useState, useEffect } from "react";

import CreditCard from "./CreditCard";

const CreditCards = ({ sessionToken }) => {
  const [cards, setCards] = useState();

  useEffect(() => {
    fetch("http://localhost:3001/stripe/customer/payment/methods", {
      method: "GET",
      headers: new Headers({
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => setCards(json.paymentMethods.data))
      .catch((err) => console.log(err));
  }, [sessionToken]);

  return (
    <div>
      {cards?.map((card) => {
        console.log(card);
        return <CreditCard card={card} sessionToken={sessionToken} />;
      })}
    </div>
  );
};

export default CreditCards;
