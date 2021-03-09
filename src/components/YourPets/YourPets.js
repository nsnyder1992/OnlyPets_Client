import { useEffect, useState, useCallback } from "react";

import { Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import { BASEURL } from "../../context/base-url-context";
import PetCard from "../Pets/PetCard";

const YourPets = ({ setRoute, sessionToken, openAlert }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setRoute("/pet");
  });

  const fetchUrl = `${BASEURL}/pet/owned/`;

  const [yourPets, setYourPets] = useState();

  const deletePet = async (id, pet) => {
    await fetch(`${BASEURL}/pet/${id}`, {
      method: "DELETE",
      headers: new Headers({
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        let copy = yourPets;
        let index = copy.indexOf(pet);
        if (index >= 0) copy.splice(index, 1);
        setYourPets(copy);
      })
      .catch((err) => openAlert("error"));
    openAlert("success");
  };

  const getYourPets = useCallback(() => {
    setLoading(true);
    fetch(fetchUrl, {
      method: "GET",
      headers: new Headers({
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setLoading(false);
        setYourPets(json.pets);
      })
      .catch((err) => setLoading(false));
  }, [sessionToken]);

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
              deletePost={deletePet}
            />
          </div>
        );
      })}
      {loading ? <CircularProgress /> : null}
    </div>
  );
};

export default YourPets;
