import { useState, useEffect } from 'react';
import { getEnrollments } from './api';
import type { Enrollment } from './model';

interface UseEnrollmentsReturn {
  enrollments: Enrollment[];
  loading: boolean;
  error: string | null;
}

export const useEnrollments = (): UseEnrollmentsReturn => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getEnrollments()
      .then(setEnrollments)
      .catch(() => setError("Ma'lumotlarni yuklashda xatolik."))
      .finally(() => setLoading(false));
  }, []);

  return { enrollments, loading, error };
};
