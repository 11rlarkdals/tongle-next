import axios from "axios";

export const doneTodosFatch = async ({
  isDone,
  id,
}: {
  isDone: boolean;
  id: number;
}) => {
  try {
    const token = localStorage.getItem("qid");

    if (!token) {
      console.error("Token is missing!");
      return;
    }

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}updateTodo`,
      { isDone, id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Todo update response:", response.data);
  } catch (error) {
    console.error("Error updating todo:", error);
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};
