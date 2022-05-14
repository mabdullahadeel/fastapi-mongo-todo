import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

function App() {
  return (
    <>
      <Router>
        <Routes path="/">
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Application */}
          <Route index element={<h1>Home</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
