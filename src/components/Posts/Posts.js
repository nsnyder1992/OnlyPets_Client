import { useEffect, useState } from "react";

//import components
import PostCard from "./PostCard";

//css
import "./styles/Posts.css";

const Posts = () => {
  const [posts, setPosts] = useState();

  const getPosts = () => {
    fetch(`http://localhost:3001/post/${0}/${10}`)
      .then((res) => res.json())
      .then((json) => setPosts(json));
  };

  const deletePost = (postId) => {
    console.log(postId);
    fetch(`http://localhost:3001/post/${postId}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        getPosts();
        console.log(json);
      })
      .catch((err) => console.error(err));
  };

  const editPost = (postId) => {
    console.log(postId);
  };

  const likePost = (postId) => {
    fetch(`http://localhost:3001/post/like/${postId}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        getPosts();
        console.log(json);
      })
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
      .then((json) => {
        getPosts();
        console.log(json);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getPosts();
    console.log(posts);
  }, []);

  return (
    <div class="posts">
      {posts?.map((post, index) => {
        return (
          <PostCard
            post={post}
            editPost={editPost}
            deletePost={deletePost}
            likePost={likePost}
            unlikePost={unlikePost}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default Posts;
