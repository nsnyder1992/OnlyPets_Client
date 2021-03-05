import { IconButton } from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PopupState, { bindTrigger } from "material-ui-popup-state";

//components
import TipsPopover from "./TipsPopover";

//init stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51IOBbVCpTGapbgrnj8ac2TSDEIGgx6hSzCZ57QLkOZDlnJdlAgA5yenVLH27V2WffpJFOyj4ORnM5LqBZNb63JtG00MAg1Cd2i"
);

const Tips = ({ post, sessionToken, openAlert }) => {
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <IconButton
            aria-label="settings"
            disabled={
              // if user !== owner disable button
              post.pet.userId === parseInt(localStorage.getItem("userId"))
            }
            {...bindTrigger(popupState)}
          >
            <AttachMoneyIcon />
          </IconButton>
          <Elements stripe={stripePromise}>
            <TipsPopover
              petId={post.petId}
              popupState={popupState}
              sessionToken={sessionToken}
              openAlert={openAlert}
            />
          </Elements>
        </div>
      )}
    </PopupState>
  );
};

export default Tips;
