import { createContext } from "react";
import type { IToastContext } from "./Toast.types";

export const ToastContext = createContext<IToastContext | null>(null);
