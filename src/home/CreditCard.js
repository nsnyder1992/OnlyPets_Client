//material ui components
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
} from "@material-ui/core";

//images
import visa from "./img/visa.PNG";
import mastercard from "./img/mastercard.svg";

const CreditCard = ({ sessionToken, card }) => {
  return (
    <ListItem>
      <ListItemIcon>
        {card.card.brand === "visa" ? (
          <img src={visa} style={{ width: 40 }} />
        ) : null}
        {card.card.brand === "mastercard" ? (
          <img src={mastercard} style={{ width: 40 }} />
        ) : null}
      </ListItemIcon>
      <ListItemText>#{card.card.last4}</ListItemText>
    </ListItem>
  );
};

export default CreditCard;
