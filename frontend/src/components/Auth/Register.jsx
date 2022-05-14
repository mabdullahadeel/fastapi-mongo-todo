import {
  Flex,
  Heading,
  Button,
  Input,
  useColorModeValue,
  FormControl,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import ThemeToggeler from "../Theme/ThemeToggler";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosInstance from "../../services/axios";

function Register() {
  const navigate = useNavigate();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    axiosInstance
      .post("/users/create", values)
      .then((res) => {
        toast({
          title: "Account created successfully.",
          status: "success",
          isClosable: true,
          duration: 1500,
        });
        navigate("/login", { replace: true });
      })
      .catch((error) => {
        toast({
          title: `${error.response.data.detail}`,
          status: "error",
          isClosable: true,
          duration: 1500,
        });
      });
  }

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex
        direction="column"
        alignItems="center"
        background={useColorModeValue("gray.100", "gray.700")}
        p={12}
        rounded={6}
      >
        <Heading mt={6}>Register</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.email}>
            <Input
              placeholder="Email"
              background={useColorModeValue("gray.300", "gray.600")}
              type="email"
              variant="filled"
              size="lg"
              mt={6}
              {...register("email", {
                required: "This filed is required",
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.username}>
            <Input
              placeholder="username"
              background={useColorModeValue("gray.300", "gray.600")}
              type="text"
              variant="filled"
              size="lg"
              mt={6}
              {...register("username", {
                required: "This filed is required",
                minLength: {
                  value: 5,
                  message: "Username must be at least 5 characters",
                },
                maxLength: {
                  value: 24,
                  message: "Username must be at most 24 characters",
                },
              })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <Input
              placeholder="Password"
              background={useColorModeValue("gray.300", "gray.600")}
              type="password"
              variant="filled"
              size="lg"
              mt={6}
              {...register("password", {
                required: "This filed is required",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters",
                },
                maxLength: {
                  value: 24,
                  message: "Password must be at most 24 characters",
                },
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            isLoading={isSubmitting}
            loadingText="Creating account..."
            width="100%"
            colorScheme="green"
            variant="outline"
            mt={6}
            mb={6}
            type="submit"
          >
            Register
          </Button>
        </form>
        <ThemeToggeler showLabel={true} />
        <Button
          width="100%"
          colorScheme="gray"
          variant="outline"
          mt={6}
          onClick={() => navigate("/login", { replace: true })}
        >
          Login Instead
        </Button>
      </Flex>
    </Flex>
  );
}

export default Register;
