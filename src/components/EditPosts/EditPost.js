import { useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";

//material components
import CircularProgress from "@material-ui/core/CircularProgress";

//components
import EditHeader from "./EditHeader";
import PostBody from "./PostBody";

//hooks
import { uploadEditedImg } from "../../hooks/cloudinaryHooks";

//get base url of backend
import { BASEURL } from "../../context/base-url-context";

//css
import "../styles/Layouts.css";

const EditPost = (props) => {
  //get params from url
  let { id, postId, desc, file } = useParams();

  //react router history used to redirect to route
  const history = useHistory();

  //urls
  const signatureUrl = `${BASEURL}/post/cloudinary`;
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

  //loading state
  const [loading, setLoading] = useState(false);

  //create a ref to be used by the file-upload input
  const fileUpload = useRef(null);

  //send image to cloudinary if image is new and post data to backend server
  const handleSubmit = async (e) => {
    //get file from input id "file-upload"
    const file = fileUpload.current.files[0];
    try {
      setLoading(true);

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
        await fetch(`${BASEURL}/post/${postId}`, {
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
        props.openAlert("success");
        setLoading(false);
        history.push("/");
        return;
      }

      //update post but not cloudinary
      await fetch(`${BASEURL}/post/${postId}`, {
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
      setLoading(false);
      props.openAlert("success");
    } catch (err) {
      setLoading(false);
      props.openAlert("error");
    }
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
        fileUpload={fileUpload}
        description={description}
        setDescription={setDescription}
        setFileUrl={setFileUrl}
        sessionToken={props.sessionToken}
        setPetType={setPetType}
        petId={petId}
        setPetId={setPetId}
      />
      {loading ? <CircularProgress /> : null}
    </div>
  );
};

export default EditPost;
