import { Select, FormControl, MenuItem } from "@material-ui/core";

//css
import "./styles/PetTypes.css";

const PetTypes = ({ type, setType }) => {
  // handles selection logic for petType
  return (
    <FormControl id="type-select-form">
      <Select
        labelId="type-label"
        id="type-select"
        disableUnderline
        value={type ? type : ""}
        onChange={(e) => setType(e.target.value)}
      >
        {/*hardcoded the below but will need to map over pet types unique in the
          future */}
        <MenuItem value="dog">Dog</MenuItem>
        <MenuItem value="cat">Cat</MenuItem>
        <MenuItem value="bird">Bird</MenuItem>
        <MenuItem value="farm">Farm</MenuItem>
        <MenuItem value="reptile">Reptile</MenuItem>
      </Select>
    </FormControl>
  );
};

export default PetTypes;
