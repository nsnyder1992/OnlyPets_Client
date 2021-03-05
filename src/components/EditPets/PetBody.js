import { Grid, TextField } from "@material-ui/core";

//components
import PetTypes from "./PetTypes";

//css
import "./styles/PetBody.css";

const PetBody = ({
  setName,
  name,
  setDescription,
  setType,
  type,
  description,
}) => {
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
