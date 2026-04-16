import { useState } from 'react';
import { loginRequest } from '../api/login';

interface UseLoginReturn {
  loading: boolean;
  error: string | null;
  login: (phone: string, password: string) => Promise<string | null>;
}

export const useLogin = (): UseLoginReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (phone: string, password: string): Promise<string | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginRequest({ phone, password });
      return data.token;
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? 'Login failed. Check your credentials.';
      setError(message === 'Login failed. Check your credentials.' ? 'Kirish muvaffaqiyatsiz. Ma\'lumotlarni tekshiring.' : message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, login };
};
