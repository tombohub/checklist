import { Button, Input } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useRef } from "react";
import { changeChecklistTitleHandler } from "../data/eventHandlers";
import { checklistTitleAtom } from "../data/store";

interface ChecklistTitleProps {
  uid: string | undefined;
  isFirstItem: boolean;
}

function ChecklistTitle({ uid }: ChecklistTitleProps) {
  const [title, setTitle] = useAtom(checklistTitleAtom);
  const inputRef = useRef(null);

  async function handleOnBlur() {
    if (title && uid) {
      await changeChecklistTitleHandler(title, uid);
    } else if (!title && uid) {
      await changeChecklistTitleHandler(null, uid);
    } else {
      console.log("no title change");
    }
  }

  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    handleOnBlur();
    e.preventDefault();
    e.stopPropagation();
    inputRef.current.blur();
  }

  return (
    <>
      <form onSubmit={handleOnSubmit} noValidate>
        <Input
          placeholder="Title..."
          variant={"flushed"}
          fontSize={"3xl"}
          onChange={e => setTitle(e.target.value)}
          value={title ? title : ""}
          ref={inputRef}
        />
      </form>
    </>
  );
}

export default ChecklistTitle;
