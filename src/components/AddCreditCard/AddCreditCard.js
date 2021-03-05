import { useState } from "react";

//material components
import CircularProgress from "@material-ui/core/CircularProgress";

//components
import AddCreditCardForm from "./AddCreditCardForm";
import AddCardHeader from "./AddCardHeader";

import "./styles/AddCreditCardForm.css";

//init stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51IOBbVCpTGapbgrnj8ac2TSDEIGgx6hSzCZ57QLkOZDlnJdlAgA5yenVLH27V2WffpJFOyj4ORnM5LqBZNb63JtG00MAg1Cd2i"
);

const AddCreditCard = ({ sessionToken, openAlert }) => {
  //states
  const [loading, setLoading] = useState(false);

  return (
    <div className="add-new">
      <Elements stripe={stripePromise}>
        <AddCardHeader
          sessionToken={sessionToken}
          setLoading={setLoading}
          openAlert={openAlert}
        />
        <AddCreditCardForm />
      </Elements>
      {loading ? <CircularProgress /> : null}
    </div>
  );
};

export default AddCreditCard;
