import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Typography } from "@material-ui/core";

//get base url of backend
import { BASEURL } from "../../context/base-url-context";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch(`${BASEURL}/user/login`, {
      method: "POST",
      body: JSON.stringify({
        user: { username: username, password: password },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.error) return setError(data.error);
        props.updateToken(data?.sessionToken, data.user.id);
      })
      .catch((err) => setLoading(false));
  };

  return (
    <div>
      <Container>
        <Typography variant="h4">Login</Typography>
        <form className={classes.root} noValidate onSubmit={handleSubmit}>
          <TextField
            required
            id="outlined-required"
            label="Required"
            defaultValue="username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />

          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button variant="contained" color="primary" type="submit">
            {loading ? <CircularProgress size={25} color="inherit" /> : "Login"}
          </Button>
        </form>
        {error ? <Typography color="secondary">{error}</Typography> : null}
      </Container>
    </div>
  );
};

export default Login;
