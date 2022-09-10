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
  Fade,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { updateItemApi, changeItemNameApi, deleteItemApi } from "../data/api";
import { checklistItemsAtom, listUpdatedCounterAtom } from "../data/store";
import { SetStateAction, useAtom } from "jotai";
import { type ItemModel } from "../data/DTOs";

interface ChecklistItemProps {
  item: ItemModel;
  checklistItems: ItemModel[];
  setChecklistItems: (update: SetStateAction<ItemModel[]>) => void;
  isNewChecklist: boolean;
}

function ChecklistItem({
  item,
  checklistItems,
  setChecklistItems,
  isNewChecklist,
}: ChecklistItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [listUpdatedCounter, setListUpdatedCounter] = useAtom(
    listUpdatedCounterAtom
  );

  async function handleCheckboxChange(isSelected: boolean, itemId: number) {
    setIsUpdating(true);

    // use server state update only if it's not new checklist
    const updatedItem: ItemModel = isNewChecklist
      ? {
          id: item.id,
          is_completed: isSelected,
          task_name: item.task_name,
        }
      : await updateItemApi(itemId, isSelected);

    // update on client because checkbox is lagging if waiting for server
    const newChecklist = checklistItems.map(item => {
      return item.id === itemId ? updatedItem : item;
    });
    setChecklistItems(newChecklist);

    setListUpdatedCounter(listUpdatedCounter + 1);
    setIsUpdating(false);
  }

  async function handleDeleteItem() {
    await deleteItemApi(item.id);
  }

  return (
    <>
      <Fade in>
        <HStack>
          {isUpdating ? (
            <Spinner />
          ) : (
            <Checkbox
              isDisabled={isUpdating}
              key={item.id}
              isChecked={item.is_completed}
              onChange={e => handleCheckboxChange(e.target.checked, item.id)}
            >
              <Editable
                defaultValue={item.task_name}
                display="flex"
                isPreviewFocusable={false}
                width={"full"}
                onSubmit={newName => changeItemNameApi(newName, item.id)}
                submitOnBlur={false}
              >
                <EditablePreview
                  textDecorationLine={
                    item.is_completed ? "line-through" : "none"
                  }
                  fontSize="xl"
                  flexGrow={1}
                />
                <Input as={EditableInput} variant="flushed" fontSize={"xl"} />
                <EditableControls />
              </Editable>
            </Checkbox>
          )}
          <IconButton
            aria-label="delete checklist item"
            icon={<DeleteIcon />}
            variant="link"
          />
        </HStack>
      </Fade>
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
