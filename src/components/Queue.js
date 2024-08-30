import React from "react";
import QueueBox from "./QueueBox";

const Queue = ({
  highPriorityTask,
  highPriorityDuration,
  regular1Duration,
  regular2Duration,
  regular3Duration,
  regularTask1,
  regularTask2,
  regularTask3,
}) => {
  return (
    <div className="queue">
      <QueueBox
        title="High Priority Queue 1"
        queue={highPriorityTask}
        taskColor="red"
        bgColor="rgb(218, 76, 76)"
        duration={highPriorityDuration}
      />
      <QueueBox
        title="Regular Queue 2"
        queue={regularTask1}
        taskColor="black"
        bgColor="rgb(218, 76, 76)"
        duration={regular1Duration}
      />
      <QueueBox
        title="Regular Queue 3"
        queue={regularTask2}
        taskColor="black"
        bgColor="rgb(218, 76, 76)"
        duration={regular2Duration}
      />
      <QueueBox
        title="Regular Queue 4"
        queue={regularTask3}
        taskColor="black"
        bgColor="rgb(218, 76, 76)"
        duration={regular3Duration}
      />
    </div>
  );
};

export default Queue;
