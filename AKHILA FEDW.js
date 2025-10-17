import React, { useState, useEffect } from "react";

// Default export a single React component (fits in one file)
export default function TodoApp() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem("todos_v1");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("todos_v1", JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    const trimmed = task.trim();
    if (!trimmed) return;
    const newTodo = {
      id: Date.now(),
      text: trimmed,
      done: false,
    };
    setTodos((t) => [newTodo, ...t]);
    setTask("");
  }

  function toggleDone(id) {
    setTodos((t) => t.map((it) => (it.id === id ? { ...it, done: !it.done } : it)));
  }

  function removeTodo(id) {
    setTodos((t) => t.filter((it) => it.id !== id));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") addTodo();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-xl bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-semibold mb-4">Daily To‑Do List</h1>

        <div className="flex gap-2 mb-4">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring"
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 rounded-lg shadow-sm hover:brightness-95"
          >
            Add
          </button>
        </div>

        <div className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-gray-500">No tasks yet — add one above.</p>
          ) : (
            // Render list dynamically using map()
            todos.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => toggleDone(item.id)}
                  />
                  <span className={item.done ? "line-through text-gray-400" : ""}>
                    {item.text}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => removeTodo(item.id)} className="text-sm">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>{todos.length} task{todos.length !== 1 ? "s" : ""}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setTodos([])}
              className="underline"
            >
              Clear all
            </button>
            <button
              onClick={() => setTodos((t) => t.filter((x) => !x.done))}
              className="underline"
            >
              Remove completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
