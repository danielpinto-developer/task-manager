import React from "react";
import "./task.css";

export default function Task({ title, date, incomplete, toggleCompletion }) {
  const button = incomplete ? (
    <button id="uncheckedbox" onClick={toggleCompletion}>
      ☐
    </button>
  ) : (
    <button id="checkedbox" onClick={toggleCompletion}>
      ✅
    </button>
  );

  return (
    <div className="entries">
      <div></div>
      <div className="task-row">
        {button}
        <h1 className="task-title">{title}</h1>
        <div id="date-row">
          <h3>{date}</h3>
        </div>
      </div>
    </div>
  );
}
