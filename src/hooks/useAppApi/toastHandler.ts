import type { AvailableStatusesType } from "@/types/contentsFormDatas.types";
import { ERROR_KINDS, type AppError } from "./error";

export type ToastOptions = {
  successKey?: string;
  errorMap?: Partial<Record<keyof typeof ERROR_KINDS, string>>;
};

export const handleToast = (
  error: AppError | null,
  options: ToastOptions,
  addToast: (msg: string, type: AvailableStatusesType) => void,
  t: (key: string) => string
) => {
  if (!error) {
    if (options.successKey) {
      addToast(t(options.successKey), 'success');
    }
    return;
  }

  const key = options.errorMap?.[error.kind] ?? ERROR_KINDS.UNKNOWN;

  addToast(key ? t(key) : error.message, 'failure');
};
