import { useState, useEffect } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

const Likes = ({ id, likes, sessionToken }) => {
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

  const getLikes = () => {
    fetch(`http://localhost:3001/like/${id}`, {
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
  };

  const likePost = (postId) => {
    fetch(`http://localhost:3001/like/${postId}`, {
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

  const unlikePost = (postId) => {
    fetch(`http://localhost:3001/like/${postId}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        let likes = json.numLikes ? json.numLikes : 0;
        setNumLikes(likes);
        setLiked(json.userLiked);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <IconButton aria-label="add to favorites" onClick={handleLike}>
      <FavoriteIcon color={liked ? "secondary" : "inherit"} />
      <Typography>{numLikes}</Typography>
    </IconButton>
  );
};

export default Likes;
