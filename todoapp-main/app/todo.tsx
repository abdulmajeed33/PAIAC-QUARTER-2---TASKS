"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([
    { id: uuidv4(), todoText: "todo 1", completed: false },
    { id: uuidv4(), todoText: "todo 2", completed: true },
    { id: uuidv4(), todoText: "todo 3", completed: true },
    { id: uuidv4(), todoText: "todo 4", completed: false },
  ]);


  const onClickHandler = (id: any) => {
    setTodos((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const addTodo = () => {
    const newTodo = { id: uuidv4(), todoText: todo, completed: false };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setTodo("");
  };

  const deleteTodo = (id: any) => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id
    });
    setTodos(newTodos);
  };
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <input
          className="border rounded-md p-2"
          placeholder="add todo text"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md ml-2"
          onClick={addTodo}
        >
          Add
        </button>
        <ul>
          {todos.map((elm) => {
            return (
              <li
                className="border-b py-2 flex items-center justify-between"
                key={elm.id}
              >
                <label
                  className={`${elm.completed ? "line-through text-gray-500" : ""
                    }`}
                >
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={elm.completed}
                    onChange={() => {
                      onClickHandler(elm.id);
                    }}
                  />
                  {elm.todoText}
                </label>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-md ml-2"
                  onClick={() => {
                    deleteTodo(elm.id);
                  }}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
