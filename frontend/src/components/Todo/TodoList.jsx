import { useState, useEffect, useRef } from "react";
import {
  Button,
  Container,
  Spinner,
  Flex,
  Center,
  Box,
} from "@chakra-ui/react";
import { AddTodoModal } from "./AddTodoModal";
import axiosInstance from "../../services/axios";
import { TodoCard } from "./TodoCard";

export function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    fetchTodos();
    isMounted.current = true;
  }, []);

  const fetchTodos = () => {
    setLoading(true);
    axiosInstance
      .get("/todo/")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container mt={9}>
      <AddTodoModal onSuccess={fetchTodos} />
      {loading ? (
        <Center mt={6}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="green.200"
            color="green.500"
            size="xl"
          />
        </Center>
      ) : (
        <Box mt={6}>
          {todos?.map((todo) => (
            <TodoCard todo={todo} key={todo.todo_id} />
          ))}
        </Box>
      )}
    </Container>
  );
}
