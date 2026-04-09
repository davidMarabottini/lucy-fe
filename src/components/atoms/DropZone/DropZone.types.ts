import type { ClassValue } from "clsx";

export interface DropZoneProps {
  label?: string;
  accept?: string;
  handleFiles: (files: FileList) => void;
  additionalClasses?: ClassValue;
}