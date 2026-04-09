import type { WorkActivity } from "@/api/workActivityService";
import type { Dispatch, SetStateAction } from "react";

export interface DeleteModalProps {
  openModal: boolean,
  setOpenModal: Dispatch<SetStateAction<boolean>>,
  curWorkActivity: WorkActivity
}