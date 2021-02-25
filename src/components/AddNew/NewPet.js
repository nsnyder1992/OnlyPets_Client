import { useState } from "react";
import { useHistory } from "react-router-dom";

//components
import PetHeader from "../EditPets/PetHeader";
import PetBody from "../EditPets/PetBody";

//css
import "../styles/Layouts.css";

const NewPet = () => {
  const history = useHistory();

  //states
  const [name, setName] = useState();

  //submit new pet to backend and return home!
  const handleSubmit = () => {
    console.log("submited");
    history.push("/"); //redirects back to home component
  };

  return (
    <div className="create-post">
      <PetHeader handleSubmit={handleSubmit} />

      <PetBody setName={setName} name={name} />
    </div>
  );
};

export default NewPet;
