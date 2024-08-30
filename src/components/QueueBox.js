import React from "react";
import { Box } from "@mui/material";

const QueueBox = ({ title, queue, taskColor, duration, bgColor }) => {
  return (
    <div className="queueBox">
      <p style={{ fontWeight: "bold" }}>{title}</p>
      <p>Queue List:</p>
      {queue && queue.length > 0 && (
        <div className="randomTask" style={{ margin: "0 10px" }}>
          {queue.map((task) => (
            <p key={task.id} style={{ color: taskColor }}>
              {task.value}
            </p>
          ))}
        </div>
      )}
      <p style={{ margin: "0 10px" }}>Duration:</p>
      <Box
        sx={{
          padding: "0",
          background: bgColor,
          border: "1px black",
          height: "1rem",
          width: `${duration}px`,
          transition: "all 3ms",
        }}
      ></Box>
    </div>
  );
};

export default QueueBox;
