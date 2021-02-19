import { BrowserRouter as Router } from "react-router-dom";

// adding css to jsx is that easy
import "./App.css"; // This pattern is preferred where css for this component has a matching .css filename
import "fontsource-roboto";

// A component import
import Navbar from "./home/Navbar";
import Auth from "./components/SignupLogin/Auth";

// Defining our <App /> component the function name matches the file name
function App() {
  // All functional components need to return jsx with one parent element
  return (
    <div className="App">
      {" "}
      {/* Parent Element. Also we can't use the word class, so we use className in jsx*/}
      {/* Navbar is our imported component*/}
      <Router>
        <div>
          <Navbar />
          <Auth />
        </div>
      </Router>
    </div>
  );
}

// Makes our Component available for import
export default App;
