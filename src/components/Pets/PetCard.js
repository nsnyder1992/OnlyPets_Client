import { useState, useCallback, useEffect } from "react";

//material components
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { indigo } from "@material-ui/core/colors";
import { CardContent } from "@material-ui/core";

import "./styles/PetCard.css";
import Subscribe from "./Subscribe";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 650,
        width: "90%",
        minWidth: 200,
        margin: 0,
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    avatar: {
        backgroundColor: indigo[500],
    },
    actions: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 0,
    },
    content: {
        paddingLeft: 16,
        marginTop: 3,
    },
    header: {
        display: "flex",
        justifyContent: "right",
    },
    actionsRight: {
        justifyItems: "right",
    },
    actionsLeft: {
        display: "flex",
        alignItems: "center",
    },
    timeAgo: {
        paddingLeft: 16,
        paddingTop: 12,
    },
}));

const BASEURL = "http://localhost:3001";


const PetCard = ({ post, pet, sessionToken }) => {
    //styles
    const classes = useStyles();

    const [photoUrl, setPhotoUrl] = useState();

    const getPetPhoto = useCallback(() => {
        fetch(`${BASEURL}/post/byPet/${pet.id}/1/1`, {
            method: "GET",
            headers: new Headers({
                authorization: sessionToken,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                setPhotoUrl(json.posts[0].photoUrl);
                console.log(photoUrl);
            })
            .catch((err) => console.log(err));
    }, [pet, post, sessionToken]);

    useEffect(() => {
        getPetPhoto();
    }, [getPetPhoto]);

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardHeader
                    className={classes.header}
                    avatar={
                        <Avatar aria-label="Pet" className={classes.avatar}>{pet.name ? pet.name[0].toUpperCase() : null}</Avatar>
                    }
                    title={<Typography>{pet.name}</Typography>}
                />
                <CardMedia className={classes.media} image={photoUrl} />
                <CardContent>
                    <Typography variant="body2" component="p">{pet.description}</Typography>
                </CardContent>
                <Subscribe id={pet.petId} sessionToken={sessionToken} />

            </CardActionArea>
        </Card>
    );
};

export default PetCard;
