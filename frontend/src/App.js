import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes path="/">
          {/* Auth */}
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/register" element={<h1>Register</h1>} />
          {/* Application */}
          <Route index element={<h1>Home</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
