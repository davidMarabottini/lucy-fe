import type { WorkActivity } from "@/api/types";
import type { Dispatch, SetStateAction } from "react";

export interface DeleteModalProps {
  openModal: boolean,
  setOpenModal: Dispatch<SetStateAction<boolean>>,
  curWorkActivity: WorkActivity
}