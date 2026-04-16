import { baseApi } from '../../../shared/api/base';

export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  phone: number;
  role: string;
  telegramId?: string;
  gender?: string;
  age?: number;
  source?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProfileResponse {
  user: UserProfile;
  code: string;
  message: string;
}

export const getProfile = async (): Promise<UserProfile> => {
  const { data } = await baseApi.get<ProfileResponse>('/auth/profile');
  return data.user;
};
