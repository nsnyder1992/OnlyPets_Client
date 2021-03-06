import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//material components
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

//components
import AreYouSure from "../../home/AreYouSure";

const useStyles = makeStyles((theme) => ({
    popover: {
        display: "flex",
        flexDirection: "column",
    },
}));

const PetCardOptions = ({ pet, deletePost }) => {
    const classes = useStyles();
    //states to set petName and edit url data
    const [urlArray, setUrlArray] = useState(); //this helps with querying edit url
    const [open, setOpen] = useState(false);

    //open/close are you sure
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const action = () => {
        deletePost(pet.id, pet);
    };

    //on change in [post] update urlArray states
    //added post to dependencies now urlArray updates after a delete

    return (
        <div>
            <AreYouSure
                open={open}
                handleClose={handleClose}
                action={action}
                title="Delete Post"
                message={`Are you sure you want to delete your pet?`}
                cancelText="No"
                cancelColor="secondary"
                confirmText="Yes"
                confirmColor="primary"
            />
            <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                    <div>
                        <IconButton
                            aria-label="settings"
                            disabled={
                                // if user !== owner disable button
                                pet.userId !== parseInt(localStorage.getItem("userId"))
                            }
                            {...bindTrigger(popupState)}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Popover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "center",
                            }}
                            className={classes.popover}
                        >
                            {/* Edit and delete post */}
                            <Box p={2} className={classes.popover}>
                                {/* edit post url with queries */}
                                <Link
                                    // empty post.description causes a problem here
                                    to={`/editPet/${pet.id}`}
                                    style={{ textDecoration: "none" }}
                                >
                                    <IconButton>
                                        <EditOutlinedIcon color="primary" />
                                    </IconButton>
                                </Link>
                                {/* delete post from postData.post and server/DB */}
                                <IconButton onClick={handleOpen}>
                                    <DeleteForeverOutlinedIcon color="secondary" />
                                </IconButton>
                            </Box>
                        </Popover>
                    </div>
                )}
            </PopupState>
        </div>
    );
};

export default PetCardOptions;
