import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

//components
import PostHeader from "../EditPosts/PostHeader";
import PostBody from "../EditPosts/PostBody";

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
  const [pets, setPets] = useState();

  useEffect(() => {
    if (!sessionToken) return;
    fetch(`http://localhost:3001/pet/owned`, {
      method: "GET",
      headers: new Headers({
        authorization: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((pets) => {
        console.log(pets);
        setPets(pets.pets);
        setPetId(pets.pets[0].id);
      })
      .catch((err) => console.error(err));
  }, []);

  //send image to cloudinary and post data to backend server
  const handleSubmit = async (e) => {
    const backend = "http://localhost:3001/post/cloudinary";
    const cloudinaryUrl =
      "https://api.cloudinary.com/v1_1/nsnyder1992/image/upload";
    const file = document.getElementById("file-upload").files[0];

    let formData = new FormData();
    let filename = file.name.split(".")[0];

    //get cloudinary security from backend
    const res = await fetch(`${backend}/${filename}`, {
      method: "GET",
      headers: new Headers({
        authorization: sessionToken,
      }),
    });
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

    //post to backend
    const postRes = await fetch("http://localhost:3001/post/", {
      method: "Post",
      body: JSON.stringify({
        photoUrl: cloudinaryJson.url,
        description: description,
        petId: petId,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: sessionToken,
      }),
    });
    const postJson = await postRes.json();
    console.log(postJson);
    history.push("/");
  };

  return (
    <div className="create-post">
      <PostHeader petId={petId} fileUrl={fileUrl} handleSubmit={handleSubmit} />

      <PostBody
        fileUrl={fileUrl}
        setDescription={setDescription}
        setFileUrl={setFileUrl}
        pets={pets}
        petId={petId}
        setPetId={setPetId}
      />
    </div>
  );
};

export default NewPost;
