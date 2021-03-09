import { useEffect, useState, useCallback } from "react";

import { Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useFetch, useInfiniteScroll } from "../../hooks/infiniteScrollHooks";
import { BASEURL } from "../../context/base-url-context";
import PetCard from "../Pets/PetCard";


const YourPets = ({ setRoute, sessionToken, pet, post }) => {
  const [loading, setLoading] = useState(false);

  const limit = 4;

  useEffect(() => {
    setRoute("/pet");
  });

  const fetchUrl = `${BASEURL}/pet/owned/1/${limit}`;

  const [yourPets, setYourPets] = useState();

  const getYourPets = useCallback(() => {
    fetch(fetchUrl, {
      method: "GET",
      headers: new Headers({
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setYourPets(json.pets);
      })
      .catch((err) => console.log(err));
  }, [pet, post, sessionToken]);

  useEffect(() => {
    getYourPets();
  }, [getYourPets]);

  return (
    <div className="posts">
      <Typography variant="h5">Your Pets</Typography>
      {yourPets?.map((pet, index) => {
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
    </div>
  );
};

export default YourPets;
