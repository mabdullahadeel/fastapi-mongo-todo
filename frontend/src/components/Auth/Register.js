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

function Register() {
  const [isLoading, setIsLoading] = useState(false);
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
        <Heading mb={6}>Register</Heading>
        <form>
          <Input
            placeholder="Email"
            background={useColorModeValue("gray.300", "gray.600")}
            type="email"
            variant="filled"
            size="lg"
            mb={6}
          />
          <Input
            placeholder="username"
            background={useColorModeValue("gray.300", "gray.600")}
            type="text"
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
            isLoading={isLoading}
            width="100%"
            colorScheme="green"
            variant="outline"
            mb={6}
          >
            Register
          </Button>
        </form>
        <ThemeToggeler mb={6} showLabel={true} />
        <Button
          width="100%"
          colorScheme="gray"
          variant="outline"
          mb={6}
          onClick={() => navigate("/login", { replace: true })}
        >
          Login Instead
        </Button>
      </Flex>
    </Flex>
  );
}

export default Register;
