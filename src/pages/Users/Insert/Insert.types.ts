import type { AvailableGendersType } from "@/types/contentsFormDatas.types";

export type RegistrationData = {
  name?: string
  surname?: string
  // birthday?: string
  gender?: AvailableGendersType
  username?: string
  password?: string
};

export type RegistrationForm = {
  name: string
  surname: string
  gender: AvailableGendersType
  email: string
  username: string
  password: string
  repeatPassword: string
}