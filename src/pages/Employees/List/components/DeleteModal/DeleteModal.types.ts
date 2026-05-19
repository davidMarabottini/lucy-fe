import type { LibemaxEmployee } from "@/api/employeesService";
import type { Dispatch, SetStateAction } from "react";

export interface DeleteModalProps {
  openModal: boolean,
  setOpenModal: Dispatch<SetStateAction<boolean>>,
  curEmployee: LibemaxEmployee | undefined
}