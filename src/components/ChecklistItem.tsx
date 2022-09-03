import {
  Checkbox,
  Text,
  Spinner,
  Flex,
  Stack,
  HStack,
  Spacer,
  IconButton,
  Editable,
  EditableInput,
  EditablePreview,
  useEditableControls,
  Input,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { updateTask, changeItemName } from "../data/api";
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
        {/* <Text
          textDecorationLine={task.is_completed ? "line-through" : "none"}
          fontSize={"xl"}
        >
          {task.task_name}
        </Text> */}
        <Editable
          defaultValue={task.task_name}
          display="flex"
          isPreviewFocusable={false}
          width={"full"}
          onSubmit={newName => changeItemName(newName, task.id)}
          submitOnBlur={false}
        >
          <EditablePreview
            textDecorationLine={task.is_completed ? "line-through" : "none"}
            fontSize="xl"
            flexGrow={1}
          />
          <Input as={EditableInput} variant="flushed" fontSize={"xl"} />
          <EditableControls />
        </Editable>
        <IconButton
          aria-label="delete checklist item"
          icon={<DeleteIcon />}
          variant="link"
        />
      </HStack>
    </>
  );
}

function EditableControls() {
  const {
    isEditing,
    getEditButtonProps,
    getCancelButtonProps,
    getSubmitButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <>
      <IconButton
        icon={<CheckIcon />}
        {...getSubmitButtonProps()}
        aria-label="save edit"
        variant={"link"}
      />
      <IconButton
        icon={<CloseIcon />}
        {...getCancelButtonProps()}
        aria-label="cancel edit"
        variant={"link"}
      />
    </>
  ) : (
    <IconButton
      aria-label="delete checklist item"
      icon={<EditIcon />}
      variant="link"
      {...getEditButtonProps()}
    />
  );
}

export default ChecklistItem;
