import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const SelectPet = ({ pets, petId, setPetId }) => {
  return (
    <FormControl>
      <InputLabel id="pet-label">Pet</InputLabel>
      <Select
        labelId="pet-label"
        id="pet-select"
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
  );
};

export default SelectPet;
