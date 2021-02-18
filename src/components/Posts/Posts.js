import { useEffect, useReducer, useCallback, useRef, useState } from "react";

//import components
import PostCard from "./PostCard";

//css
import "./styles/Posts.css";

const Posts = () => {
  //states
  const [totalPosts, setTotalPosts] = useState();

  //reducers
  const imgReducer = (state, action) => {
    switch (action.type) {
      case "STACK_IMAGES":
        return { ...state, images: state.images.concat(action.images) };
      case "FETCHING_IMAGES":
        return { ...state, fetching: action.fetching };
      default:
        return state;
    }
  };

  const pageReducer = (state, action) => {
    switch (action.type) {
      case "ADVANCE_PAGE":
        console.log(action.type);
        return { ...state, page: state.page + 1 };
      default:
        return state;
    }
  };

  const [imgData, imgDispatch] = useReducer(imgReducer, {
    images: [],
    fetching: true,
  });

  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 1 });

  const getPosts = () => {
    if (imgData.images.length >= totalPosts) return;
    fetch(`http://localhost:3001/post/${pager.page}/${10 / 2}`)
      .then((res) => res.json())
      .then((json) => {
        setTotalPosts(json.total);
        const images = json.posts;
        imgDispatch({ type: "STACK_IMAGES", images });
        imgDispatch({ type: "FETCHING_IMAGES", fetching: false });
      })
      .catch((err) => {
        console.error(err);
        imgDispatch({ type: "FETCHING_IMAGES", fetching: false });
      });
  };

  const deletePost = (postId) => {
    fetch(`http://localhost:3001/post/${postId}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        getPosts();
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

  useEffect(async () => {
    imgDispatch({ type: "FETCHING_IMAGES", fetching: true });
    getPosts();
  }, [imgDispatch, pager.page]);

  //implement infinite scrolling with intersection observer
  let bottomBoundaryRef = useRef(null);
  const scrollObserver = useCallback(
    (node) => {
      new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.intersectionRatio > 0) pagerDispatch({ type: "ADVANCE_PAGE" });
        });
      }).observe(node);
    },
    [pagerDispatch]
  );

  useEffect(() => {
    if (bottomBoundaryRef.current) scrollObserver(bottomBoundaryRef.current);
  }, [scrollObserver, bottomBoundaryRef]);

  return (
    <div class="posts">
      {imgData?.images.map((post, index) => {
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
      <div id="page-bottom-boundary" ref={bottomBoundaryRef}></div>
    </div>
  );
};

export default Posts;
