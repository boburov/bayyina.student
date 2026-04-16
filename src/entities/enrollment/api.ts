import { baseApi } from '../../shared/api/base';
import type { Enrollment } from './model';

interface EnrollmentsResponse {
  enrollments: Enrollment[];
  total: number;
}

export const getEnrollments = async (): Promise<Enrollment[]> => {
  const { data } = await baseApi.get<EnrollmentsResponse>('/enrollments');
  return data.enrollments;
};
