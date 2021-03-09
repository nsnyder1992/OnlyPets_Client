import { useEffect } from "react";

import { TextField } from "@material-ui/core";

//components
import PetTypes from "./PetTypes";

//get base url of backend
import { BASEURL } from "../../context/base-url-context";

//css
import "./styles/PetBody.css";

const PetBody = ({
  id,
  sessionToken,
  setName,
  name,
  setDescription,
  setType,
  type,
  description,
}) => {
  const handleDesc = (e) => {
    setDescription(e.target.value);
  };

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
  }, [sessionToken]);

  //states to store name, description and type
  return (
    <div className="container">
      <form id="pet-form">
        <div className="row">
          <TextField
            className="text-field"
            id="name"
            label="Pet Name"
            fullWidth
            value={name ? name : ""}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
        </div>
        <div className="row">
          <TextField
            className="text-field"
            id="description"
            multiline
            rows={2}
            label="Description"
            fullWidth
            value={description ? description : ""}
            onChange={handleDesc}
            variant="outlined"
          />
        </div>
        <div className="row">
          <PetTypes type={type} setType={setType} />
        </div>
      </form>
      <hr />
    </div>
  );
};

export default PetBody;
