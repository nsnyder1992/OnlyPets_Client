import { useState, useRef, useCallback } from "react";
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
  const [fileUrl, setFileUrl] = useState("");

  //states to set by form (../EditPosts/PostBody)
  const [petType, setPetType] = useState("");
  const [petId, setPetId] = useState("");
  const [description, setDescription] = useState("");

  //create a ref to be used by the file-upload input
  const fileUpload = useRef(null);

  //send image to cloudinary and post data to backend server
  const handleSubmit = async () => {
    const signatureUrl = "http://localhost:3001/post/cloudinary";
    const cloudinaryUrl =
      "https://api.cloudinary.com/v1_1/nsnyder1992/image/upload";
    const file = fileUpload.current.files[0];

    //upload to cloudinary
    const cloudinaryJson = await uploadImg(
      signatureUrl,
      cloudinaryUrl,
      file,
      sessionToken
    );

    //post to backend
    await fetch("http://localhost:3001/post/", {
      method: "Post",
      body: JSON.stringify({
        photoUrl: cloudinaryJson.url,
        description: description,
        petId: petId,
        petType: petType,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));

    history.push("/");
  };

  return (
    <div className="create-post">
      <PostHeader petId={petId} fileUrl={fileUrl} handleSubmit={handleSubmit} />

      <PostBody
        fileUrl={fileUrl}
        fileUpload={fileUpload}
        setDescription={setDescription}
        setFileUrl={setFileUrl}
        sessionToken={sessionToken}
        setPetType={setPetType}
        petId={petId}
        setPetId={setPetId}
      />
    </div>
  );
};

export default NewPost;
