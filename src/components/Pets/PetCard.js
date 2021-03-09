import { useState, useCallback, useEffect } from "react";

//material components
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { indigo } from "@material-ui/core/colors";
import { CardContent, CardActions, Grid } from "@material-ui/core";

import "./styles/PetCard.css";
import Subscribe from "./Subscribe";
import { BASEURL } from "../../context/base-url-context";
import PetCardOptions from "./PetCardOptions";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 650,
    width: "90%",
    minWidth: 200,
    margin: 5,
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
    paddingBottom: 10,
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

const PetCard = ({ pet, deletePost, sessionToken }) => {
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
        setPhotoUrl(json.posts[0]?.photoUrl);
      })
      .catch((err) => console.log(err));
  }, [pet, sessionToken]);

  useEffect(() => {
    getPetPhoto();
  }, [getPetPhoto]);

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar aria-label="Pet" className={classes.avatar}>
            {pet.name ? pet.name[0].toUpperCase() : null}
          </Avatar>
        }
        action={<PetCardOptions pet={pet} deletePost={deletePost} />}
        title={<Typography>{pet.name}</Typography>}
      />

      <CardMedia className={classes.media} image={photoUrl} />

      <CardActions disableSpacing className={classes.actions}>
        <Subscribe id={pet.id} sessionToken={sessionToken} />
        <div className={classes.actionsRight}>
          {!photoUrl ? (
            <Typography variant="body2" component="p" color="secondary">
              No posts
            </Typography>
          ) : (
            <div></div>
          )}
        </div>
      </CardActions>

      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body2" component="p" align="left">
              {pet.description}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" component="p" align="left">
              <strong>Owner:</strong> {pet.user.username}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" component="p" align="left">
              <strong>Type:</strong> {pet.type}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PetCard;
