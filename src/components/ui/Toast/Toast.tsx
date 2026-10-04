import { useState, useCallback } from "react";
import type { IToastItem, IToastProviderProps } from "./Toast.types";
import { ToastContext } from "./Toast.context";
import ToastItem from "./ToastItem";
import type { AvailableStatusesType } from "@/types/contentsFormDatas.types";



export const ToastProvider = ({ children }: IToastProviderProps) => {
  const [toasts, setToasts] = useState<IToastItem[]>([]);

  const addToast = useCallback((msg: string, type: AvailableStatusesType) => {
    const id = Date.now();
    
    setToasts((prev) => [...prev, { id, msg, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, toasts }}>
      {children}
      
      <div style={{ position: 'fixed', bottom: 0, right: 0}}>
        {toasts.map(({id, msg, type}) => (
          <ToastItem key={id} msg={msg} type={type} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

