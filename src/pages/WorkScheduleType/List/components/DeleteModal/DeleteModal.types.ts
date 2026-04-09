import type { WorkScheduleType } from "@/api/workScheduleTypeService";
import type { Dispatch, SetStateAction } from "react";

export interface DeleteModalProps {
  openModal: boolean,
  setOpenModal: Dispatch<SetStateAction<boolean>>,
  curType: WorkScheduleType
}