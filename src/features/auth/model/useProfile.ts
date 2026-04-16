import { useState, useEffect } from 'react';
import { getProfile } from '../api/profile';
import type { UserProfile } from '../api/profile';

interface UseProfileReturn {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

export const useProfile = (): UseProfileReturn => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .catch(() => setError("Profilni yuklashda xatolik yuz berdi."))
      .finally(() => setLoading(false));
  }, []);

  return { profile, loading, error };
};
