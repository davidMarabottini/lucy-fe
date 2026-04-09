import type { RegistrationData } from "@/pages/Users/Insert/Insert.types";
import apiClient from "../api/apiClient";
import { MOCK_PATH } from "@/constants/api";
import type { AvailableRolesType, AvailableStatusesType } from "@/types/contentsFormDatas.types";

export interface RegistrationResult {
    status: AvailableStatusesType;
    "id": number,
    message: string
}

export interface UserStatusResult {
  user: {
    level: number
    nextLevelProgress: number
    rank: string
  }
  contributions: {
    mail: {
      ham: number
      spam: number
    }
    sms: {
      ham: number
      spam: number
    }
  }
  privileges: string[]
  badges: {
    id: number
    name: string
    iconName: string
  }[]
}

export interface UsersResult  {
      "email": string,
      "id": number,
      "name": string,
      "roles": AvailableRolesType[],
      "surname": string,
      "username": string
  }


export const insertUser = async (
  registration: RegistrationData
): Promise<RegistrationResult> => {
  const {data} = await apiClient.post(
    '/api/users', registration
  )

  return data
}

export const getUserStatus = async (): Promise<UserStatusResult> => {
  const { data } = await apiClient.get('/mocks/user-status.json', {baseURL: MOCK_PATH});
  return data;
};

export const getUsers = async (): Promise<UsersResult[]> => {
  const { data } = await apiClient.get('/api/users');
  return data;
};

export const deleteUser = async (userId: number): Promise<UsersResult[]> => {
  const { data } = await apiClient.delete(`/api/users/${userId}`);
  return data;
};