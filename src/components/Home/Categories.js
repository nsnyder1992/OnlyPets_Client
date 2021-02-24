import { Select, FormControl, MenuItem } from "@material-ui/core";

//css
import "./styles/Categories.css";

const Categories = ({ type, setType }) => {
  //handles setting hte petType for server endpoint
  const handleClick = (e) => {
    setType(e.target.value);
    localStorage.setItem("petType", e.target.value);
  };

  return (
    <FormControl id="cat-select-form">
      <Select
        labelId="cat-label"
        id="cat-select"
        disableUnderline
        value={type}
        onChange={handleClick}
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
