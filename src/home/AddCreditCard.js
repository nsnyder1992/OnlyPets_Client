import CreditCardOutlinedIcon from "@material-ui/icons/CreditCardOutlined";
import {
  Dialog,
  Typography,
  Card,
  CardHeader,
  CardContent,
  TextField,
  InputAdornment,
  Button,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import { useState } from "react";

//init stripe
const stripe = Stripe(
  "pk_test_51IOBbVCpTGapbgrnj8ac2TSDEIGgx6hSzCZ57QLkOZDlnJdlAgA5yenVLH27V2WffpJFOyj4ORnM5LqBZNb63JtG00MAg1Cd2i"
);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    margin: theme.spacing(1),
  },
  textFieldLeft: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0.5),
    width: "25ch",
  },
  textFieldRight: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0),
    width: "25ch",
  },
}));

const AddCreditCard = ({ open, handleClose }) => {
  const classes = useStyles();

  //states
  const [cardNum, setCardNum] = useState();
  const [exp, setExp] = useState();
  const [cvn, setCvn] = useState();

  const handleCard = (num) => {
    setCardNum(num);
  };

  const handleExp = (date) => {
    setExp(date);
  };

  const handleCvn = (num) => {
    setCvn(num);
  };

  const handleAdd = () => {
    console.log("add:", cardNum, exp, cvn);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Card id="card-element">
        {/* <CardHeader title="Add Credit Card" />
        <Divider />
        <div className={classes.root}>
          <TextField
            label="Card Number"
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CreditCardOutlinedIcon />
                </InputAdornment>
              ),
            }}
            value={cardNum}
            onChange={(e) => handleCard(e.target.value)}
          />
        </div>
        <div className={classes.root}>
          {" "}
          <TextField
            label="EXP Date"
            variant="outlined"
            className={classes.textFieldLeft}
            value={exp}
            onChange={(e) => handleExp(e.target.value)}
          />
          <TextField
            label="CVN"
            variant="outlined"
            className={classes.textFieldRight}
            value={cvn}
            onChange={(e) => handleCvn(e.target.value)}
          />
        </div> */}
        <div className={classes.root}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddOutlinedIcon />}
            onClick={handleAdd}
          >
            Add
          </Button>
        </div>
      </Card>
    </Dialog>
  );
};

export default AddCreditCard;
