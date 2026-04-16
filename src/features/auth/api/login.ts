import { baseApi } from '../../../shared/api/base';

interface LoginPayload {
  phone: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user?: {
    id: string | number;
    phone: string;
    name?: string;
  };
}

export const loginRequest = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await baseApi.post<LoginResponse>('/auth/login', payload);
  return data;
};
