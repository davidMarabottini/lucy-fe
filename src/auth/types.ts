import type { AUTH_DOMAINS } from "@/constants/configuration";
import type { AvailableGendersType, AvailableRolesType, AvailableStatusesType } from "@/types/contentsFormDatas.types";
import type { ValueOf } from "@/types/utilities.types";

// export type UserProfile = string;
export type UserProfile = {
  user: string;
  id: number;
  role: AvailableRolesType[];
}

export interface AuthContextType {
  user?: string;
  id?: number;
  role?: AvailableRolesType[]
  isAuthenticated?: boolean;
  isLoading: boolean;
  domain: ValueOf<typeof AUTH_DOMAINS>
}

export type decodedToken = {
  user: string;
  role: AvailableRolesType;
  created: string;
  exp: number;
  iat: number
}

export type UserDetails = {
  email: string
  gender: AvailableGendersType
  id: number
  name: string
  roles: AvailableRolesType[]
  surname: string
  username: string
}

export type UpdateResponse = {
  status: AvailableStatusesType
  user: UserDetails
}
