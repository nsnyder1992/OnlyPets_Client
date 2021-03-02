import { useParams, useHistory } from "react-router-dom";

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

const AddCreditCard = ({ sessionToken }) => {
  return (
    <div className="add-new">
      <Elements stripe={stripePromise}>
        <AddCardHeader sessionToken={sessionToken} />
        <AddCreditCardForm />
      </Elements>
    </div>
  );
};

export default AddCreditCard;
