import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Signup from "./Signup";
import Login from "./Login";

import "./styles/Auth.css";

const Auth = (props) => {
  const [authComp, setAuthComp] = useState(false);
  const onClick = () => setAuthComp(!authComp);

  return (
    <div className="auth-container">
      <Grid>
        {authComp ? (
          <Signup updateToken={props.updateToken} />
        ) : (
          <Login updateToken={props.updateToken} />
        )}
        {authComp ? (
          <Button color="primary" onClick={onClick}>
            Already have an account? Login.
          </Button>
        ) : (
          <Button color="primary" onClick={onClick}>
            Don't have an account yet? Sign up.
          </Button>
        )}
      </Grid>
    </div>
  );
};

export default Auth;
