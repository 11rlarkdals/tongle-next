import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export const todosFatch = async ({
  setTodos,
}: {
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
}) => {
  const token = localStorage.getItem("qid");
  if (token) {
    const response = await axios.get("http://localhost:8000/getTodos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTodos(response.data.todos);
  }
};
