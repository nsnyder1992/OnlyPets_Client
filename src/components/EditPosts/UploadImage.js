import { IconButton } from "@material-ui/core";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";

const UploadImage = ({ setFileUrl }) => {
  const handleFileUpload = (e) => {
    let file = e.target.files[0];
    let url = URL.createObjectURL(file);

    setFileUrl(url);
  };

  const styles = {
    icon: {
      fontSize: 30,
    },
  };

  return (
    <div>
      <IconButton variant="contained" color="default" component="label">
        <ImageOutlinedIcon style={styles.icon} />
        <input
          type="file"
          hidden
          onChange={handleFileUpload}
          id="file-upload"
        />
      </IconButton>
    </div>
  );
};

export default UploadImage;
