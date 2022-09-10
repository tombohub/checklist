import Layout from "./Layout";
import { useAtom } from "jotai";
import { checklistItemsAtom, isFirstItemAtom } from "../data/store";
import { useEffect } from "react";

function Home() {
  const [checklistItems, setChecklistItems] = useAtom(checklistItemsAtom);

  /**
   * in case of back button
   */
  useEffect(() => {
    setChecklistItems([]);
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
