//send image to cloudinary and post data to backend server
export const uploadImg = async (
  signatureUrl,
  cloudinaryUrl,
  file,
  description,
  petId,
  sessionToken
) => {
  let formData = new FormData();
  let filename = file?.name.split(".")[0];

  if (!filename) return;
  //get cloudinary security from backend
  const res = await fetch(`${signatureUrl}/${filename}`, {
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
};

export const uploadEditedImg = async (
  signatureUrl,
  cloudinaryUrl,
  file,
  description,
  petId,
  postId,
  sessionToken
) => {
  let formData = new FormData();
  let filename = file.name.split(".")[0];

  const res = await fetch(`${signatureUrl}/${filename}`, {
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

  await fetch(`http://localhost:3001/post/${postId}`, {
    method: "PUT",
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
};
