import type { RegistrationData } from "@/pages/Users/Insert/Insert.types";
import apiClient from "../api/apiClient";
import { MOCK_PATH } from "@/constants/api";
import type { RegistrationResult, UserStatusResult, UsersResult } from "./types";

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

export const getUsers = async (params?: Record<string, unknown>): Promise<UsersResult[]> => {
  const { data } = await apiClient.get('/api/users', { params });
  return data;
};

export const deleteUser = async (userId: number): Promise<UsersResult[]> => {
  const { data } = await apiClient.delete(`/api/users/${userId}`);
  return data;
};