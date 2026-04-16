import { useState, useEffect } from 'react';
import { getPayments } from './api';
import type { Payment } from './model';

interface UsePaymentsReturn {
  payments: Payment[];
  loading: boolean;
  error: string | null;
}

export const usePayments = (): UsePaymentsReturn => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPayments()
      .then(setPayments)
      .catch(() => setError("To'lovlarni yuklashda xatolik."))
      .finally(() => setLoading(false));
  }, []);

  return { payments, loading, error };
};
