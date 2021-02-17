import { Grid } from "@material-ui/core";

//components
import UploadImage from "./UploadImage";
import SelectPet from "./SelectPet";
import ImgDisplay from "./ImgDisplay";

//css
import "./styles/PostBody.css";

const PostBody = ({
  fileUrl,
  setDescription,
  setFileUrl,
  pets,
  petId,
  setPetId,
}) => {
  return (
    <form id="post-form">
      <ImgDisplay fileUrl={fileUrl} className="row" />

      <input
        id="description-textarea"
        placeholder="Add a Description..."
        // className="row"
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="row">
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <UploadImage setFileUrl={setFileUrl} />
          </Grid>
          <Grid item xs={2}>
            <SelectPet pets={pets} petId={petId} setPetId={setPetId} />
          </Grid>
        </Grid>
        <hr />
      </div>
    </form>
  );
};

export default PostBody;
