import type { GroupCompany } from "@/api/groupCompanyService";
import type { Dispatch, SetStateAction } from "react";

export interface DeleteModalProps {
  openModal: boolean,
  setOpenModal: Dispatch<SetStateAction<boolean>>,
  curGroupCompany: GroupCompany
}