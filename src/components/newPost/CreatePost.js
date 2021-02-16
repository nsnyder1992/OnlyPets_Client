import { useState } from "react";
import { Button, CardMedia, makeStyles, Paper } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";

//components
import UploadImage from "./UploadImage";
import SelectPet from "./SelectPet";

//css
import "./CreatePost.css";

//styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignContent: "Center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(50),
    },
    CardMedia: {
      minHeight: theme.spacing(10),
    },
  },
}));

const CreatePost = () => {
  //styles
  const classes = useStyles();

  //file states
  const [fileUrl, setFileUrl] = useState();

  //model states
  const [petId, setPetId] = useState(1);
  const [description, setDescription] = useState();

  //send image to cloudinary and post data to backend server
  const handleSubmit = async (e) => {
    const backend = "http://localhost:3001/post/cloudinary";
    const cloudinaryUrl =
      "https://api.cloudinary.com/v1_1/nsnyder1992/image/upload";
    const file = document.getElementById("file-upload").files[0];

    let formData = new FormData();
    let filename = file.name.split(".")[0];

    //get cloudinary security from backend
    const res = await fetch(`${backend}/${filename}`);
    const json = await res.json();

    //set form data
    formData.append("file", file);
    formData.append("api_key", json.key);
    formData.append("timestamp", json.timestamp);
    formData.append("folder", json.folder);
    formData.append("public_id", json.public_id);
    formData.append("signature", json.signature);

    //post to cloudinary and get url for storage
    const cloudinaryRes = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    });
    const cloudinaryJson = await cloudinaryRes.json();

    const postRes = await fetch("http://localhost:3001/post/", {
      method: "Post",
      body: JSON.stringify({
        photoUrl: cloudinaryJson.url,
        description: description,
        petId: petId,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    const postJson = await postRes.json();
    console.log(postJson);
  };

  return (
    <form className={classes.root} id="post-form">
      <SelectPet pets={[]} petId={petId} setPetId={setPetId} />

      <Paper elevation={3}>
        {fileUrl ? (
          <CardMedia component="img" src={fileUrl} />
        ) : (
          <ImageOutlinedIcon style={{ fontSize: 100 }} />
        )}
      </Paper>

      <input
        id="description-textarea"
        placeholder="Add a Description..."
        multiline
        onChange={(e) => setDescription(e.target.value)}
      />

      <UploadImage setFileUrl={setFileUrl} />

      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
        disabled={petId && fileUrl ? false : true}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </form>
  );
};

export default CreatePost;
