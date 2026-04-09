import type { LibemaxClient } from "@/api/clientService";
import type { Dispatch, SetStateAction } from "react";

export interface DeleteModalProps {
  openModal: boolean,
  setOpenModal: Dispatch<SetStateAction<boolean>>,
  curClient: LibemaxClient
}