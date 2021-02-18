import { useState, useEffect, useCallback, useRef } from "react";

// make API calls and pass the returned data via dispatch
export const useFetch = (array, data, dispatch, fetchUrl, sessionToken) => {
  //states
  const [totalPosts, setTotalPosts] = useState();

  useEffect(() => {
    if (array.length >= totalPosts) return;
    dispatch({ type: "FETCHING_IMAGES", fetching: true });
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
  }, [dispatch, data.page]);
};

export const deleteFromDispatch = (post, dispatch, fetchUrl, sessionToken) => {
  fetch(fetchUrl, {
    method: "DELETE",
    headers: new Headers({
      "Content-Type": "application/json",
      authorization: sessionToken,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      dispatch({ type: "DELETE_IMAGE", post: post });
    })
    .catch((err) => console.error(err));
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
