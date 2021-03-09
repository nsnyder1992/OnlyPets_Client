import { useEffect, useState, useCallback } from "react";

import { Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import { BASEURL } from "../../context/base-url-context";
import PetCard from "../Pets/PetCard";

//styles
import "../styles/Layouts.css";
import "./styles/YourPets.css";

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
        setLoading(false);
        setYourPets(json.pets);
      })
      .catch((err) => setLoading(false));
  }, [sessionToken]);

  useEffect(() => {
    getYourPets();
  }, [getYourPets]);

  return (
    <div className="home">
      <Typography variant="h5">Your Pets</Typography>
      <div className="posts">
        {yourPets?.map((pet, index) => {
          return (
            <PetCard
              key={index}
              pet={pet}
              sessionToken={sessionToken}
              deletePost={deletePet}
            />
          );
        })}
        {loading ? <CircularProgress /> : null}
      </div>
    </div>
  );
};

export default YourPets;
