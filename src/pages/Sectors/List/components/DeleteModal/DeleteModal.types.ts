import type { Sector } from "@/api/sectorService";
import type { Dispatch, SetStateAction } from "react";

export interface DeleteModalProps {
  openModal: boolean,
  setOpenModal: Dispatch<SetStateAction<boolean>>,
  curSector: Sector
}