import { Checkbox, Text, Spinner, Flex, Stack, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { updateTask } from "../data/api";
import { type TaskDTO } from "../data/DTOs";

interface ChecklistItemProps {
  task: TaskDTO;
  todoList: TaskDTO[];
  setTodoList: React.Dispatch<React.SetStateAction<TaskDTO[]>>;
  listUpdatedCounter: number;
  setListUpdatedCounter: React.Dispatch<React.SetStateAction<number>>;
}

function ChecklistItem({
  task,
  todoList,
  setTodoList,
  listUpdatedCounter,
  setListUpdatedCounter,
}: ChecklistItemProps) {
  /**
   *
   * @param isSelected
   * @param taskId
   */

  const [isUpdating, setIsUpdating] = useState(false);

  async function handleCheckboxChange(isSelected: boolean, taskId: number) {
    setIsUpdating(true);
    const updatedTask = await updateTask(taskId, isSelected);
    const newTodoList = todoList.map(task => {
      return task.id === taskId ? updatedTask : task;
    });
    setTodoList(newTodoList);
    setListUpdatedCounter(listUpdatedCounter + 1);
    setIsUpdating(false);
  }

  return (
    <>
      <HStack>
        {isUpdating ? (
          <Spinner />
        ) : (
          <Checkbox
            isDisabled={isUpdating}
            key={task.id}
            isChecked={task.is_completed}
            onChange={e => handleCheckboxChange(e.target.checked, task.id)}
          />
        )}
        <Text
          textDecorationLine={task.is_completed ? "line-through" : "none"}
          fontSize={"xl"}
        >
          {task.task_name}
        </Text>
      </HStack>
    </>
  );
}

export default ChecklistItem;
