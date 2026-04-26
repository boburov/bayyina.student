import { baseApi } from '../../../shared/api/base';

export interface LeadPayload {
  firstName: string;
  phone: number;
  gender: 'male' | 'female';
  age: number;
  profession: string;
  source: string;
  interest: string;
}

export const createLead = async (data: LeadPayload): Promise<void> => {
  await baseApi.post('/leads', data);
};
