import { useState } from "react";

import { Grid } from "@material-ui/core";

//components

//css
import "./styles/PetBody.css";

const PetBody = () => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  return (
    <form id="post-form">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <input
            id="name"
            placeholder="Add a Name..."
            value={name ? name : null}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <input
            id="description"
            placeholder="Add a Description..."
            value={description ? description : null}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <input
            id="type"
            placeholder="Add a Type..."
            value={description ? description : null}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <input
            id="money"
            placeholder="Add a Money to Subscribe..."
            value={description ? description : null}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
      </Grid>
      <hr />
      <div className="row"></div>
    </form>
  );
};

export default PetBody;
