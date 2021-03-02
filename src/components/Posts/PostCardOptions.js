import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//material components
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Box from "@material-ui/core/Box";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  popover: {
    display: "flex",
    flexDirection: "column",
  },
}));

const PostCardOptions = ({ post, deletePost }) => {
  const classes = useStyles();
  //states to set petName and edit url data
  const [urlArray, setUrlArray] = useState(); //this helps with querying edit url

  //update url to after cloudinary upload to update image
  const getEditUrl = (post) => {
    let url = post.photoUrl.split("upload")[1];
    setUrlArray(url.split("/"));
  };

  //on change in [post] update urlArray states
  useEffect(() => {
    getEditUrl(post);
  }, [post]); //added post to dependencies now urlArray updates after a delete

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <IconButton
            aria-label="settings"
            disabled={
              // if user !== owner disable button
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
            {/* Edit and delete post */}
            <Box p={2} className={classes.popover}>
              {/* edit post url with queries */}
              <Link
                // empty post.description causes a problem here
                to={`/editPost/${post.id}/${post.petId}/${
                  post.description ? post.description : " "
                }/${urlArray}`}
                style={{ textDecoration: "none" }}
              >
                <Button>Edit</Button>
              </Link>
              {/* delete post from postData.post and server/DB */}
              <Button onClick={() => deletePost(post.id, post)}>Delete</Button>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  );
};

export default PostCardOptions;
