import apiClient from "./apiClient";
import type { UserDetails, UserProfile, UpdateResponse } from "@/auth/types";

export const login = async (credentials: {username: string, password: string}): Promise<UserProfile> => {
  const { data } = await apiClient.post('/login', credentials);
  return data;
};

export const logout = async (): Promise<void> => {
  await apiClient.post('/logout');
};

export const getMe = async (): Promise<UserProfile> => {
  const { data } = await apiClient.get('/api/me');
  return data;
};

export const getMineDetails = async (): Promise<UserDetails> => {
  const { data } = await apiClient.get('/api/users/me');
  return data;
};

export const updateMineDetails = async (userData: Omit<UserDetails, 'id' | 'roles'>): Promise<UpdateResponse> => {
  const { data } = await apiClient.put('/api/users/me', userData);
  return data;
};
