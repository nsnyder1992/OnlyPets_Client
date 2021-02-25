import { useCallback, useEffect, useState } from "react";

//material components
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { indigo } from "@material-ui/core/colors";

//components
import Likes from "./Likes";
import Tips from "./Tips";
import Subscribe from "./Subscribe";
import TimeAgo from "./TimeAgo";
import PostCardOptions from "./PostCardOptions";

import "./styles/PostCard.css";

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

const PostCard = ({ post, deletePost, sessionToken }) => {
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
  }); //added post to dependencies now petName updates after a delete

  return (
    <div className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar aria-label="Pet" className={classes.avatar}>
            {petName ? petName[0].toUpperCase() : null}
          </Avatar>
        }
        // handles edit and delete of a post
        action={<PostCardOptions post={post} deletePost={deletePost} />}
        title={<Typography>{petName}</Typography>}
      />

      <CardMedia className={classes.media} image={post.photoUrl} />

      <CardActions disableSpacing className={classes.actions}>
        <div className={classes.actionsLeft}>
          <Likes id={post.id} likes={post.likes} sessionToken={sessionToken} />
        </div>
        <div className={classes.actionsRight}>
          <Tips />
          <Subscribe id={post.petId} sessionToken={sessionToken} />
        </div>
      </CardActions>

      <div className={classes.content}>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          align="left"
        >
          {post.description}
        </Typography>
      </div>

      <div className={classes.timeAgo}>
        <TimeAgo dateString={post.createdAt} />
      </div>
    </div>
  );
};

export default PostCard;
