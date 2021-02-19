import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles();

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('https://localhost:3001/user/login', {
            method: 'POST',
            body: JSON.stringify({ username: username, password: password }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            props.updateToken(data.sessionToken);
        })
    }

    return (
        <div>
            <Container maxWidth="sm">
                <Typography variant="h4">Login</Typography>
                <form className={classes.root} noValidate onSubmit={handleSubmit}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        defaultValue="username"
                        variant="outlined"
                    />
                    <Input onChange={(e) => setUsername(e.target.value)} name="username" value={username} />


                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                    />
                    <Input onChange={(e) => setPassword(e.target.value)} name="password" value={password} />

                    <Button variant="contained" color="primary" type="submit">Login</Button>
                </form>
            </Container>
        </div>
    )
}

export default Login;