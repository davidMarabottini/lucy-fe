import type { Dispatch, ReactNode, SetStateAction } from "react";

export interface ModalProp {
  header: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  btnList?: ReactNode[];
}