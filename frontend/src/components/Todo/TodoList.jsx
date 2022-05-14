import { Button, Container } from "@chakra-ui/react";
import { AddTodoModal } from "./AddTodoModal";

export function TodoList() {
  return (
    <Container mt={9}>
      <AddTodoModal />
    </Container>
  );
}
