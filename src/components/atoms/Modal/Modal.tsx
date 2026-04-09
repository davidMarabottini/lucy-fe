import { X } from "lucide-react";
import Stack from "../Stack/Stack";
import styles from "./Modal.module.scss";
import { type ModalProp } from "./Modal.types";

export const Modal = ({header, children, btnList, open, setOpen}: ModalProp) => {
  if(!open) return null
  
  return (
    <div className={styles["c-modal__backDrop"]}>
      <div className={styles["c-modal__main"]}>
          <div className={styles["c-modal__header"]}>
            <div>{header}</div>
            <X className={styles["c-modal__icon-close"]} onClick={() => setOpen(false)} />
          </div>
          <div className={styles["c-modal__body"]}>
            {children}
          </div>
          {btnList && <div className={styles["c-modal__footer"]}>
            <Stack direction="row" spacing="md" additionalClassName={styles["c-modal__stack"]} >
              {...btnList}
            </Stack>
          </div>}
      </div>
    </div>
  )
}