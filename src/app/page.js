"use client";
import Task from "@/components/task";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isDatePicked, setIsDatePicked] = useState(false);
  const [sortOrderPending, setSortOrderPending] = useState("newest");
  const [sortOrderCompleted, setSortOrderCompleted] = useState("newest");

  useEffect(() => {
    if (content.length === 40 || title.length === 20) {
      alert("Your text is too long!");
    }

    document.body.style.display = "flex";
    document.body.style.flexDirection = "column";
    document.body.style.alignItems = "center";
    document.body.style.marginTop = "60px";
    document.body.style.backgroundImage = "url('image.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";

    return () => {
      document.body.style = "";
    };
  }, [content, title]);

  function formatDate(date) {
    const [year, month, day] = date.split("-");
    return `${month}/${day}/${year.slice(-2)}`;
  }

  function addTask() {
    const newTask = {
      id: uuidv4(),
      title: title,
      date: formatDate(date),
      content: content,
      incomplete: true,
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setDate("");
    setContent("");
    setIsDatePicked(false);
  }

  function toggleTaskCompletion(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, incomplete: !task.incomplete };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function sortTasks(tasks, order) {
    return tasks.slice().sort((b, a) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return order === "newest" ? dateB - dateA : dateA - dateB;
    });
  }

  const sortedPendingTasks = sortTasks(
    tasks.filter((task) => task.incomplete),
    sortOrderPending
  );
  const sortedCompletedTasks = sortTasks(
    tasks.filter((task) => !task.incomplete),
    sortOrderCompleted
  );

  return (
    <div id="body">
      <div>
        <h1 className="title">Task Prioritizer</h1>
      </div>
      <div className="info">
        <input
          className="task-inputs"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder=" ✎  Task Name"
        />
        <div className="date-input-container">
          <input
            className="task-inputs date-input"
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setIsDatePicked(true);
            }}
          />
          {!isDatePicked && (
            <span className="date-placeholder">Deadline Date</span>
          )}
          {isDatePicked && (
            <span className="date-selected">{formatDate(date)}</span>
          )}
        </div>
        <div className="all-btns">
          <button className="add-btn" onClick={addTask}>
            <strong>Add Task</strong>
          </button>
        </div>
      </div>
      {sortedPendingTasks.length > 0 && (
        <div className="pending-tasks">
          <div className="sort-container">
            <p>Pending Tasks</p>
            <select
              className="sort-dropdown"
              value={sortOrderPending}
              onChange={(e) => setSortOrderPending(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          <div className="tasks">
            {sortedPendingTasks.map((task) => (
              <Task
                {...task}
                key={task.id}
                toggleCompletion={() => toggleTaskCompletion(task.id)}
              />
            ))}
          </div>
        </div>
      )}
      {sortedCompletedTasks.length > 0 && (
        <div className="completed-tasks">
          <div className="sort-container">
            <p>Completed Tasks</p>
            <select
              className="sort-dropdown"
              value={sortOrderCompleted}
              onChange={(e) => setSortOrderCompleted(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          <div className="tasks">
            {sortedCompletedTasks.map((task) => (
              <Task
                {...task}
                key={task.id}
                toggleCompletion={() => toggleTaskCompletion(task.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
