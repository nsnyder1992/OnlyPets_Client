import { useState, useEffect, useCallback, useRef } from "react";

// make API calls and pass the returned data via dispatch
export const useFetch = (array, pager, dispatch, fetchUrl, sessionToken) => {
  //states
  const [totalPosts, setTotalPosts] = useState();
  // console.log("useFetch", sessionToken);
  useEffect(() => {
    if (array.length >= totalPosts || sessionToken == undefined) return;
    dispatch({ type: "FETCHING_IMAGES", fetching: true });
    console.log("useFetch", fetchUrl);
    fetch(fetchUrl, {
      method: "GET",
      headers: new Headers({
        authorization: sessionToken,
      }),
    })
      .then((data) => data.json())
      .then((json) => {
        setTotalPosts(json.total);
        const posts = json.posts;
        dispatch({ type: "STACK_IMAGES", posts });
        dispatch({ type: "FETCHING_IMAGES", fetching: false });
      })
      .catch((e) => {
        dispatch({ type: "FETCHING_IMAGES", fetching: false });
        return e;
      });
  }, [dispatch, pager.page]);
};

export const useUpdateFetch = (
  petType,
  dispatch,
  pagerDispatch,
  fetchUrl,
  sessionToken
) => {
  useEffect(() => {
    if (sessionToken == undefined) return;
    console.log(petType);
    dispatch({ type: "FETCHING_IMAGES", fetching: true });
    fetch(fetchUrl, {
      method: "GET",
      headers: new Headers({
        authorization: sessionToken,
      }),
    })
      .then((data) => data.json())
      .then((json) => {
        console.log(json.posts);
        const posts = json.posts;
        dispatch({ type: "UPDATING_IMAGES", posts });
        pagerDispatch({ type: "UPDATING_PAGE", page: 1 });
        dispatch({ type: "FETCHING_IMAGES", fetching: false });
      })
      .catch((e) => {
        dispatch({ type: "FETCHING_IMAGES", fetching: false });
        return e;
      });
  }, [petType]);
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

  const postRes = await fetch(fetchUrl, {
    method: "DELETE",
    headers: new Headers({
      "Content-Type": "application/json",
      authorization: sessionToken,
    }),
  });
  await dispatch({ type: "DELETE_IMAGE", post: post });
  const postJson = await postRes.json();
  console.log(postJson);
};

// infinite scrolling with intersection observer
export const useInfiniteScroll = (scrollRef, dispatch) => {
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
