import { useState } from "react";

export default function ShowTodo({
  todo,
  handleComplete,
  handleDelete,
  setTodos,
  todos,
}) {
  const [isEditable, setIsEditable] = useState(false);
  const [input, setInput] = useState("");
  const handleUpdate = (value) => {
    setInput(value);
    setIsEditable(true);
  };
  const handleUpdateChanges = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, value: input };
      }
      return todo;
    });
    setTodos(newTodos);
    setIsEditable(false);
  };
  return (
    <div key={todo.id} style={{ marginLeft: "1rem" }}>
      {todo.isCompleted ? (
        <span style={{ textDecoration: "line-through" }}>{todo.value}</span>
      ) : (
        <>
          {isEditable ? (
            <span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </span>
          ) : (
            <span>{todo.value}</span>
          )}
        </>
      )}
      <span
        onClick={() => handleComplete(todo.id)}
        style={{ marginLeft: "1rem" }}
      >
        ✔️
      </span>
      <span onClick={() => handleDelete(todo.id)}>❌</span>
      <span style={{ marginLeft: "1rem" }}>
        {isEditable ? (
          <button onClick={() => handleUpdateChanges(todo.id)}>Done</button>
        ) : (
          <button onClick={() => handleUpdate(todo.value)}>Edit</button>
        )}
      </span>
    </div>
  );
}
