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
import FavoriteIcon from "@material-ui/icons/Favorite";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Box from "@material-ui/core/Box";

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

const PostCard = ({ post, setPosts, index }) => {
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
                      <Typography>Edit</Typography>
                      <Typography>Delete</Typography>
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
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
            <Typography>{post.likes}</Typography>
          </IconButton>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.createdAt}
          </Typography>
        </CardActions>
      </Card>
    </div>
  );
};

export default PostCard;
