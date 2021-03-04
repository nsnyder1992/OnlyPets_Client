import { useEffect, useCallback, useRef, useState } from "react";

// make API calls and pass the returned data via dispatch
export const useFetch = (
  posts,
  postType,
  petType,
  pager,
  dispatch,
  pagerDispatch,
  fetchUrl,
  sessionToken,
  setLoading
) => {
  //get/set total posts to stop render after getting to last post
  const [totalPosts, setTotalPosts] = useState();

  //init last Type states to check for changes later
  const [lastPetType, setLastPetType] = useState();
  const [lastPostType, setLastPostType] = useState();

  const fetchData = async () => {
    if (sessionToken === undefined) return; //if no sessionToken stop process

    //check if Last types have changed if so reset posts and page
    if (petType !== lastPetType || postType !== lastPostType) {
      dispatch({ type: "UPDATING_IMAGES", posts: [] }); //reset posts
      pagerDispatch({ type: "UPDATING_PAGE", page: 1 }); //reset pagerDispatch

      //set last types so we know when it changes again
      setLastPetType(petType);
      setLastPostType(postType);

      //need at least one post for below logic to work
      setTotalPosts(1);

      //end this useEffect the above changes to dispatch and pager will initiate another useEffect cycle
      return;
    }
    console.log(posts.length, totalPosts);

    // this stops the fetch if the last post is ever reached
    if (posts.length >= totalPosts) return;

    //Get posts and store them using the Dispatches!!!
    dispatch({ type: "FETCHING_IMAGES", fetching: true });
    setLoading(true);
    fetch(fetchUrl, {
      method: "GET",
      headers: new Headers({
        authorization: sessionToken,
      }),
    })
      .then((data) => data.json())
      .then((json) => {
        //update total posts to know when user will get to the last post
        setTotalPosts(json.total ? json.total : json.count); //some endpoints use total some use count...

        //abstract posts from json.posts
        const posts = json.posts;

        //send to dispatch
        dispatch({ type: "STACK_IMAGES", posts });
        dispatch({ type: "FETCHING_IMAGES", fetching: false });
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        dispatch({ type: "FETCHING_IMAGES", fetching: false });
        return e;
      });
  };

  //this useEffect will run when changes are made to any of [dispatch, pager, petType, postType]
  useEffect(() => {
    fetchData();
  }, [dispatch, pager, petType, postType]);
};

export const deleteFromDispatch = async (
  post,
  dispatch,
  fetchUrl,
  sigUrl,
  cloudinaryUrl,
  sessionToken
) => {
  // let folder = post?.photoUrl.split("/")[7];
  // let public_id = post?.photoUrl.split("/")[8];

  // //get cloudinary security from backend
  // const res = await fetch(`${sigUrl}/${folder}/${public_id}`, {
  //   method: "GET",
  //   headers: new Headers({
  //     authorization: sessionToken,
  //   }),
  // });
  // const json = await res.json();

  // //set form data
  // let formData = new FormData();
  // formData.append("api_key", json.key);
  // formData.append("timestamp", json.timestamp);
  // // formData.append("folder", json.folder);
  // formData.append("public_id", json.public_id);
  // formData.append("invalidate", json.invalidate);
  // formData.append("signature", json.signature);

  // //post to cloudinary and get url for storage
  // const cloudinaryRes = await fetch(cloudinaryUrl, {
  //   method: "POST",
  //   body: formData,
  // });
  // const cloudinaryJson = await cloudinaryRes.json();
  // console.log(cloudinaryJson);

  //delete posts and update the posts
  const postRes = await fetch(fetchUrl, {
    method: "DELETE",
    headers: new Headers({
      "Content-Type": "application/json",
      authorization: sessionToken,
    }),
  });

  //this finds the index of post in postData.posts and deletes and updates it
  await dispatch({ type: "DELETE_IMAGE", post: post });

  //check if deleted
  const postJson = await postRes.json();
  console.log(postJson);
};

// infinite scrolling with intersection observer
export const useInfiniteScroll = (scrollRef, dispatch) => {
  /******************************************************************** 
  Looks over objects in DOM and if it intersects with specified Ref
  it will advance the pager initiating the above useFetch Hook getting
  more posts!!!!!!!!
  ********************************************************************/
  const scrollObserver = useCallback(
    (node) => {
      new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.intersectionRatio > 0) {
            dispatch({ type: "ADVANCE_PAGE" });
          }
        });
      }).observe(node);
    },
    [dispatch]
  );

  useEffect(() => {
    console.log("useInfiniteScroll");
    if (scrollRef.current) {
      scrollObserver(scrollRef.current);
    }
  }, [scrollObserver, scrollRef]);
};

// lazy load images with intersection observer
/*************************************************************
 * THE BELOW IS NOT USED SOMETHING IS WRONG WITH IT :/
 *************************************************************/
export const useLazyLoading = (imgSelector, items) => {
  const imgObserver = useCallback((node) => {
    const intObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.intersectionRatio > 0) {
          const currentImg = en.target;
          const newImgSrc = currentImg.dataset.src;
          // only swap out the image source if the new url exists
          if (!newImgSrc) {
            console.error("Image source is invalid");
          } else {
            currentImg.src = newImgSrc;
          }
          intObs.unobserve(node); // detach the observer when done
        }
      });
    });

    intObs.observe(node);
  }, []);

  const imagesRef = useRef(null);

  useEffect(() => {
    imagesRef.current = document.querySelectorAll(imgSelector);
    if (imagesRef.current) {
      imagesRef.current.forEach((img) => imgObserver(img));
    }
  }, [imgObserver, imagesRef, imgSelector, items]);
};
