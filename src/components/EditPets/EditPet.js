import { useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";

//material components
import CircularProgress from "@material-ui/core/CircularProgress";

//components
import EditHeader from "./EditHeader";
import PetBody from "./PetBody";

//css
import "../styles/Layouts.css";

const EditPet = ({ route, openAlert, sessionToken }) => {
  //get params from url
  let { id, name, desc, type } = useParams();

  //react router history used to redirect to route
  const history = useHistory();

  //model states
  const [petType, setPetType] = useState(type);
  const [petName, setPetName] = useState(name);
  const [description, setDescription] = useState(desc);

  //loading state
  const [loading, setLoading] = useState(false);

  //send image to cloudinary if image is new and post data to backend server
  const handleSubmit = async (e) => {
    setLoading(true);

    fetch(`http://localhost:3001/pet/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        type: petType,
        description: description,
      }),
      headers: new Headers({
        "content-type": "application/json",
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json)
      .then((json) => {
        setLoading(false);
        openAlert("success");
      })
      .catch((err) => {
        setLoading(false);
        openAlert("error");
      });

    history.push("/");
  };

  return (
    <div className="create-post">
      <EditHeader
        route={route}
        id={id}
        name={name}
        desc={desc}
        handleSubmit={handleSubmit}
      />

      <PetBody petName={petName} petType={petType} description={description} />

      {loading ? <CircularProgress /> : null}
    </div>
  );
};

export default EditPet;
