import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { AuthProvider, AuthConsumer } from "./context/JWTAuthContext";
import { Spinner, Flex } from "@chakra-ui/react";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <AuthConsumer>
            {(auth) =>
              !auth.isInitialized ? (
                <Flex
                  height="100vh"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="green.200"
                    color="green.500"
                    size="xl"
                  />
                </Flex>
              ) : (
                <Routes path="/">
                  {/* Auth */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  {/* Application */}
                  <Route index element={<h1>Home</h1>} />
                </Routes>
              )
            }
          </AuthConsumer>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
