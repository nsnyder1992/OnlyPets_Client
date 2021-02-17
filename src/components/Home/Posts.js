import { useEffect, useState } from "react";

//import components
import PostCard from "./PostCard";

const Posts = () => {
  const [posts, setPosts] = useState();

  const getPosts = () => {
    fetch("http://localhost:3001/post/")
      .then((res) => res.json())
      .then((json) => setPosts(json));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {posts?.map((post, index) => {
        return <PostCard post={post} setPosts={setPosts} index={index} />;
      })}
    </div>
  );
};

export default Posts;
