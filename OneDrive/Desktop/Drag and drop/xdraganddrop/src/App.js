import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [digits, setDigits] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [dragIndex, setDragIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(index));
  };

  const handleDragOver = (e, index) => {
    e.preventDefault(); // allow drop
    e.dataTransfer.dropEffect = "move";
    if (overIndex !== index) setOverIndex(index);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return reset();
    // Shift (not swap): remove the dragged item and insert it at the target.
    setDigits((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(index, 0, moved);
      return next;
    });
    reset();
  };

  const reset = () => {
    setDragIndex(null);
    setOverIndex(null);
  };

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">Drag &amp; Drop Digits</h1>
        <p className="subtitle">Drag the boxes to reorder the digits 0–9.</p>

        <div className="grid">
          {digits.map((d, index) => {
            const classes = ["box"];
            if (index === dragIndex) classes.push("dragging");
            if (index === overIndex && index !== dragIndex) classes.push("over");
            return (
              <div
                key={d}
                className={classes.join(" ")}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={reset}
              >
                {d}
              </div>
            );
          })}
        </div>

        <p className="tip">
          Tip: Try reordering to make <code>0123456789</code> or reverse it!
        </p>
      </div>
    </div>
  );
}