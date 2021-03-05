import { useReducer, useRef, useState } from "react";

//material components
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";

//import components
import PetCard from "./PetCard";

//import hooks
import {
  useFetch,
  useInfiniteScroll,
  deleteFromDispatch,
} from "../../hooks/infiniteScrollHooks";

//css
import "./styles/Pets.css";

const Pets = ({ sessionToken, petType, openAlert }) => {
  /*************************************************** 
  
  To implement the infinite scroll feature that follows
  the following tutorial was followed:

  https://www.smashingmagazine.com/2020/03/infinite-scroll-lazy-image-loading-react/

  Though some modification had to be implemented:
  -to stop renders when the last post was reached. 
  -when deleting images from postData
  -when changing postType 
  -when changing petType

  See ../../hooks/infiniteScrollHooks for more details

  ****************************************************/

  //loading set
  const [loading, setLoading] = useState(false);

  //reducers (preform som action on states)
  //This handles the state of posts and how to keep them
  //in their state
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

  /* using the above reducers change the following states */
  const [postData, postDispatch] = useReducer(postReducer, {
    posts: [],
    fetching: true,
  });
  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 1 });

  //fetch constants to use to get posts
  const limit = 4;
  let baseUrl = `http://localhost:3001/pet/type`;
  // const fetchUrl = `${baseUrl}/${petType}/${pager.page}/${limit}`;
  const fetchUrl = `http://localhost:3001/pet/type/${petType}/${pager.page}/4`;

  //Fetch hook to handle getting/updating posts based on [postDispatch, pager, postType, petType]
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

  //cloudinary urls... NOT WORKING AT THE MOMENT
  const backend = "http://localhost:3001/post/cloudinary/delete";
  const cloudinaryUrl =
    "https://api.cloudinary.com/v1_1/nsnyder1992/image/destroy";

  //delete post from postData and the server/DB
  const deletePost = (postId, post) => {
    const deleteUrl = `http://localhost:3001/pet/${postId}`;
    try {
      deleteFromDispatch(
        post,
        postDispatch,
        deleteUrl,
        backend,
        cloudinaryUrl,
        sessionToken
      );
      openAlert("success");
    } catch (err) {
      openAlert("error");
    }
  };

  //create Reference point and send it to useInfiniteScroll hook
  let bottomBoundaryRef = useRef(null);
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

  return (
    <div className="posts">

      <Typography variant="h5">Explore Pets</Typography>
      {postData?.posts.map((pet, index) => {
        return (
          <div>

            <PetCard
              key={index}
              pet={pet}
              sessionToken={sessionToken}
            />
          </div>


        );
      })}
      {loading ? <CircularProgress /> : null}
      <div id="page-bottom-boundary" ref={bottomBoundaryRef}></div>
    </div>
  );
};

export default Pets;
