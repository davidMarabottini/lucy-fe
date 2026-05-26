import type { LibemaxEmployee } from "@/api/types";
import type { Dispatch, SetStateAction } from "react";

export interface DeleteModalProps {
  openModal: boolean,
  setOpenModal: Dispatch<SetStateAction<boolean>>,
  curEmployee: LibemaxEmployee | undefined
}