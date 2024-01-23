import Resgiter from "./auth/Register";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "http://localhost:5000";
  axios.defaults.withCredentials = true;

  return <Resgiter />;
}

export default App;
