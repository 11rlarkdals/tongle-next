"use client";
import React, { useState, useEffect } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { createTodoFatch } from "@/utils/fatch/createTodosFatch";
import { doneTodosFatch } from "@/utils/fatch/doneTodoFatch";
import { removeTodosFatch } from "@/utils/fatch/removeTodoFatch";
import { todosFatch } from "@/utils/fatch/todosFatch";
import Layout from "@/components/layout";
import Modal from "@/components/modals/modal";

interface TodoType {
  id: number;
  title: string;
  isDone: boolean;
  subTitle: string;
}

const Todos = () => {
  const [showModal, setShowModal] = useState(false);
  const [newTodoInput, setNewTodoInput] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");
  const [todos, setTodos] = useState<TodoType[]>([]);

  const addButtonHandle = async () => {
    if (newTodoInput.trim() !== "") {
      const newTodo = await createTodoFatch({ title: newTodoInput });
      setNewTodoInput("");
      if (newTodo) {
        setTodos([
          ...todos,
          { id: newTodo.id, title: newTodo.title, isDone: false, subTitle },
        ]);
        setShowModal(false);
      }
    }
  };

  const enterAddHandle = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addButtonHandle();
    }
  };

  // 삭제 처리 함수
  const deleteHandle = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // 클릭 이벤트가 부모로 전파되지 않도록 막음
    console.log("Deleting todo with id:", id);

    // 클라이언트에서 먼저 삭제 UI 업데이트
    const filtered = todos.filter((todo) => todo.id !== id);
    setTodos(filtered);

    // 서버에서 삭제 처리
    removeTodosFatch({ id });
  };

  const doneHandle = (id: number) => {
    const editTodos = todos.map((todo) => {
      if (todo.id === id) {
        doneTodosFatch({ id, isDone: !todo.isDone });
        return { ...todo, isDone: !todo.isDone };
      }
      return todo;
    });
    setTodos(editTodos);
  };

  return (
    <Layout mobileFootLess={true}>
      <div className="w-full flex-col h-[642px] flex items-center">
        {showModal && (
          <Modal setShowModal={setShowModal}>
            <div className="w-[600px] h-[500px] bg-slate-950 p-10  rounded-lg">
              <div className="bg-white/30  to-transparent h-full rounded-xl">
                <div className="border border-slate-950 h-full rounded-xl">
                  <div className="flex justify-center mb-2 text-[20px] mt-10">
                    <label htmlFor="title" className="text-white pr-2">
                      할일
                    </label>
                    <input
                      onChange={(e) => setNewTodoInput(e.target.value)}
                      id="title"
                      type="text"
                      className="text-black"
                    />
                  </div>
                  <div className="flex justify-center text-[20px]">
                    <label
                      htmlFor="title"
                      className="text-white pr-2 text-[20px]"
                    >
                      내용
                    </label>
                    <input
                      onChange={(e) => setSubTitle(e.target.value)}
                      id="title"
                      type="text"
                      className="text-black"
                    />
                  </div>
                  <div className="flex justify-center mt-auto">
                    <button
                      onClick={addButtonHandle}
                      className="p-3 px-20 bg-sky-400 rounded-xl text-white font-semibold hover:bg-sky-500 transition-all mt-48"
                    >
                      CREATE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}{" "}
        <div className="max-w-[70rem] flex flex-col">
          <div className="items-center m-5">
            <div className="flex">
              <div className="title text-[5rem] font-extrabold lg:">
                My Notes
              </div>
              <div className="" onClick={() => setShowModal(!showModal)}>
                만들다
              </div>
            </div>

            <div className="border-red-500">
              <input
                type="text"
                value={newTodoInput}
                placeholder="여기에 입력하세요"
                className="text-black text-3xl p-2 max-w-[26rem]"
                onChange={(e) => setNewTodoInput(e.target.value)}
                onKeyDown={enterAddHandle} // 엔터 키 이벤트 연결
              />
            </div>
          </div>

          <div className="text-[2rem]">
            {todos?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="relative mb-5 flex items-center justify-between"
                >
                  <div
                    onClick={() => doneHandle(item.id)}
                    className={`border w-[25rem] cursor-pointer text-white ml-5 p-2 flex items-center justify-between ${
                      item.isDone && "line-through opacity-50"
                    }`}
                  >
                    <div>{item.title}</div>

                    <FaDeleteLeft
                      onClick={(e) => deleteHandle(e, item.id)}
                      className="top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
                    />
                  </div>
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
