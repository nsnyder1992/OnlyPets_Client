import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

//components
import PostHeader from "../EditPosts/PostHeader";
import PostBody from "../EditPosts/PostBody";

//hooks
import { uploadImg } from "../../hooks/cloudinaryHooks";

//css
import "../styles/Layouts.css";

const NewPost = ({ sessionToken }) => {
  // history
  const history = useHistory();

  //file states
  const [fileUrl, setFileUrl] = useState();

  //model states
  const [petId, setPetId] = useState();
  const [description, setDescription] = useState();

  //send image to cloudinary and post data to backend server
  const handleSubmit = async () => {
    const signatureUrl = "http://localhost:3001/post/cloudinary";
    const cloudinaryUrl =
      "https://api.cloudinary.com/v1_1/nsnyder1992/image/upload";
    const file = document.getElementById("file-upload").files[0];

    await uploadImg(
      signatureUrl,
      cloudinaryUrl,
      file,
      description,
      petId,
      sessionToken
    );
    history.push("/");
  };

  return (
    <div className="create-post">
      <PostHeader petId={petId} fileUrl={fileUrl} handleSubmit={handleSubmit} />

      <PostBody
        fileUrl={fileUrl}
        setDescription={setDescription}
        setFileUrl={setFileUrl}
        sessionToken={sessionToken}
        petId={petId}
        setPetId={setPetId}
      />
    </div>
  );
};

export default NewPost;
