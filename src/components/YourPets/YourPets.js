import { useEffect, useReducer, useRef } from "react";

import { Typography } from "@material-ui/core";

import {
  useFetch,
  useInfiniteScroll
} from "../../hooks/infiniteScrollHooks";

const YourPets = ({ setRoute, sessionToken }) => {
  useEffect(() => {
    setRoute("/pet");
  }, []);

  const postReducer = (state, action) => {
    switch (action.type) {
      case "STACK_IMAGES":
        return { ...state, posts: state.posts.concat(action.posts) };
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

  let bottomBoundaryRef = useRef(null);
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);


  return (
    <div>
      <Typography variant="h5">Your Pets</Typography>
    </div>
  );
};

export default YourPets;
