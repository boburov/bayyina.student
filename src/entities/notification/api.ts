import { baseApi } from '../../shared/api/base'
import type { NotificationsResponse } from './model'

export const getNotifications = async (
  page = 1,
  limit = 20,
): Promise<NotificationsResponse> => {
  const { data } = await baseApi.get<NotificationsResponse>('/notifications', {
    params: { page, limit },
  })
  return data
}
