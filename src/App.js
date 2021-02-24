import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

// adding css to jsx is that easy
import "./App.css"; // This pattern is preferred where css for this component has a matching .css filename
import "fontsource-roboto";

// A component import
import Navbar from "./home/Navbar";
import Auth from "./components/SignupLogin/Auth";

// Defining our <App /> component the function name matches the file name
function App() {
  document.title = "JustPets";

  //set temporary tokens here until we get a working login!!!!
  const [sessionToken, setSessionToken] = useState();

  //everytime the app rerenders check for token in local storage
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  //updates token in local storage and in the state sessionToken
  const updateToken = (newToken, userId) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userId", parseInt(userId));
    setSessionToken(newToken);
    console.log(sessionToken);
  };

  //deletes all local storage... used mainly for logout
  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
  };

  // All functional components need to return jsx with one parent element
  return (
    <div className="App">
      {/* Parent Element. Also we can't use the word class, so we use className in jsx*/}
      {/* Navbar is our imported component*/}

      {/* 
        if no sessionToken only display login/siginup 
        else display main application
      */}
      {!sessionToken ? (
        <Auth updateToken={updateToken} />
      ) : (
        <Router>
          <Switch>
            <div>
              <Navbar sessionToken={sessionToken} clearToken={clearToken} />
            </div>
          </Switch>
        </Router>
      )}
    </div>
  );
}

// Makes our Component available for import
export default App;
