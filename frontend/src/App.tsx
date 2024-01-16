import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout></Layout>} />
        <Route path="/search" element={<>Search page</>} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Router>
  );
};

export default App;
