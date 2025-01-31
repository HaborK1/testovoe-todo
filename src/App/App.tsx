import { useEffect, useState } from "react";
import { Form } from "../Form/Form";
import "./App.css";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type Filter = "all" | "active" | "completed";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [alltodos, setAllTodos] = useState(0);
  const [allcompleted, setAllCompleted] = useState(0);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    setAllCompleted(todos.filter((todo) => todo.done).length);
    setAllTodos(todos.length);
  }, [todos]);

  const putTodo = (value: string) => {
    if (value) {
      setTodos([...todos, { id: Date.now(), text: value, done: false }]);
    } else {
      alert("Введите задачу");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return { ...todo, done: !todo.done };
      })
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearTodos = () => {
    setTodos([]);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") {
      return !todo.done;
    } else if (filter === "completed") {
      return todo.done;
    }
    return true;
  });

  return (
    <div className="wrapper">
      <div className="container">
        <h1 className="title">ToDo</h1>
        <Form putTodo={putTodo} />
        <div className="filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            Все задачи
          </button>
          <button
            className={filter === "active" ? "active" : ""}
            onClick={() => setFilter("active")}
          >
            Невыполненные
          </button>
          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Выполненные
          </button>
        </div>
        <ul className="todos">
          {filteredTodos.map((todo) => (
            <li
              className={todo.done ? "todo done" : "todo"}
              key={todo.id}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
              <img
                onClick={(e) => {
                  e.stopPropagation();
                  removeTodo(todo.id);
                }}
                className="delete"
                src="../../public/delete.svg"
                alt="delete"
              />
            </li>
          ))}
          <div className="info">
            <span>Все задачи: {alltodos}</span>
            <span>Выполненные: {allcompleted}</span>
          </div>
          <button className="clear" onClick={clearTodos}>
            Очистить все
          </button>
        </ul>
      </div>
    </div>
  );
}

export default App;
