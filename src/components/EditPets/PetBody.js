import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { TextField } from "@material-ui/core";

//components
import PetTypes from "./PetTypes";

//css
import "./styles/PetBody.css";



const PetBody = ({ setName, name, setType, type, sessionToken,/* setDescription */ }) => {

    //model states
    const [petType, setPetType] = useState();
    const [petName, setPetName] = useState();
    const [description, setDescription] = useState();
  
  let { id } = useParams();

    //get data for pet
    useEffect(() => {
      fetch(`http://localhost:3001/pet/${id}`, {
        method: "GET",
        headers: new Headers({
          authorization: sessionToken,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          setPetName(json.pet.name);
          setPetType(json.pet.type);
          setDescription(json.pet.description);
        })
        .catch((err) => console.log(err));
    });
  
  
  
  
  
  
  
  
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
            onChange={(e) => setDescription(e.target.value)}
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
