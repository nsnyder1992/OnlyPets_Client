import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

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
  const tempToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJuaWNrQHRlc3QuY29tIiwiaWF0IjoxNjEzNjgyMDczLCJleHAiOjE2MTM3Njg0NzN9.AhJwMo7x28FRB4_uEvTvIQ48XUhe4v3MGP7YTRl4e3s";
  const tempToken2 =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJuaWNrMkB0ZXN0LmNvbSIsImlhdCI6MTYxMzkzOTg0OCwiZXhwIjoxNjE0MDI2MjQ4fQ.Bp_ku8Py1uTjpFsoiT83qaU5X2izcesF9IzZ8jRFQTQ";
  const [sessionToken, setSessionToken] = useState(tempToken2);

  // uncomment for login, siginup and authorization, wants we get a working login
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     setSessionToken(localStorage.getItem("token"));
  //   }
  // }, []);

  // const updateToken = (newToken) => {
  //   localStorage.setItem("token", newToken);
  //   setSessionToken(newToken);
  //   console.log(sessionToken);
  // };

  // const clearToken = () => {
  //   localStorage.clear();
  //   setSessionToken("");
  // };

  // All functional components need to return jsx with one parent element
  return (
    <div className="App">
      {/* Parent Element. Also we can't use the word class, so we use className in jsx*/}
      {/* Navbar is our imported component*/}
      <Router>
        <div>
          <Navbar sessionToken={sessionToken} />
          <Auth />
        </div>
      </Router>
    </div>
  );
}

// Makes our Component available for import
export default App;
