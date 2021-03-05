import { useState } from "react";
import { useHistory } from "react-router-dom";

//material components
import CircularProgress from "@material-ui/core/CircularProgress";

//components
import PetHeader from "../EditPets/PetHeader";
import PetBody from "../EditPets/PetBody";

//css
import "../styles/Layouts.css";

<<<<<<< HEAD
const NewPet = ({ openAlert }) => {
=======
const NewPet = ({sessionToken}) => {
>>>>>>> 20e67c24aa733051beaef5231f8a29aa4c76c68d
  const history = useHistory();

  //states
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState("dog");

  //loading state
  const [loading, setLoading] = useState(false);

  //submit new pet to backend and return home!
<<<<<<< HEAD
  const handleSubmit = () => {
    setLoading(true);
    console.log("submited"); //place logic here
    setLoading(false);
    history.push("/"); //redirects back to home component
=======
  const handleSubmit = async () => {
    await fetch("http://localhost:3001/pet/create", {
      method: "Post",
      body: JSON.stringify({
        pet: {name: name, type: type, description: description,}
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));

    history.push("/");
>>>>>>> 20e67c24aa733051beaef5231f8a29aa4c76c68d
  };

  return (
    <div className="create-pet">
      <PetHeader handleSubmit={handleSubmit} />

<<<<<<< HEAD
      <PetBody setName={setName} name={name} />
      {loading ? <CircularProgress /> : null}
=======
      <PetBody setName={setName} name={name} setDescription={setDescription} description={description}
      setType={setType} type={type}  />
>>>>>>> 20e67c24aa733051beaef5231f8a29aa4c76c68d
    </div>
  );

   // console.log("submited");
    history.push("/"); //redirects back to home component
  };




export default NewPet;
