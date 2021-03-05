import { useEffect, useReducer, useRef, useState } from "react";

import { Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useFetch, useInfiniteScroll } from "../../hooks/infiniteScrollHooks";

// import PetCard from "../Pets/PetCard";

const YourPets = ({ setRoute, sessionToken, petType, type }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setRoute("/pet");
  });

  const postReducer = (state, action) => {
    switch (action.type) {
      case "STACK_IMAGES":
        return { ...state, posts: state.posts.concat(action.posts) };
      case "UPDATING_IMAGES":
        return { ...state, posts: action.posts };
      case "DELETE_IMAGE":
        const index = state.posts.indexOf(action.post);
        if (index > -1) state.posts.splice(index, 1);
        return { ...state, posts: state.posts };
      case "FETCHING_IMAGES":
        return { ...state, fetching: action.fetching };
      default:
        return state;
    }
  };

  //This handles paging (pagination) of the backend api
  const pageReducer = (state, action) => {
    switch (action.type) {
      case "UPDATING_PAGE":
        return { ...state, page: action.page };
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

  const limit = 4;
  let baseUrl = `http://localhost:3001/pet/owned`;
  const fetchUrl = `${baseUrl}/${pager.page}/${limit}`;

  useFetch(
    postData.posts,
    null,
    petType,
    pager,
    postDispatch,
    pagerDispatch,
    fetchUrl,
    sessionToken,
    setLoading
  );

  let bottomBoundaryRef = useRef(null);
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

  return (
    <div className="posts">
      <Typography variant="h5">Your Pets</Typography>
      {postData?.posts.map((index) => {
        // return <PetCard key={index} sessionToken={sessionToken} />;
        return <></>;
      })}
      {loading ? <CircularProgress /> : null}
      <div id="page-bottom-boundary" ref={bottomBoundaryRef}></div>
    </div>
  );
};

export default YourPets;
