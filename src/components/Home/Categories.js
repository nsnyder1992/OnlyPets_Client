import { Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";

//css
import "./styles/Categories.css";

const Categories = ({ type, setType }) => {
  return (
    <FormControl id="cat-select-form">
      {/* <InputLabel id="cat-label"> </InputLabel> */}
      <Select
        labelId="cat-label"
        id="cat-select"
        disableUnderline
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        {/*hardcoded the below but will need to map over pet types unique in the
          future */}
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="dog">Dog</MenuItem>
        <MenuItem value="cat">Cat</MenuItem>
        <MenuItem value="bird">Bird</MenuItem>
        <MenuItem value="farm">Farm</MenuItem>
        <MenuItem value="reptile">Reptile</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Categories;
