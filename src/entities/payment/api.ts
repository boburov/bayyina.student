import { baseApi } from '../../shared/api/base';
import type { Payment } from './model';

interface PaymentsResponse {
  payments: Payment[];
  total: number;
}

export const getPayments = async (): Promise<Payment[]> => {
  const { data } = await baseApi.get<PaymentsResponse>('/payments');
  return data.payments;
};
