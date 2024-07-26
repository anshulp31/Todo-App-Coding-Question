import { useEffect, useState } from "react";
import ShowTodo from "./ShowTodoList";
import "../src/styles.css";

export default function TodoApp() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [input, setInput] = useState("");

  useEffect(() => {
    document.title = "You have " + todos.length + " task left";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input == "") return;
    const newTodos = todos.map((todo) => {
      return { ...todo };
    });
    newTodos.push({
      value: input,
      isCompleted: false,
      id: new Date().getTime(),
    });
    setTodos(newTodos);

    setInput("");
  };

  const handleDelete = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  const handleComplete = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });

    setTodos(newTodos);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Add task</button>
        </div>
        <div style={{ marginRight: "0.5rem" }}>
          {todos.map((todo) => (
            <ShowTodo
              todo={todo}
              key={todo.id}
              handleComplete={handleComplete}
              handleDelete={handleDelete}
              setTodos={setTodos}
              todos={todos}
            />
          ))}
        </div>
      </form>
    </div>
  );
}
