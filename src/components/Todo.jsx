import axios from "axios";
import React, { useState, useEffect } from "react";

const Todo = () => {
  const [todoName, setTodoName] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/todo")
      .then((res) => {
        const todoData = res.data;
        const todos = [];

        for (const key in todoData) {
          todos.push({
            id: key,
            title: todoData[key].title,
          });
        }
        setTodoList(todos);
      })
      .catch((err) => console.log(err));
  });

  const inputChangeHandler = (e) => {
    setTodoName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodoList(todoList.concat(todoName));

    axios
      .post("http://localhost:3001/api/todo", {
        title: todoName,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    setTodoName("");
  };
  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="w-full max-w-screen-xl mx-auto px-6">
          <div className="flex justify-center p-4 px-3 py-10">
            <div className="w-full max-w-xl">
              <div className="bg-lime-50 shadow-md rounded-lg px-3 py-1 mb-4">
                <div className="block text-lime-700 text-lg font-semibold py-2 px-2">
                  My todo list
                </div>
                <div className="flex items-center bg-lime-200 rounded-md">
                  <div className="pl-2">
                    <svg
                      className="fill-current text-lime-500 w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        className="heroicon-ui"
                        d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                      />
                    </svg>
                  </div>

                  <input
                    className="w-full rounded-md bg-lime-200 text-lime-700 leading-tight focus:outline-none py-2 px-2"
                    id="search"
                    type="text"
                    placeholder="Inter your todo item"
                    onChange={inputChangeHandler}
                    value={todoName}
                  />
                </div>
                {todoList.map((todo) => (
                  <div className="py-3 text-sm" key={todo.id}>
                    <div className="flex justify-start cursor-pointer text-lime-700 hover:text-lime-600 hover:bg-lime-100 rounded-md px-2 py-2 my-2">
                      <span className="bg-lime-400 h-2 w-2 m-2 rounded-full"></span>
                      <div className="flex-grow font-medium px-2">
                        {todo.title}
                      </div>
                      <div className="text-sm font-normal text-lime-500 tracking-wide">
                        Pendding
                      </div>
                    </div>
                  </div>
                ))}
                <div className="block bg-lime-200 text-sm text-right py-2 px-3 my-10 -mx-3 -mb-2 rounded-b-lg">
                  <button className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="insert your todo..."
          onChange={inputChangeHandler}
          value={todoName}
        />
        <button className="">Add</button>
      </form> */}
    </div>
  );
};

export default Todo;
