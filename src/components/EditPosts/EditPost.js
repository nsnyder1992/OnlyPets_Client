import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

//components
import EditHeader from "./EditHeader";
import PostBody from "./PostBody";

//hooks
import { uploadEditedImg } from "../../hooks/cloudinaryHooks";

//css
import "../styles/Layouts.css";

const EditPost = (props) => {
  //get params from url
  let { id, postId, desc, file } = useParams();

  //react router history used to redirect to route
  const history = useHistory();

  //urls
  const signatureUrl = "http://localhost:3001/post/cloudinary";
  const cloudinaryUrl =
    "https://api.cloudinary.com/v1_1/nsnyder1992/image/upload";
  const initFileUrl =
    "http://res.cloudinary.com/nsnyder1992/image/upload" +
    file.replace(/,/g, "/");

  //file states
  const [fileUrl, setFileUrl] = useState(initFileUrl);

  //model states
  const [petType, setPetType] = useState();
  const [petId, setPetId] = useState(id);
  const [description, setDescription] = useState(desc);

  //send image to cloudinary if image is new and post data to backend server
  const handleSubmit = async (e) => {
    //get file from input id "file-upload"
    const file = document.getElementById("file-upload").files[0];

    //if file upload send to cloudinary if not just update backend
    if (file) {
      //get cloudinary signature from backend and send to cloudinary
      const cloudinaryJson = await uploadEditedImg(
        signatureUrl,
        cloudinaryUrl,
        file,
        props.sessionToken
      );

      //update post
      await fetch(`http://localhost:3001/post/${postId}`, {
        method: "PUT",
        body: JSON.stringify({
          photoUrl: cloudinaryJson.url,
          description: description,
          petId: petId,
          petType: petType,
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          authorization: props.sessionToken,
        }),
      });

      history.push("/");
      return;
    }

    //update post but not cloudinary
    await fetch(`http://localhost:3001/post/${postId}`, {
      method: "PUT",
      body: JSON.stringify({
        photoUrl: fileUrl,
        description: description,
        petId: petId,
        petType: petType,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: props.sessionToken,
      }),
    });

    //push route back to home
    history.push("/");
  };

  return (
    <div className="create-post">
      <EditHeader
        route={props.route}
        petId={petId}
        fileUrl={fileUrl}
        handleSubmit={handleSubmit}
      />

      <PostBody
        fileUrl={fileUrl}
        description={description}
        setDescription={setDescription}
        setFileUrl={setFileUrl}
        sessionToken={props.sessionToken}
        setPetType={setPetType}
        petId={petId}
        setPetId={setPetId}
      />
    </div>
  );
};

export default EditPost;
