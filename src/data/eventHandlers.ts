import { useAtom } from "jotai";
import { nanoid } from "nanoid";
import { createChecklistApi, addItemApi } from "./api";
import { useNavigate } from "react-router-dom";
import { checklistTitleAtom } from "./store";


export async function addFirstItemHandler(checklistTitle: string | null, itemName: string) {
    const uid = nanoid(11)
    await createChecklistApi(uid, checklistTitle)
    await addItemApi(itemName, uid)
    return uid
}

export async function addItemHandler(itemName: string, uid: string) {
    await addItemApi(itemName, uid)
}