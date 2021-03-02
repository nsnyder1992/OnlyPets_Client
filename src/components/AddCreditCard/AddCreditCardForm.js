import { Divider } from "@material-ui/core";

import { CardElement } from "@stripe/react-stripe-js";

const AddCreditCardForm = () => {
  return (
    <div className="stripe-form">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
                width: 100,
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />

      <Divider />
    </div>
  );
};

export default AddCreditCardForm;
