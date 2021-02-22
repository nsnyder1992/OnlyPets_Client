import { useEffect, useState } from "react";

import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

import "./styles/SelectPet.css";

const SelectPet = ({ sessionToken, petId, setPetId }) => {
  const [pets, setPets] = useState();

  useEffect(() => {
    fetch(`http://localhost:3001/pet/owned`, {
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
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="pet-select-div">
      <FormControl id="pet-select-form">
        <InputLabel id="pet-label"> </InputLabel>
        <Select
          labelId="pet-label"
          id="pet-select"
          disableUnderline
          value={petId ? petId : null}
          onChange={(e) => setPetId(e.target.value)}
        >
          {/*hardcoded the below but will need to map over user pets in the
          future */}
          {pets?.map((pet) => {
            return <MenuItem value={pet.id}>{pet.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectPet;
