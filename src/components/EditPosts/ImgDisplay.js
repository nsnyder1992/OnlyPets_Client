import { CardMedia, Paper } from "@material-ui/core";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";

//css
import "./styles/ImgDisplay.css";

const ImgDisplay = ({ fileUrl }) => {
  return (
    <Paper elevation={3} className="paper">
      {fileUrl ? (
        <CardMedia component="img" src={fileUrl} />
      ) : (
        // inline-styles needed here
        <ImageOutlinedIcon style={{ fontSize: 100 }} />
      )}
    </Paper>
  );
};

export default ImgDisplay;
