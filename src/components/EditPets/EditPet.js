import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

//material components
import CircularProgress from "@material-ui/core/CircularProgress";

//components
import EditHeader from "./EditHeader";
import PetBody from "./PetBody";

//get base url of backend
import { BASEURL } from "../../context/base-url-context";

//css
import "../styles/Layouts.css";

const EditPet = ({ route, openAlert, sessionToken }) => {
  //get params from url
  let { id } = useParams();

  //model states
  const [type, setType] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  //get data for pet
  useEffect(() => {
    fetch(`${BASEURL}/pet/${id}`, {
      method: "GET",
      headers: new Headers({
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setName(json.pet.name);
        setType(json.pet.type);
        setDescription(json.pet.description);
      })
      .catch((err) => {});
  });

  //react router history used to redirect to route
  const history = useHistory();

  //loading state
  const [loading, setLoading] = useState(false);

  //update info
  //send image to cloudinary if image is new and post data to backend server
  const handleSubmit = async (e) => {
    setLoading(true);

    fetch(`${BASEURL}/pet/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        type: type,
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
      <EditHeader route={route} handleSubmit={handleSubmit} />

      <PetBody
        name={name}
        type={type}
        description={description}
        setName={setName}
        setType={setType}
        setDescription={setDescription}
      />

      {loading ? <CircularProgress /> : null}
    </div>
  );
};

export default EditPet;
