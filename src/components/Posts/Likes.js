import { useState, useEffect, useCallback } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

//get base url of backend
import { BASEURL } from "../../context/base-url-context";

const Likes = ({ id, sessionToken }) => {
  //states
  const [numLikes, setNumLikes] = useState();
  const [liked, setLiked] = useState(false);

  //toggle liked state and send like/unlike req to server
  const handleLike = () => {
    if (!liked) {
      likePost(id);
      setNumLikes(numLikes + 1);
    } else {
      unlikePost(id);
      setNumLikes(numLikes - 1);
    }
    setLiked(!liked);
  };

  //get number of likes and init if liked by user
  //using useCallback as suggested by rule react-hooks/exhaustive-deps
  const getLikes = useCallback(() => {
    fetch(`${BASEURL}/like/${id}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setNumLikes(json.numLikes);
        setLiked(json.userLiked);
      })
      .catch((err) => console.error(err));
  }, [id, sessionToken]);

  //send a req to server to like post
  const likePost = (postId) => {
    fetch(`${BASEURL}/like/${postId}`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setNumLikes(json.numLikes);
        setLiked(json.userLiked);
      })
      .catch((err) => console.error(err));
  };

  ///send a req to server to unlike post
  const unlikePost = (postId) => {
    fetch(`${BASEURL}/like/${postId}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        let likes = json.numLikes ? json.numLikes : 0;
        setNumLikes(likes);
        setLiked(json.userLiked);
      })
      .catch((err) => console.error(err));
  };

  //on id change update number and if user likes this post
  useEffect(() => {
    getLikes();
  }, [getLikes]);

  return (
    // toggle likes using button
    <IconButton aria-label="add to favorites" onClick={handleLike}>
      <FavoriteIcon color={liked ? "secondary" : "inherit"} />
      <Typography>{numLikes}</Typography>
    </IconButton>
  );
};

export default Likes;
