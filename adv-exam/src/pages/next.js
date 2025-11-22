"use client";
import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  // CREATE
  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, input]);
    setInput("");
  };

  // DELETE
  const deleteTask = (i) => {
    const updated = tasks.filter((_, idx) => idx !== i);
    setTasks(updated);
  };

  // START UPDATE
  const startEdit = (i) => {
    setEditIndex(i);
    setEditValue(tasks[i]);
  };

  // SAVE UPDATE
  const saveEdit = () => {
    if (editValue.trim() === "") return;

    const updated = tasks.map((task, i) =>
      i === editIndex ? editValue : task
    );

    setTasks(updated);
    setEditIndex(null);
    setEditValue("");
  };

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>Next.js To-Do App</h1>

      {/* Input for new task */}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task"
        style={{ padding: 8 }}
      />
      <button onClick={addTask} style={{ padding: 8, marginLeft: 5 }}>
        Add
      </button>

      <ul style={{ marginTop: 20 }}>
        {tasks.map((task, i) => (
          <li key={i} style={{ marginBottom: 10 }}>
            {editIndex === i ? (
              <>
                {/* EDIT MODE */}
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  style={{ padding: 5 }}
                />
                <button onClick={saveEdit} style={{ marginLeft: 5 }}>
                  Save
                </button>
                <button onClick={() => setEditIndex(null)} style={{ marginLeft: 5 }}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                {/* NORMAL DISPLAY */}
                {task}
                <button
                  onClick={() => startEdit(i)}
                  style={{ marginLeft: 10 }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(i)}
                  style={{ marginLeft: 5, color: "red" }}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
