import { useState } from "react";

import { TextField } from "@material-ui/core";

//components
import PetTypes from "./PetTypes";

//css
import "./styles/PetBody.css";

const PetBody = () => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState("dog");

  return (
    <div className="container">
      <form id="pet-form">
        <div className="row">
          <TextField
            className="text-field"
            id="name"
            label="Pet Name"
            fullWidth
            value={name ? name : null}
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
            value={description ? description : null}
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