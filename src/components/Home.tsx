import Layout from "./Layout";
import { useAtom } from "jotai";
import { checklistItemsAtom, checklistTitleAtom } from "../data/store";
import { useEffect } from "react";

function Home() {
  const [checklistItems, setChecklistItems] = useAtom(checklistItemsAtom);
  const [checklistTitle, setChecklistTitle] = useAtom(checklistTitleAtom);

  /**
   * in case of back button
   */
  useEffect(() => {
    setChecklistItems([]);
    setChecklistTitle(null);
  }, []);

  return (
    <>
      <Layout
        checklistItems={checklistItems}
        setChecklistItems={setChecklistItems}
        isFirstItem={true}
      ></Layout>
    </>
  );
}

export default Home;
