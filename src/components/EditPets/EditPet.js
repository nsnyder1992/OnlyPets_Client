import { useState, useEffect } from "react";
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
  let { id } = useParams();

  //model states
  const [petType, setPetType] = useState();
  const [petName, setPetName] = useState();
  const [description, setDescription] = useState();



  //react router history used to redirect to route
  const history = useHistory();

  //loading state
  const [loading, setLoading] = useState(false);

  //update info
  //send image to cloudinary if image is new and post data to backend server
  const handleSubmit = async (e) => {
    setLoading(true);

    fetch(`http://localhost:3001/pet/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: petName,
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
        name={petName}
        desc={description}
        handleSubmit={handleSubmit}
      />

      <PetBody
        name={petName}
        type={petType}
        description={description}
        setName={setPetName}
        setType={setPetType}
        setDescription={setDescription}
      />

      {loading ? <CircularProgress /> : null}
    </div>
  );
};

export default EditPet;
