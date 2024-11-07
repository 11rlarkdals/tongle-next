import axios from "axios";
import { Dispatch, SetStateAction } from "react";

// TodoType 정의
interface TodoType {
  id: number;
  title: string;
  isDone: boolean;
}

export const todosFatch = async ({
  setTodos,
}: {
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
}) => {
  try {
    // 로컬 스토리지에서 token 가져오기
    const token = localStorage.getItem("qid");

    // token이 없으면 요청을 보내지 않음
    if (!token) {
      console.error("Token is missing!");
      return; // 토큰이 없으면 요청을 보내지 않음
    }

    // API 요청 보내기
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}getTodos`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // 응답 데이터 확인 (콘솔로 확인해보세요)
    console.log("Fetched todos:", response.data);

    // 응답 데이터가 정상적이라면 todos 업데이트
    setTodos(response.data.todos);
  } catch (error) {
    // 요청 실패 시 오류 처리
    console.error("Error fetching todos:", error);
    if (axios.isAxiosError(error)) {
      // Axios 에러인 경우
      console.error("Axios error:", error.response?.data);
    } else {
      // 다른 종류의 에러 처리
      console.error("Unexpected error:", error);
    }
  }
};
