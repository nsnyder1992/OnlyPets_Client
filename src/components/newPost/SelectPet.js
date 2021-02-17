import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

import "./styles/SelectPet.css";

const SelectPet = ({ pets, petId, setPetId }) => {
  return (
    <div className="pet-select-div">
      <FormControl id="pet-select-form">
        <InputLabel id="pet-label"> </InputLabel>
        <Select
          labelId="pet-label"
          id="pet-select"
          disableUnderline
          value={petId}
          onChange={(e) => setPetId(e.target.value)}
        >
          {/*hardcoded the below but will need to map over user pets in the
          future */}
          <MenuItem value={1}>Fluffy</MenuItem>
          <MenuItem value={2}>Cindy</MenuItem>
          <MenuItem value={3}>Bruce</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectPet;
