import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useContext } from "react";
import { AlertContext } from "../context/alert-context";

function CustomAlert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Alert = () => {
  const alert = useContext(AlertContext);

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={6000}
      onClose={alert.closeAlert}
    >
      <CustomAlert onClose={alert.closeAlert} severity={alert.severity}>
        {alert.message}
      </CustomAlert>
    </Snackbar>
  );
};

export default Alert;
