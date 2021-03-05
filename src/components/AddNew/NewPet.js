import { useState } from "react";
import { useHistory } from "react-router-dom";

//components
import PetHeader from "../EditPets/PetHeader";
import PetBody from "../EditPets/PetBody";

//css
import "../styles/Layouts.css";

const NewPet = ({sessionToken}) => {
  const history = useHistory();

  //states
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState("dog");

  //submit new pet to backend and return home!
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
  };

  return (
    <div className="create-pet">
      <PetHeader handleSubmit={handleSubmit} />

      <PetBody setName={setName} name={name} setDescription={setDescription} description={description}
      setType={setType} type={type}  />
    </div>
  );

   // console.log("submited");
    history.push("/"); //redirects back to home component
  };




export default NewPet;
