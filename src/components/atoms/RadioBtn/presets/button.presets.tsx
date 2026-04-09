import Button from "../../Button/Button";
import type { RadioOptionBase } from "../RadioBtn.types";

export const BUTTON_PRESET = {
  variant: 'ghost',
  gap: "sm",
  children: ({label}: RadioOptionBase, isSelected: boolean) => (
    <Button 
      color={isSelected ? 'primary' : 'secondary'} 
      rounded
      asChild
    >
      <div> {label} </div>
    </Button>
  )
} as const