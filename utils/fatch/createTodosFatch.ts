import axios from "axios";

export const createTodoFatch = async ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  const token = localStorage.getItem("qid");
  if (!token) {
    throw new Error("Token not found in localStorage");
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}createTodo`,
      { title, subTitle, isDone: false },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.todo;
  } catch (error: any) {
    console.error(
      "Error occurred during the request:",
      error.response || error.message
    );
    throw new Error(error.response?.data?.message || "Unknown error occurred");
  }
};
