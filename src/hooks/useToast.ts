import { ToastContext } from "@/components/organisms/Toast/Toast.context";
import { useContext } from "react";

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast deve essere utilizzato all'interno di un ToastProvider");
  }

  return {
    addToast: context.addToast,
  };
};