import { useContext } from "react";
import Register from "./auth/Register";
import axios from "axios";
import { UserContext } from "./context/UserContext";

function App() {
  axios.defaults.baseURL = "http://localhost:5000";
  axios.defaults.withCredentials = true;

  const { username } = useContext(UserContext);

  console.log(username);

  return <Register />;
}

export default App;
