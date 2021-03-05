import { createContext } from "react";

export const alerts = {
  error: {
    open: true,
    message: "Something went wrong :(",
    severity: "warning",
  },
  success: {
    open: true,
    message: "Success!!!",
    severity: "success",
  },
  close: {
    open: false,
  },
};

export const AlertContext = createContext({
  alert: alerts.close,
  openAlert: () => {},
  closeAlert: () => {},
});
