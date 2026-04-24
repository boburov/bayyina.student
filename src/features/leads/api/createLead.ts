import axios from 'axios';

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
  await axios.post('http://156.67.29.62:4000/api/leads', data, {
    headers: { 'Content-Type': 'application/json' },
  });
};
