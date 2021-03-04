import { useState } from "react";
import { useHistory } from "react-router-dom";

//material components
import CircularProgress from "@material-ui/core/CircularProgress";

//components
import PetHeader from "../EditPets/PetHeader";
import PetBody from "../EditPets/PetBody";

//css
import "../styles/Layouts.css";

const NewPet = ({ openAlert }) => {
  const history = useHistory();

  //states
  const [name, setName] = useState();

  //loading state
  const [loading, setLoading] = useState(false);

  //submit new pet to backend and return home!
  const handleSubmit = () => {
    setLoading(true);
    console.log("submited"); //place logic here
    setLoading(false);
    history.push("/"); //redirects back to home component
  };

  return (
    <div className="create-post">
      <PetHeader handleSubmit={handleSubmit} />

      <PetBody setName={setName} name={name} />
      {loading ? <CircularProgress /> : null}
    </div>
  );
};

export default NewPet;
