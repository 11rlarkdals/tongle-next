import { createTodoFatch } from "@/utils/fatch/createTodosFatch";
import { doneTodosFatch } from "@/utils/fatch/doneTodoFatch";
import { removeTodosFatch } from "@/utils/fatch/removeTodoFatch";
import React, { useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";

interface TodoType {
  id: number;
  title: string;
  isDone: boolean;
}

const DropDown: React.FC = () => {
  const [newTodoInput, setNewTodoInput] = useState<string>("");
  const [todos, setTodos] = useState<TodoType[]>([]);

  const addButtonHandle = async () => {
    if (newTodoInput.trim() !== "") {
      const newTodo = await createTodoFatch({ title: newTodoInput });
      setNewTodoInput("");
      if (newTodo) {
        setTodos((prevTodos) => [
          ...prevTodos,
          { id: newTodo.id, title: newTodoInput, isDone: false },
        ]);
      }
    }
  };

  return (
    <div>
      <div className="border-red-500">
        <input
          type="text"
          value={newTodoInput}
          placeholder="여기에 입력하세요"
          className="text-black text-3xl p-2 max-w-[26rem]"
          onChange={(e) => setNewTodoInput(e.target.value)}
        />
        <button
          className="border bg-white text-black m-2 p-2 rounded-lg"
          onClick={addButtonHandle}
        >
          추가
        </button>
      </div>
      {/* <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <span>{todo.title}</span>
            <button onClick={() => doneHandle(todo.id)}>Done</button>
            <FaDeleteLeft onClick={() => deleteHandle(todo.id)} />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default DropDown;
