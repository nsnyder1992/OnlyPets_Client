import { useEffect, useState } from "react";

//material ui components
import {
  makeStyles,
  Popover,
  Box,
  ListItemText,
  ListItem,
  Typography,
  Select,
  MenuItem,
  ListItemIcon,
  FormControl,
  InputLabel,
  Divider,
} from "@material-ui/core";
import { bindPopover } from "material-ui-popup-state";

//images
import visa from "./img/visa.PNG";
import mastercard from "./img/mastercard.svg";
import AreYouSure from "../../home/AreYouSure";

//init stripe
import { useStripe } from "@stripe/react-stripe-js";

const useStyles = makeStyles((theme) => ({
  popover: {
    display: "flex",
    flexDirection: "column",
    minWidth: 200,
  },
  formControl: {
    margin: theme.spacing(1),
  },
  select: {
    selectMenu: {
      display: "flex",
    },
  },
}));

const TipsPopover = ({ petId, popupState, sessionToken }) => {
  //styles
  const classes = useStyles();

  //stripe
  const stripe = useStripe();

  //states
  const [hasCard, setHasCard] = useState(false);
  const [payment, setPayment] = useState();
  const [paymentMethods, setPaymentMethods] = useState();
  const [amount, setAmount] = useState();
  const [open, setOpen] = useState(false);

  const handleClick = (e, amount) => {
    e.preventDefault();
    setAmount(amount);
    setOpen(true);
  };

  const handleTip = async () => {
    if (!stripe) return;

    const response = await fetch(
      `http://localhost:3001/stripe/customer/tip/${petId}`,
      {
        method: "POST",
        body: JSON.stringify({
          amount: amount * 100,
          payment_method: payment.id,
          off_session: true,
        }),
        headers: new Headers({
          "content-type": "application/json",
          authorization: sessionToken,
        }),
      }
    );

    const intent = await response.json();
    console.log(intent);

    stripe
      .confirmCardPayment(intent.client_secret, {
        payment_method: intent.payment_method,
      })
      .then((res) => {
        console.log(res);
      });
    //   .catch((err) => console.log(err));
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetch("http://localhost:3001/stripe/customer/payment/methods", {
      method: "GET",
      headers: new Headers({
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setHasCard(json.hasCard);
        setPaymentMethods(json.paymentMethods.data);
        setPayment(json.paymentMethods.data[0]);
      });
  }, []);

  return (
    <Popover
      {...bindPopover(popupState)}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      className={classes.popover}
    >
      {/* Edit and delete post */}
      <Box p={2} className={classes.popover}>
        {hasCard ? (
          <>
            <AreYouSure
              open={open}
              handleClose={handleClose}
              action={handleTip}
              title="Tip Pet"
              message={`Are you sure you want to tip $${amount}.00`}
              cancelText="No"
              cancelColor="secondary"
              confirmText="Yes"
              confirmColor="primary"
            />
            <Typography>Tip Amounts</Typography>
            <ListItem button onClick={(e) => handleClick(e, 1)}>
              <ListItemText>$1</ListItemText>
            </ListItem>
            <ListItem button onClick={(e) => handleClick(e, 5)}>
              <ListItemText>$5</ListItemText>
            </ListItem>
            <ListItem button onClick={(e) => handleClick(e, 10)}>
              <ListItemText>$10</ListItemText>
            </ListItem>
            <Divider />
            <FormControl className={classes.formControl}>
              <InputLabel id="payment-select-label">Payment Method</InputLabel>
              <Select
                labelId="payment-select-label"
                id="payment-select"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                renderValue={(method) => (
                  <MenuItem value={method}>
                    {method.card.brand === "visa" ? (
                      <img src={visa} style={{ width: 40 }} />
                    ) : null}
                    {method.card.brand === "mastercard" ? (
                      <img src={mastercard} style={{ width: 40 }} />
                    ) : null}

                    <ListItemText>#{method.card.last4}</ListItemText>
                  </MenuItem>
                )}
              >
                {paymentMethods?.map((method) => {
                  return (
                    <MenuItem value={method}>
                      {method.card.brand === "visa" ? (
                        <img src={visa} style={{ width: 40 }} />
                      ) : null}
                      {method.card.brand === "mastercard" ? (
                        <img src={mastercard} style={{ width: 40 }} />
                      ) : null}

                      <ListItemText>#{method.card.last4}</ListItemText>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </>
        ) : (
          <Typography>Add a Card!</Typography>
        )}
      </Box>
    </Popover>
  );
};

export default TipsPopover;
