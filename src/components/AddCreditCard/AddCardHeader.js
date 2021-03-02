import { useHistory } from "react-router-dom";

import { Button, Typography } from "@material-ui/core";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";

//init stripe
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

//css
import "./styles/AddCardHeader.css";

const AddCardHeader = ({ sessionToken }) => {
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  const amount = 100;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (!error) {
      console.log(`[PaymentMethod]`, paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await fetch(
          "http://localhost:3001/stripe/customer/addCard",
          {
            method: "POST",
            body: JSON.stringify({
              amount: amount,
              id: id,
            }),
            headers: new Headers({
              "content-type": "application/json",
              authorization: sessionToken,
            }),
          }
        );

        const json = await response.json();
        console.log(json);

        stripe
          .confirmCardPayment(json.client_secret, {
            payment_method: {
              card: cardElement,
            },
          })
          .then((res) => {
            console.log(res);
            history.push("/");
          });
      } catch (error) {
        console.log(`[error]`, error);
      }
    } else {
      console.log(`[error]`, error);
    }
  };

  return (
    <div className="header-div">
      <header className="header">
        <Typography variant="h5">Add Card</Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddOutlinedIcon />}
          disabled={!stripe}
          onClick={handleSubmit}
        >
          Add
        </Button>
      </header>
      <hr />
    </div>
  );
};

export default AddCardHeader;
