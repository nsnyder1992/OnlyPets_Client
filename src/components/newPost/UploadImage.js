import { Button } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const UploadImage = ({ setFileUrl }) => {
  const handleFileUpload = (e) => {
    let file = e.target.files[0];
    let url = URL.createObjectURL(file);

    setFileUrl(url);
  };

  return (
    <Button
      variant="contained"
      color="default"
      startIcon={<CloudUploadIcon />}
      component="label"
    >
      Upload
      <input type="file" hidden onChange={handleFileUpload} id="file-upload" />
    </Button>
  );
};

export default UploadImage;
