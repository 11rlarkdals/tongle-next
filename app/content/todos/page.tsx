"use client";
import { TbCopyPlus } from "react-icons/tb";
import React, { useState } from "react";
import { RiExpandDiagonalLine } from "react-icons/ri";
import Layout from "@/components/layout";
import Modal from "@/components/modals/modal";
import todoIcons from "@/components/todos/todoIcons";
import todoColors from "@/components/todos/todoColors";

interface ITask {
  name: string;
  color: string;
  icon: keyof typeof todoIcons | undefined;
}

interface TodoType {
  id: number;
  title: string;
  isDone: boolean;
  subTitle: string;
  subTitleVisible: boolean;
}

const Todos = () => {
  const [showModal, setShowModal] = useState(false);
  const [newTodoInput, setNewTodoInput] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");

  const [task, setTask] = useState<ITask>([]);

  const [todos, setTodos] = useState<TodoType[]>([]);
  const [expendedTodo, setExpendedTodo] = useState<number | null>(null);

  // 새로운 Todo 추가
  const addButtonHandle = async () => {
    if (newTodoInput.trim() !== "") {
      const newTodo = {
        id: Date.now(), // 임시로 id는 현재 시간으로 설정
        title: newTodoInput,
        isDone: false,
        subTitle: subTitle,
        subTitleVisible: false, // 새 할 일은 처음에 서브타이틀이 보이지 않도록 설정
      };
      setTodos([...todos, newTodo]);
      setNewTodoInput("");
      setSubTitle("");
      setShowModal(false);
    }
  };

  const enterAddHandle = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addButtonHandle();
    }
  };

  const doneHandle = (id: number) => {
    const editTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      }
      return todo;
    });
    setTodos(editTodos);
  };

  // 각 할 일의 서브타이틀 보이기/숨기기 토글 함수
  const toggleSubTitle = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, subTitleVisible: !todo.subTitleVisible };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // 처음  데이터 가져오기 ㅋ

  return (
    <Layout mobileFootLess={true}>
      <div className="w-full flex-col h-[642px] flex items-center bg-slate-950">
        {showModal && (
          <Modal setShowModal={setShowModal}>
            <div className="w-96 h-96 p-6 bg-gray-800 rounded-lg">
              <div className="bg-white bg-opacity-30 rounded-xl p-6">
                <div className="mb-6">
                  <label htmlFor="title" className="text-white block mb-2">
                    할 일
                  </label>
                  <input
                    id="title"
                    type="text"
                    onChange={(e) => setNewTodoInput(e.target.value)}
                    onKeyDown={enterAddHandle}
                    className="w-full p-2 text-black rounded-md"
                    placeholder="할 일을 입력하세요"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="subtitle" className="text-white block mb-2">
                    내용
                  </label>
                  <input
                    id="subtitle"
                    type="text"
                    onChange={(e) => setSubTitle(e.target.value)}
                    className="w-full p-2 text-black rounded-md"
                    placeholder="내용을 입력하세요"
                  />
                </div>

                <div className="flex justify-center mt-4">
                  <button
                    onClick={addButtonHandle}
                    className="px-8 py-3 bg-sky-400 rounded-xl text-white font-semibold hover:bg-sky-500 transition-all"
                  >
                    CREATE
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        )}

        <div className="max-w-[70rem] ">
          <div className="items-center m-5">
            <div className="">
              <div className="title text-[5rem] font-extrabold lg:">
                My Notes
              </div>
              <TbCopyPlus
                className=""
                onClick={() => setShowModal(!showModal)}
                size={40}
              />
            </div>

            <div className="border-red-500">
              <input
                type="text"
                value={newTodoInput}
                placeholder="여기에 입력하세요"
                className="text-black text-3xl p-2 max-w-[26rem]"
                onChange={(e) => setNewTodoInput(e.target.value)}
                onKeyDown={enterAddHandle}
              />
            </div>
          </div>

          <div className="text-[2rem]">
            {todos?.map((item, index) => {
              return (
                <div key={item.id} className="relative mb-2">
                  <div className="flex items-center rounded-lg bg-slate-900">
                    <div
                      onClick={() => doneHandle(item.id)}
                      className={` w-[25rem] cursor-pointer text-white  p-2 flex items-center justify-between ${
                        item.isDone && "line-through opacity-50"
                      }`}
                    >
                      {/* 여기서 각 글자에 랜덤 색상 적용 */}
                      <div>{item.title}</div>
                    </div>

                    {item.subTitle && (
                      <RiExpandDiagonalLine
                        className="m-2 cursor-pointer text-green-600/85"
                        onClick={() => toggleSubTitle(item.id)} // 해당 Todo의 서브타이틀 보이기/숨기기
                      />
                    )}
                  </div>

                  {/* 서브타이틀 보이기 */}
                  {item.subTitleVisible && item.subTitle && (
                    <div className="text-gray-600 bg-white rounded-xl pl-2 mb-2">
                      {item.subTitle}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Todos;
