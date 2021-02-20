import { useState } from "react";
import { useHistory } from "react-router-dom";

//components
import PetHeader from "../EditPets/PetHeader";
import PetBody from "../EditPets/PetBody";

//css
import "../styles/Layouts.css";

const NewPet = () => {
  const history = useHistory();
  const handleSubmit = () => {
    console.log("submited");
    history.push("/");
  };

  return (
    <div className="create-post">
      <PetHeader handleSubmit={handleSubmit} />

      <PetBody />
    </div>
  );
};

export default NewPet;
