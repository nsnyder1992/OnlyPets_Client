import { Grid } from "@material-ui/core";

//components
import UploadImage from "./UploadImage";
import SelectPet from "./SelectPet";
import ImgDisplay from "./ImgDisplay";

//css
import "./styles/PostBody.css";

const PostBody = ({
  fileUrl,
  fileUpload,
  description,
  setDescription,
  setFileUrl,
  sessionToken,
  setPetType,
  petId,
  setPetId,
}) => {
  //form for entering data to be submitted
  return (
    <form id="post-form">
      <ImgDisplay fileUrl={fileUrl} className="row" />

      <input
        id="description-textarea"
        placeholder="Add a Description..."
        value={description ? description : null}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="row">
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <UploadImage setFileUrl={setFileUrl} fileUpload={fileUpload} />
          </Grid>
          <Grid item xs={2}>
            {/* Pets displayed are only the users pets */}
            <SelectPet
              sessionToken={sessionToken}
              setPetType={setPetType}
              petId={petId}
              setPetId={setPetId}
            />
          </Grid>
        </Grid>
        <hr />
      </div>
    </form>
  );
};

export default PostBody;
