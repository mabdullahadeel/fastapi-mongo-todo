import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { AuthProvider, AuthConsumer } from "./context/JWTAuthContext";
import { Spinner, Flex } from "@chakra-ui/react";
import { PublicRoute } from "./components/Auth/PublicRoute";
import { Authenticated } from "./components/Auth/Authenticated";
import { Navbar } from "./components/Navbar/Navbar";
import { TodoList } from "./components/Todo/TodoList";
import { TodoDetail } from "./components/Todo/TodoDetail";

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
                  <Route
                    path="/login"
                    element={
                      <PublicRoute>
                        <Login />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <PublicRoute>
                        <Register />
                      </PublicRoute>
                    }
                  />
                  {/* Authenticated Routes */}
                  <Route path="/" element={<Navbar />}>
                    <Route
                      index
                      element={
                        <Authenticated>
                          <TodoList />
                        </Authenticated>
                      }
                    />
                    <Route
                      path="/:todoId"
                      element={
                        <Authenticated>
                          <TodoDetail />
                        </Authenticated>
                      }
                    />
                  </Route>
                  <Route path="*" element={<Navigate to="/" replace />} />
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
