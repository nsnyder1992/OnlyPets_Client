import { Link } from "react-router-dom";

//material components
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { indigo } from "@material-ui/core/colors";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";

//components
import Likes from "./Likes";
import Tips from "./Tips";
import Subscribe from "./Subscribe";
import TimeAgo from "./TimeAgo";
import { useEffect, useState } from "react";

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
  popover: {
    display: "flex",
    flexDirection: "column",
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

const PostCard = ({ post, deletePost, sessionToken }) => {
  const classes = useStyles();
  const [urlArray, setUrlArray] = useState();
  const [petName, setPetName] = useState();

  const getEditUrl = () => {
    let url = post.photoUrl.split("upload")[1];
    console.log(url);
    setUrlArray(url.split("/"));
  };

  const getPetName = () => {
    fetch(`http://localhost:3001/pet/${post.petId}`, {
      method: "GET",
      headers: new Headers({
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setPetName(json.pet.name);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(sessionToken);
    console.log(post);
    getPetName();
    getEditUrl();
  }, [post]); //added post to dependencies now petName updates after a delete

  return (
    <div className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar aria-label="Pet" className={classes.avatar}>
            {petName ? petName[0].toUpperCase() : null}
          </Avatar>
        }
        action={
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div>
                <IconButton
                  aria-label="settings"
                  disabled={
                    post.pet.userId !== parseInt(localStorage.getItem("userId"))
                  }
                  {...bindTrigger(popupState)}
                >
                  <MoreVertIcon />
                </IconButton>
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  className={classes.popover}
                >
                  <Box p={2}>
                    <Link
                      to={`/editPost/${post.id}/${post.petId}/${post.description}/${urlArray}`}
                    >
                      <Button>Edit</Button>
                    </Link>
                    <Button onClick={() => deletePost(post.id, post)}>
                      Delete
                    </Button>
                  </Box>
                </Popover>
              </div>
            )}
          </PopupState>
        }
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

      {/* <CardContent className={classes.content}> */}
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
      {/* </CardContent> */}
      <div className={classes.timeAgo}>
        <TimeAgo createdAt={post.createdAt} />
      </div>
    </div>
  );
};

export default PostCard;
