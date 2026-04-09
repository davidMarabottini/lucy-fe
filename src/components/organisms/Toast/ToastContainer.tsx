import { useContext } from "react";
import { ToastContext } from "./Toast.context";
import ToastItem from "./ToastItem";
import { createPortal } from "react-dom";

export const ToastContainer = () => {
  const context = useContext(ToastContext);
  
  if (!context || context.toasts.length === 0) return null;

  return createPortal(<div style={{ position: 'fixed' }}>
  {context.toasts.map(t => <ToastItem key={t.id} {...t} />)}
</div>, document.body)
}