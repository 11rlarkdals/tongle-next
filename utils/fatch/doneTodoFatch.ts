import axios from "axios";
export const doneTodosFatch = async ({
  isDone,
  id,
}: {
  isDone: boolean;
  id: number;
}) => {
  const token = localStorage.getItem("qid");
  if (token) {
    const response = await axios.patch(
      "http://localhost:8000/updateTodo",
      { isDone, id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
};
