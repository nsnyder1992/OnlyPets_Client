import { useState } from "react";

import { Grid } from "@material-ui/core";

//components
import AddNewHeader from "./AddNewHeader";
import NewPost from "./NewPost";
import NewPet from "./NewPet";

const AddNew = ({ route, setRoute, sessionToken, openAlert }) => {
  const [viewPosts, setViewPosts] = useState(true); //true NewPost, false NewPet

  //toggle between adding a new post or pet
  const toggleView = () => {
    setViewPosts(!viewPosts);
  };

  return (
    <div className="add-new">
      <AddNewHeader toggleView={toggleView} viewPosts={viewPosts} />
      <div className="create-post-pet">
        <Grid container spacing={0}>
          <Grid item xs={2} />
          <Grid item xs={8}>
            {/* NewPost or NewPet? */}
            {viewPosts ? (
              <NewPost
                route={route}
                setRoute={setRoute}
                sessionToken={sessionToken}
                openAlert={openAlert}
              />
            ) : (
              <NewPet
                route={route}
                setRoute={setRoute}
                sessionToken={sessionToken}
                openAlert={openAlert}
              />
            )}
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </div>
    </div>
  );
};

export default AddNew;
