import { useState, useEffect, useRef } from "react";
import {
  useColorModeValue,
  Container,
  Text,
  Center,
  Spinner,
  Badge,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { AddTodoModal } from "./AddTodoModal";

export const TodoDetail = () => {
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);
  const { todoId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const background = useColorModeValue("gray.300", "gray.600");

  useEffect(() => {
    if (isMounted.current || !todoId) return;
    fetchTodo();
    isMounted.current = true;
  }, [todoId]);

  const fetchTodo = () => {
    setLoading(true);
    axiosInstance
      .get(`/todo/${todoId}`)
      .then((res) => {
        setTodo(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteTodo = () => {
    setLoading(true);
    axiosInstance
      .delete(`/todo/${todoId}`)
      .then(() => {
        toast({
          title: "Todo deleted",
          description: "Todo has been deleted",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/");
      })
      .catch((err) => {
        toast({
          title: "Could'nt delete todo",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  if (loading || !todo) {
    return (
      <Container mt={6}>
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="green.200"
            color="green.500"
            size="xl"
          />
        </Center>
      </Container>
    );
  }

  return (
    <>
      <Container mt={6}>
        <Button
          colorScheme="gray"
          onClick={() => navigate("/", { replace: true })}
        >
          Back
        </Button>
      </Container>
      <Container
        bg={background}
        minHeight="7rem"
        my={3}
        p={3}
        rounded="lg"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize={22}>{todo.title}</Text>
        <Text bg="gray.500" mt={2} p={2} rounded="lg">
          {todo.description}
        </Text>
        <Badge colorScheme={todo.status ? "green" : "purple"}>
          {todo.status ? "Completed" : "Pending"}
        </Badge>
        <AddTodoModal
          my={3}
          editable={true}
          defaultValues={{
            title: todo.title,
            description: todo.description,
            status: todo.status,
          }}
          onSuccess={fetchTodo}
        />
        <Button
          isLoading={loading}
          colorScheme="red"
          width="100%"
          onClick={deleteTodo}
        >
          Delete
        </Button>
      </Container>
    </>
  );
};
