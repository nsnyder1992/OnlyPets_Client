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
import TimeAgo from "./TimeAgo";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 450,
    width: "60%",
    minWidth: 300,
    margin: 10,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: indigo[500],
  },
  options: {
    zIndex: 10,
    position: "relative",
    top: 110,
    left: 210,
    width: 100,
  },
}));

const PostCard = ({ post, editPost, deletePost, likePost, unlikePost }) => {
  const classes = useStyles();

  return (
    <div>
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
                  <IconButton
                    aria-label="settings"
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
                  >
                    <Box p={2}>
                      <Button onClick={() => editPost(post.id)}>Edit</Button>
                      <Button onClick={() => deletePost(post.id)}>
                        Delete
                      </Button>
                    </Box>
                  </Popover>
                </div>
              )}
            </PopupState>
          }
        />

        <CardMedia
          className={classes.media}
          image={post.photoUrl}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Tips />
          <Likes
            id={post.id}
            likes={post.likes}
            likePost={likePost}
            unlikePost={unlikePost}
          />
          <TimeAgo createdAt={post.createdAt} />
        </CardActions>
      </Card>
    </div>
  );
};

export default PostCard;
