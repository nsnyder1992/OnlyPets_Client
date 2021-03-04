import { useCallback, useEffect, useState } from "react";

//material components
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { indigo } from "@material-ui/core/colors";

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

const PostCard = ({ post, sessionToken }) => {
  //styles
  const classes = useStyles();

  //states
  const [petName, setPetName] = useState();

  //get pet name give post.petId
  //using useCallback as suggested by rule react-hooks/exhaustive-deps
  const getPetName = useCallback(() => {
    fetch(`${BASEURL}/${post.petId}`, {
      method: "GET",
      headers: new Headers({
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setPetName(json.pet.name);
      })
      .catch((err) => console.log(err));
  }, [post, sessionToken]);

  //on change in [post] update petName
  useEffect(() => {
    getPetName();
  }, [getPetName]); //added post to dependencies now petName updates after a delete

  return (
    <div className={classes.root}>
      <Typography variant="h5">Look at these pets!</Typography>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar aria-label="Pet" className={classes.avatar}>
            {petName ? petName[0].toUpperCase() : null}
          </Avatar>
        }
      />
      <CardMedia className={classes.media} image={post.photoUrl} />
    </div>
  );
};

export default PostCard;
