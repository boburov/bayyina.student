import { useState, useEffect, useCallback } from 'react'
import { getNotifications } from './api'
import type { Notification, NotificationsResponse } from './model'

interface UseNotificationsReturn {
  notifications: Notification[]
  loading:       boolean
  error:         string | null
  page:          number
  totalPages:    number
  hasNextPage:   boolean
  hasPrevPage:   boolean
  goToPage:      (p: number) => void
  refresh:       () => void
}

export const useNotifications = (): UseNotificationsReturn => {
  const [page, setPage]         = useState(1)
  const [data, setData]         = useState<NotificationsResponse | null>(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)

  const fetch = useCallback((p: number) => {
    setLoading(true)
    setError(null)
    getNotifications(p)
      .then((res) => { setData(res); setPage(p) })
      .catch(() => setError("Xabarnomalarni yuklashda xatolik"))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { fetch(1) }, [fetch])

  return {
    notifications: data?.notifications ?? [],
    loading,
    error,
    page,
    totalPages:  data?.totalPages  ?? 1,
    hasNextPage: data?.hasNextPage ?? false,
    hasPrevPage: data?.hasPrevPage ?? false,
    goToPage:    fetch,
    refresh:     () => fetch(page),
  }
}
