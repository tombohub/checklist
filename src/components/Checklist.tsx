import {
  Input,
  Stack,
  Box,
  IconButton,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAtom } from "jotai";
import {
  checklistItemsAtom,
  listUpdatedCounterAtom,
  isFirstItemAtom,
  checklistUidAtom,
} from "../data/store";
import ChecklistItem from "./ChecklistItem";
import ChecklistTitle from "./ChecklistTitle";
import {
  getChecklistItemsApi,
  addItemApi,
  createChecklistApi,
} from "../data/api";
import { type ItemModel } from "../data/DTOs";

import { useState, useRef, useEffect } from "react";
import Layout from "./Layout";

type Params = {
  uid: string;
};

function Checklist() {
  const { uid } = useParams<Params>();
  const [checklistItems, setChecklistItems] = useAtom(checklistItemsAtom);
  const [listUpdatedCounter] = useAtom(listUpdatedCounterAtom);
  const [checklistUid, setChecklistUid] = useAtom(checklistUidAtom);

  useEffect(() => {
    async function fetch() {
      if (uid) {
        const data = await getChecklistItemsApi(uid);
        data && setChecklistItems(data);
      }
    }

    fetch().catch(err => console.error(err));
  }, [listUpdatedCounter]);
  return (
    <>
      <Layout
        checklistItems={checklistItems}
        setChecklistItems={setChecklistItems}
        isFirstItem={false}
        uid={uid}
      ></Layout>
    </>
  );
}

export default Checklist;
