import { useState } from "react";

//components
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";

const CreatePost = () => {
  //file states
  const [fileUrl, setFileUrl] = useState();

  //model states
  const [petId, setPetId] = useState(1);
  const [postName, setPostName] = useState("New Post");
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
    <div className="create-post">
      <PostHeader
        petId={petId}
        fileUrl={fileUrl}
        handleSubmit={handleSubmit}
        postName={postName}
        setPostName={setPostName}
      />

      <PostBody
        fileUrl={fileUrl}
        setDescription={setDescription}
        setFileUrl={setFileUrl}
        pets={[]}
        petId={petId}
        setPetId={setPetId}
      />
    </div>
  );
};

export default CreatePost;
