import axios from "axios";

export const removeTodosFatch = async ({ id }: { id: number }) => {
  try {
    const token = localStorage.getItem("qid");

    if (!token) {
      console.error("Token is missing!");
      return;
    }

    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}removeTodo`,
      {
        params: { id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Todo removed:", response.data);
  } catch (error) {
    console.error("Error removing todo:", error);
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};
