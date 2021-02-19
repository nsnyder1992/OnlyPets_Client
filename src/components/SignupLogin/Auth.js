import React from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import Signup from './Signup';
import Login from './Login';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(1),
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
}));

const Auth = (props) => {
    const classes = useStyles();

    return (
        <Grid className="auth-container" container spacing={2}>
            <Grid container item xs={6}>
                <Signup updateToken={props.updateToken} />
            </Grid>
            <Grid container item xs={6}>
                <Login updateToken={props.updateToken} />
            </Grid>
        </Grid>

    )
}

export default Auth;