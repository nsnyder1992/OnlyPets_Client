import { useEffect, useState } from "react";
import { Route, Link, Switch } from "react-router-dom";

//material components
import { IconButton } from "@material-ui/core";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

//components
import Home from "../components/Home/Home";
import AddNew from "../components/AddNew/AddNew";
import EditPost from "../components/EditPosts/EditPost";
import EditPet from "../components/EditPets/EditPet";
import YourPets from "../components/YourPets/YourPets";
import AddCreditCard from "../components/AddCreditCard/AddCreditCard";
import ProfilePanel from "./ProfilePanel";
import Alert from "./Alert";

//context
import { AlertContext, alerts } from "../context/alert-context";

//css
import "./styles/Navbar.css";

// Function name matches file name
const Navbar = ({ sessionToken, clearToken }) => {
  //states
  const [route, setRoute] = useState("/"); //where are we in relation to "/"

  //profile panel states
  const [drawerState, setDrawerState] = useState({ right: false }); //is profilePanel displayed
  const [userName, setUsername] = useState(); //whose the user?

  //open in close profilePanel
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerState({ ...drawerState, right: open });
  };

  //const handle open/close of alerts
  const [alert, setAlert] = useState(alerts.close);

  const closeAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(alerts.close);
  };

  const openAlert = (alertType) => {
    let alertObj = alerts.close;

    if (alertType === "error") alertObj = alerts.error;
    if (alertType === "success") alertObj = alerts.success;

    alertObj.closeAlert = closeAlert;
    setAlert(alertObj);
  };

  //on change in sessionToken update userName state above
  useEffect(() => {
    if (sessionToken) {
      fetch(`http://localhost:3001/user/self`, {
        method: "GET",
        headers: new Headers({
          authorization: sessionToken,
        }),
      })
        .then((res) => res.json())
        .then((user) => {
          setUsername(user.username);
        })
        .catch((err) => console.log(err));
    }
  }, [sessionToken]);

  // return must have one parent element
  return (
    <header>
      <ProfilePanel
        sessionToken={sessionToken}
        userName={userName}
        clearToken={clearToken}
        toggleDrawer={toggleDrawer}
        state={drawerState}
      />
      <AlertContext.Provider value={alert}>
        <Alert />
      </AlertContext.Provider>

      <div className="navbar">
        <nav>
          <Link to="/">
            <IconButton>
              <HomeOutlinedIcon style={{ fontSize: 30 }} />
            </IconButton>{" "}
          </Link>

          <Link to="/post">
            <IconButton>
              <AddBoxOutlinedIcon style={{ fontSize: 30 }} />
            </IconButton>
          </Link>

          <IconButton onClick={toggleDrawer("right", true)}>
            <PersonOutlineIcon style={{ fontSize: 30 }} />
          </IconButton>
        </nav>
      </div>
      <hr
        style={{
          width: "99%",
        }}
      />
      <div className="apps">
        <Switch>
          <Route exact path="/">
            <Home
              route={route}
              setRoute={setRoute}
              sessionToken={sessionToken}
              openAlert={openAlert}
            />
          </Route>
          <Route exact path="/post">
            <AddNew
              route={route}
              setRoute={setRoute}
              sessionToken={sessionToken}
              openAlert={openAlert}
            />
          </Route>
          <Route path="/editPost/:postId/:id/:desc/:file">
            <EditPost
              route={route}
              setRoute={setRoute}
              sessionToken={sessionToken}
              openAlert={openAlert}
            />
          </Route>
          <Route path="/editPet/:id/:name/:desc/:type">
            <EditPet
              route={route}
              setRoute={setRoute}
              sessionToken={sessionToken}
              openAlert={openAlert}
            />
          </Route>
          <Route exact path="/pet">
            <YourPets
              route={route}
              setRoute={setRoute}
              sessionToken={sessionToken}
            />
          </Route>
          <Route exact path="/editPet">
            <EditPet
              route={route}
              setRoute={setRoute}
              sessionToken={sessionToken}
              openAlert={openAlert}
            />
          </Route>
          <Route exact path="/addCard">
            <AddCreditCard
              route={route}
              setRoute={setRoute}
              sessionToken={sessionToken}
              openAlert={openAlert}
            />
          </Route>
        </Switch>
      </div>
    </header>
  );
};

// Makes it available for import
export default Navbar;
