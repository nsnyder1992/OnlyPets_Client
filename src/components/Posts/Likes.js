import { useState } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

const Likes = ({ id, likes }) => {
  const [numLikes, setNumLikes] = useState(likes);
  const [liked, setLiked] = useState(false);

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

  const likePost = (postId) => {
    fetch(`http://localhost:3001/post/like/${postId}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error(err));
  };

  const unlikePost = (postId) => {
    fetch(`http://localhost:3001/post/unlike/${postId}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error(err));
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleLike}>
      <FavoriteIcon color={liked ? "secondary" : "inherit"} />
      <Typography>{numLikes}</Typography>
    </IconButton>
  );
};

export default Likes;
