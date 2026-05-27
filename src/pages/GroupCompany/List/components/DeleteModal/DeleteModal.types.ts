import type { GroupCompany } from "@/api/types";
import type { Dispatch, SetStateAction } from "react";

export interface DeleteModalProps {
  openModal: boolean,
  setOpenModal: Dispatch<SetStateAction<boolean>>,
  curGroupCompany: GroupCompany
}