import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import Stack from "../Stack/Stack";
import styles from "./Modal.module.scss";
import { type ModalProp } from "./Modal.types";

export const Modal = ({ header, children, btnList, open, setOpen }: ModalProp) => {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles["c-modal__backDrop"]} />
        
        <Dialog.Content className={styles["c-modal__main"]}>
          <div className={styles["c-modal__header"]}>
            <Dialog.Title>{header}</Dialog.Title>
            
            <Dialog.Close asChild>
              <button 
                className={styles["c-modal__close-btn"]} 
                aria-label="Chiudi modale"
              >
                <X className={styles["c-modal__icon-close"]} />
              </button>
            </Dialog.Close>
          </div>
          
          <div className={styles["c-modal__body"]}>
            {children}
          </div>
          
          {btnList && (
            <div className={styles["c-modal__footer"]}>
              <Stack direction="row" spacing="md" additionalClassName={styles["c-modal__stack"]}>
                {...btnList}
              </Stack>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
