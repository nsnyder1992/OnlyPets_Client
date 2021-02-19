import { Link } from "react-router-dom";

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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 650,
    width: "90%",
    minWidth: 200,
    margin: 10,
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
  },
  actionsRight: {
    justifyItems: "right",
  },
  actionsLeft: {
    display: "flex",
    alignItems: "center",
  },
}));

const PostCard = ({ post, deletePost, sessionToken }) => {
  const classes = useStyles();
  const [urlArray, setUrlArray] = useState();

  const getEditUrl = () => {
    let url = post.photoUrl.split("upload")[1];
    setUrlArray(url.split("/"));
  };

  useEffect(() => {
    getEditUrl();
  }, []);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="Pet" className={classes.avatar}>
            {post.petId}
          </Avatar>
        }
        action={
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div>
                <IconButton aria-label="settings" {...bindTrigger(popupState)}>
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
      />

      <CardMedia className={classes.media} image={post.photoUrl} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.actions}>
        <div className={classes.actionsLeft}>
          <Likes id={post.id} likes={post.likes} sessionToken={sessionToken} />
          <TimeAgo createdAt={post.createdAt} />
        </div>
        <div className={classes.actionsRight}>
          <Tips />
          <Subscribe id={post.petId} sessionToken={sessionToken} />
        </div>
      </CardActions>
    </Card>
  );
};

export default PostCard;
