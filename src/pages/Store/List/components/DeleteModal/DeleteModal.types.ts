import type { Store } from "@/api/types";
import type { Dispatch, SetStateAction } from "react";

export interface DeleteModalProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  curStore: Store;
}

// import type { Sector } from "@/api/types";
// import type { Dispatch, SetStateAction } from "react";

// export interface DeleteModalProps {
//   openModal: boolean,
//   setOpenModal: Dispatch<SetStateAction<boolean>>,
//   curSector: Sector
// }