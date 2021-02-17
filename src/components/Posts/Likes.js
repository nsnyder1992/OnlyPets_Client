import { useState } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

const Likes = ({ id, likes, likePost, unlikePost }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    liked ? unlikePost(id) : likePost(id);
    setLiked(!liked);
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleLike}>
      <FavoriteIcon color={liked ? "secondary" : "inherit"} />
      <Typography>{likes}</Typography>
    </IconButton>
  );
};

export default Likes;
