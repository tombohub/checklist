import {
  Editable,
  EditableInput,
  EditablePreview,
  useEditableControls,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { changeChecklistTitleApi } from "../data/api";
import { useState } from "react";

function ChecklistTitle() {
  return (
    <>
      <Editable defaultValue="Title..." borderBottom={"1px solid gray"}>
        <EditablePreview fontSize={"3xl"} color={"GrayText"} />
        <EditableInput fontSize={"3xl"} />
      </Editable>
    </>
  );
}

export default ChecklistTitle;
