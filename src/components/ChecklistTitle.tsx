import { Input } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { changeChecklistTitleHandler } from "../data/eventHandlers";
import { checklistTitleAtom } from "../data/store";

interface ChecklistTitleProps {
  uid: string | undefined;
  isFirstItem: boolean;
}

function ChecklistTitle({ uid }: ChecklistTitleProps) {
  const [title, setTitle] = useAtom(checklistTitleAtom);

  async function handleOnBlur() {
    if (title && uid) {
      await changeChecklistTitleHandler(title, uid);
    } else {
      console.error("title and uid are not set");
    }
  }

  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <Input
          placeholder="Title..."
          variant={"flushed"}
          fontSize={"3xl"}
          onChange={e => setTitle(e.target.value)}
          value={title ? title : ""}
          onBlur={handleOnBlur}
        />
      </form>
    </>
  );
}

export default ChecklistTitle;
