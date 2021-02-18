import { useReducer, useRef } from "react";

//import components
import PostCard from "./PostCard";

//import hooks
import { useFetch, useInfiniteScroll } from "../../hooks/infiniteScrollHooks";

//css
import "./styles/Posts.css";

const Posts = () => {
  //reducers
  const postReducer = (state, action) => {
    switch (action.type) {
      case "STACK_IMAGES":
        return { ...state, posts: state.posts.concat(action.posts) };
      case "DELETE_IMAGE":
        const index = state.posts.indexOf(action.post);
        state.posts.splice(index, 1);
        return { ...state, posts: state.posts };
      case "FETCHING_IMAGES":
        return { ...state, fetching: action.fetching };
      default:
        return state;
    }
  };

  const pageReducer = (state, action) => {
    switch (action.type) {
      case "ADVANCE_PAGE":
        return { ...state, page: state.page + 1 };
      default:
        return state;
    }
  };

  //use reducers
  const [postData, postDispatch] = useReducer(postReducer, {
    posts: [],
    fetching: true,
  });

  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 1 });

  useFetch(
    postData.posts,
    pager,
    postDispatch,
    `http://localhost:3001/post/${pager.page}/${4}`
  );

  let bottomBoundaryRef = useRef(null);
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

  const deletePost = (postId, post) => {
    fetch(`http://localhost:3001/post/${postId}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        postDispatch({ type: "DELETE_IMAGE", post: post });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="posts">
      {postData?.posts.map((post, index) => {
        return <PostCard post={post} deletePost={deletePost} key={index} />;
      })}
      <div id="page-bottom-boundary" ref={bottomBoundaryRef}></div>
    </div>
  );
};

export default Posts;
