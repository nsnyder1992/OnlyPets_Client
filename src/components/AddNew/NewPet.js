import { useState } from "react";
import { useHistory } from "react-router-dom";

//material components
import CircularProgress from "@material-ui/core/CircularProgress";

//components
import PetHeader from "../EditPets/PetHeader";
import PetBody from "../EditPets/PetBody";

//get base url of backend
import { BASEURL } from "../../context/base-url-context";

//css
import "../styles/Layouts.css";

const NewPet = ({ sessionToken, openAlert }) => {
  const history = useHistory();

  //states
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState("dog");

  //loading state
  const [loading, setLoading] = useState(false);

  //submit new pet to backend and return home!

  const handleSubmit = async () => {
    setLoading(true);
    await fetch(`${BASEURL}/pet/create`, {
      method: "Post",
      body: JSON.stringify({
        pet: { name: name, type: type, description: description },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        openAlert("success");
      })
      .catch((err) => {
        openAlert("error");
      });

    setLoading(false);
    history.push("/pet");
  };

  return (
    <div className="create-pet">
      <PetHeader name={name} type={type} handleSubmit={handleSubmit} />

      <PetBody
        setName={setName}
        name={name}
        setDescription={setDescription}
        description={description}
        setType={setType}
        type={type}
        isEdit={false}
      />
      {loading ? <CircularProgress /> : null}
    </div>
  );
};

export default NewPet;
