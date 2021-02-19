import { useReducer, useRef } from "react";

//import components
import PostCard from "./PostCard";

//import hooks
import {
  useFetch,
  useInfiniteScroll,
  deleteFromDispatch,
} from "../../hooks/infiniteScrollHooks";

//css
import "./styles/Posts.css";

const Posts = ({ sessionToken }) => {
  //reducers
  const postReducer = (state, action) => {
    switch (action.type) {
      case "STACK_IMAGES":
        return { ...state, posts: state.posts.concat(action.posts) };
      case "DELETE_IMAGE":
        console.log(action.post);
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
    `http://localhost:3001/post/${pager.page}/${4}`,
    sessionToken
  );

  const backend = "http://localhost:3001/post/cloudinary/delete";
  const cloudinaryUrl =
    "https://api.cloudinary.com/v1_1/nsnyder1992/image/destroy";

  const deletePost = (postId, post) => {
    const deleteUrl = `http://localhost:3001/post/${postId}`;
    deleteFromDispatch(
      post,
      postDispatch,
      deleteUrl,
      backend,
      cloudinaryUrl,
      sessionToken
    );
  };

  let bottomBoundaryRef = useRef(null);
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

  return (
    <div className="posts">
      {postData?.posts.map((post, index) => {
        return (
          <PostCard
            post={post}
            deletePost={deletePost}
            key={index}
            sessionToken={sessionToken}
          />
        );
      })}
      <div id="page-bottom-boundary" ref={bottomBoundaryRef}></div>
    </div>
  );
};

export default Posts;
