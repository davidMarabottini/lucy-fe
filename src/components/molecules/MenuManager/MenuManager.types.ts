import type { AVAILABLE_MENUS } from "@/constants/configuration";
import type { MenuItem } from "@/constants/routes";
import type { ValueOf } from "@/types/utilities.types";
import type { ClassValue } from "clsx";
import type { ReactNode } from "react";

export type MenuItemKind = 'link' | 'action' | 'toggle';

export type MenuItemConfiguration = {[key: string]: {
  kind?: MenuItemKind;
  clickHdlr?: () => void;
  template?: (item: MenuItem) => ReactNode
}}

export interface MenuManagerProps {
  curMenu: ValueOf<typeof AVAILABLE_MENUS>;
  additionalClass?: ClassValue;
  itemClickHandler?: (key?: string) => void;
  template?: (item: MenuItem) => ReactNode;
  config?: MenuItemConfiguration;
}