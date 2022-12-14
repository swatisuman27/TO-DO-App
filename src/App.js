import React, { useState, useEffect } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { FiCircle } from "react-icons/fi";
import "./styles.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoItem, setTodoItem] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoItem) {
      setError(false);
      let uniqueId =
        new Date().getTime().toString(36) + new Date().getUTCMilliseconds();
      let newTodoItem = {
        id: uniqueId,
        todo: todoItem,
        complete: false
      };
      setTodos([newTodoItem, ...todos]);
      setTodoItem("");
    } else {
      setError(true);
      setTodoItem("");
    }
  };

  const deleteTodo = (id) => {
    let newTodos = todos.filter((todo) => todo.id !== id);
    setTodos([...newTodos]);
  };

  const toggleComplete = (id) => {
    todos.find((todo) => {
      if (todo.id === id) {
        todo.complete = !todo.complete;
      }
      return setTodos([...todos]);
    });
  };

  useEffect(() => {
    let adderror = setTimeout(() => {
      setError(false);
    }, 2000);
    return () => {
      clearTimeout(adderror);
    };
  }, [error]);

  let Today = new Date().toLocaleDateString("en-us", { weekday: "long" });
  let day = new Date().toLocaleDateString("en-us", { day: "numeric" });
  let month = new Date().toLocaleDateString("en-us", { month: "short" });

  return (
    <div className="app-container">
      <div className="header-section">
        <h4 className="header">To Do List</h4>
        <h4 className="date">{`${Today}, ${day} ${month}`}</h4>
        <div className="app-form-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={todoItem}
              className={error ? "error" : ""}
              onChange={(e) => setTodoItem(e.target.value)}
              placeholder="Type ToDo here..."
            />
            <button type="submit" className="btn">
              Add Todo
            </button>
          </form>
        </div>
      </div>
      <div className="todo-container">
        {todos.map((todoItem) => {
          const { id, todo, complete } = todoItem;
          return (
            <div key={id} className="todo-card">
              <div className="icon" onClick={() => toggleComplete(id)}>
                {!complete ? (
                  <FiCircle />
                ) : (
                  <IoIosCheckmarkCircle
                    className={complete ? "icon-done" : ""}
                  />
                )}
              </div>
              <p className={complete ? "text-done" : ""}>{todo}</p>
              <MdDeleteForever
                onClick={() => deleteTodo(id)}
                className="icon delete-icon"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
