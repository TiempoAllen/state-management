import React, { useState, useEffect } from "react";
import QueueBox from "./components/QueueBox";
import Button from "@mui/material/Button";

const AddTask = () => {
  const [randomTask, setRandomTask] = useState([]);
  const [highPriorityTask, setHighPriorityTask] = useState([]);
  const [regularTask1, setRegularTask1] = useState([]);
  const [regularTask2, setRegularTask2] = useState([]);
  const [regularTask3, setRegularTask3] = useState([]);
  const [highPriorityDuration, setHighPriorityDuration] = useState(0);
  const [regular1Duration, setRegular1Duration] = useState(0);
  const [regular2Duration, setRegular2Duration] = useState(0);
  const [regular3Duration, setRegular3Duration] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getLowestQueue = () => {
    const queues = [
      regularTask1.length,
      regularTask2.length,
      regularTask3.length,
    ];
    return queues.indexOf(Math.min(...queues));
  };

  const handleAddRandomTask = () => {
    const randomNumber = Math.floor(Math.random() * 200) + 1;
    const isHighPriority = Math.random() < 0.3;
    const newTask = {
      value: randomNumber,
      isHighPriority: isHighPriority,
    };
    setRandomTask([...randomTask, newTask]);
  };

  const handleAdmitTask = () => {
    if (randomTask.length !== 0) {
      const taskToAdmit = randomTask.shift();

      if (taskToAdmit.isHighPriority) {
        setHighPriorityTask([...highPriorityTask, taskToAdmit]);
        if (highPriorityDuration === 0) {
          setHighPriorityDuration(taskToAdmit.value);
        }
      } else {
        switch (currentIndex) {
          case 0:
            setRegularTask1((prev) => [...prev, taskToAdmit]);
            if (regular1Duration === 0) {
              setRegular1Duration(taskToAdmit.value);
            }
            break;
          case 1:
            setRegularTask2((prev) => [...prev, taskToAdmit]);
            if (regular2Duration === 0) {
              setRegular2Duration(taskToAdmit.value);
            }
            break;
          case 2:
            setRegularTask3((prev) => [...prev, taskToAdmit]);
            if (regular3Duration === 0) {
              setRegular3Duration(taskToAdmit.value);
            }
            break;
          default:
            break;
        }
      }
    }
  };

  const finishTasks = (durationLength, setDurationLength, queue, setQueue) => {
    if (!(durationLength <= 0)) {
      setDurationLength(durationLength - 1);
    } else {
      if (queue.length > 0) {
        queue.shift();
        setQueue([...queue]);
        if (queue.length > 0) {
          let currentDuration = queue[0].value;
          setDurationLength(currentDuration);
        } else {
          setDurationLength(0);
        }
      }
    }
  };

  useEffect(() => {
    setCurrentIndex(getLowestQueue());

    let interval = setInterval(() => {
      finishTasks(
        highPriorityDuration,
        setHighPriorityDuration,
        highPriorityTask,
        setHighPriorityTask
      );
      finishTasks(
        regular1Duration,
        setRegular1Duration,
        regularTask1,
        setRegularTask1
      );
      finishTasks(
        regular2Duration,
        setRegular2Duration,
        regularTask2,
        setRegularTask2
      );
      finishTasks(
        regular3Duration,
        setRegular3Duration,
        regularTask3,
        setRegularTask3
      );
    }, 75);

    return () => clearInterval(interval);
  }, [
    highPriorityDuration,
    highPriorityTask,
    regularTask1,
    regularTask2,
    regularTask3,
    regular1Duration,
    regular2Duration,
    regular3Duration,
  ]);

  return (
    <div className="container2">
      <div className="task">
        <Button
          variant="contained"
          sx={{
            m: 5,
          }}
          onClick={handleAddRandomTask}
        >
          Add Random Task
        </Button>
        <h1>Task Queue</h1>
        {randomTask.length > 0 && (
          <div className="randomTask">
            {randomTask.map((task, index) => (
              <p
                key={index}
                style={{ color: task.isHighPriority ? "red" : "black" }}
              >
                {task.value}
              </p>
            ))}
          </div>
        )}
        <Button
          variant="contained"
          sx={{
            m: 5,
          }}
          onClick={handleAdmitTask}
        >
          Admit Task
        </Button>
      </div>
      <div className="queue">
        <QueueBox
          title="High Priority Queue 1"
          queue={highPriorityTask}
          taskColor="red"
          duration={highPriorityDuration}
        />
        <QueueBox
          title="Regular Queue 2"
          queue={regularTask1}
          taskColor="black"
          duration={regular1Duration}
        />
        <QueueBox
          title="Regular Queue 3"
          queue={regularTask2}
          taskColor="black"
          duration={regular2Duration}
        />
        <QueueBox
          title="Regular Queue 4"
          queue={regularTask3}
          taskColor="black"
          duration={regular3Duration}
        />
      </div>
    </div>
  );
};

export default AddTask;
