import { useState } from "react";
import { useParams } from "react-router-dom";

//components
import EditHeader from "./EditPosts/EditHeader";
import PostBody from "./EditPosts/PostBody";

//css
import "./styles/Layouts.css";

const EditPost = (props) => {
  let { id, desc, file } = useParams();

  //file states
  const baseUrl = "http://res.cloudinary.com/nsnyder1992/image/upload";

  const [fileUrl, setFileUrl] = useState(baseUrl + file.replace(/,/g, "/"));

  //model states
  const [petId, setPetId] = useState(id);
  const [description, setDescription] = useState(desc);

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
        pets={[]}
        petId={petId}
        setPetId={setPetId}
      />
    </div>
  );
};

export default EditPost;
