//material ui components
import { ListItem, ListItemText, ListItemIcon } from "@material-ui/core";

//images
import visa from "./img/visa.PNG";
import mastercard from "./img/mastercard.svg";

const CreditCard = ({ card }) => {
  return (
    <ListItem>
      <ListItemIcon>
        {card.card.brand === "visa" ? (
          <img src={visa} style={{ width: 40 }} alt="visa" />
        ) : null}
        {card.card.brand === "mastercard" ? (
          <img src={mastercard} style={{ width: 40 }} alt="mastercard" />
        ) : null}
      </ListItemIcon>
      <ListItemText>#{card.card.last4}</ListItemText>
    </ListItem>
  );
};

export default CreditCard;
