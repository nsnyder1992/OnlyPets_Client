import { useCallback, useEffect, useState } from "react";

//material components
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { indigo } from "@material-ui/core/colors";
import { CardContent } from "@material-ui/core";

import "./styles/PetCard.css";

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

const BASEURL = "http://localhost:3001/pet";

const PetCard = ({ pet, sessionToken }) => {
  //styles
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={<Avatar aria-label="Pet" className={classes.avatar} />}
      />
      <CardContent>
        <Typography variant="h5">{pet.name}</Typography>
        <Typography variant="body2">{pet.description}</Typography>
      </CardContent>
      {/* <CardMedia className={classes.media} image={pet.photoUrl} /> */}
    </div>
  );
};

export default PetCard;
