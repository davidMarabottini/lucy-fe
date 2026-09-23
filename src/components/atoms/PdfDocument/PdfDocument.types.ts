import type { Orientation, PageSize } from "@react-pdf/types";
import type { ClassValue } from "clsx";

export interface PdfDocumentProps {
  children: React.ReactNode;
  title?: string;
  author?: string;
  size?: PageSize;
  orientation?: Orientation;
  width?: number | string;
  height?: number | string;
  additionalClassName?: ClassValue;
}
