import { useEffect } from "react";

import { Typography } from "@material-ui/core";

import {
  useFetch,
  useInfiniteScroll
} from "../../hooks/infiniteScrollHooks";

import "./styles/Posts.css";

const Pets = () => {
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

  // const backend = "http://localhost:3001/post/cloudinary/delete";
  // const cloudinaryUrl =
  //   "https://api.cloudinary.com/v1_1/nsnyder1992/image/destroy";


  let bottomBoundaryRef = useRef(null);
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

  return (
    <div className="posts">
      {postData?.posts.map((index) => {
        return (
          <PetsCard
            key={index}
            sessionToken={sessionToken}
          />
        );
      })}
      <div id="page-bottom-boundary" ref={bottomBoundaryRef}></div>
    </div>
  );
};

export default Pets;
