import axios from "axios";

export const removeTodosFatch = async ({ id }: { id: number }) => {
  const token = localStorage.getItem("qid");
  if (token) {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}removeTodo`,
        {
          data: { id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 응답 상태 확인
      if (response.status === 200) {
        console.log("Todo deleted successfully");
      } else {
        console.error("Failed to delete todo", response);
      }
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  }
};
