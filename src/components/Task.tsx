import { Checkbox, Text } from "@chakra-ui/react";
import { useState } from "react";
import { updateTask } from "../data/api";
import { type TaskDTO } from "../data/DTOs";

interface TaskProps {
  task: TaskDTO;
  todoList: TaskDTO[];
  setTodoList: React.Dispatch<React.SetStateAction<TaskDTO[]>>;
}

function Task({ task, todoList, setTodoList }: TaskProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleCheckboxChange(isSelected: boolean, taskId: number) {
    const updatedTask = await updateTask(taskId, isSelected);
    const newTodoList = todoList.map(task => {
      return task.id === taskId ? updatedTask : task;
    });
    setTodoList(newTodoList);
  }

  return (
    <>
      <Checkbox
        key={task.id}
        isChecked={task.is_completed}
        onChange={e => handleCheckboxChange(e.target.checked, task.id)}
      >
        <Text
          textDecorationLine={task.is_completed ? "line-through" : "none"}
          fontSize={"xl"}
        >
          {task.task_name}
        </Text>
      </Checkbox>
    </>
  );
}

export default Task;
