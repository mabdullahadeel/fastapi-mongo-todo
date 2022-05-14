import { useState } from "react";
import {
  Flex,
  Heading,
  Button,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import ThemeToggeler from "../Theme/ThemeToggler";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex
        direction="column"
        alignItems="center"
        background={useColorModeValue("gray.100", "gray.700")}
        p={12}
        rounded={6}
      >
        <Heading mb={6}>Login</Heading>
        <Input
          placeholder="Email"
          background={useColorModeValue("gray.300", "gray.600")}
          type="email"
          variant="filled"
          size="lg"
          mb={6}
        />
        <Input
          placeholder="Password"
          background={useColorModeValue("gray.300", "gray.600")}
          type="password"
          variant="filled"
          size="lg"
          mb={6}
        />
        <Button
          isLoading={loading}
          loadingText="Logging in..."
          width="100%"
          colorScheme="green"
          variant="outline"
          mb={6}
        >
          Login
        </Button>
        <ThemeToggeler mb={6} showLabel={true} />
        <Button
          width="100%"
          colorScheme="gray"
          variant="outline"
          mb={6}
          onClick={() => navigate("/register", { replace: true })}
        >
          Register Instead
        </Button>
      </Flex>
    </Flex>
  );
}

export default Login;
