import { useEffect, useState } from "react";

import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

//get base url of backend
import { BASEURL } from "../../context/base-url-context";

//styles
import "./styles/SelectPet.css";

const SelectPet = ({ sessionToken, setPetType, petId, setPetId }) => {
  //state that will store all the users pets
  const [pets, setPets] = useState();

  //if change to select set petId and petType
  const handleChange = (e) => {
    let petId = e.target.value;
    setPetId(petId);

    let petType;
    pets.forEach((pet) => {
      if (pet.id === petId) petType = pet.type;
    });

    setPetType(petType);
  };

  //on rendering of component get all current users pets
  useEffect(() => {
    fetch(`${BASEURL}/pet/owned`, {
      method: "GET",
      headers: new Headers({
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((pets) => {
        console.log(pets);
        setPets(pets.pets);
        setPetId(pets.pets[0].id);
        setPetType(pets.pets[0].type);
      })
      .catch((err) => console.error(err));
  }, [sessionToken]); //need the dep array here to allow the value below to be correct for some reason :/???

  return (
    <div className="pet-select-div">
      <FormControl id="pet-select-form">
        <InputLabel id="pet-label"> </InputLabel>
        <Select
          labelId="pet-label"
          id="pet-select"
          disableUnderline
          value={petId ? petId : null}
          onChange={handleChange}
        >
          {/*Map over pets displaying them and setting their id to value */}
          {pets?.map((pet, index) => {
            return (
              <MenuItem key={index} value={pet.id}>
                {pet.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectPet;
