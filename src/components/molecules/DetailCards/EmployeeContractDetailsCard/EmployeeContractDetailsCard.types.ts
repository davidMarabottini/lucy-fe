import type { ReactNode } from "react";
import type { ContractEmployeeAssignment } from "@/api/types";

export interface EmployeeContractDetailsCardProps {
  assignment: ContractEmployeeAssignment;
  isSelected?: boolean;
  footer?: ReactNode;
}
