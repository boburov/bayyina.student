import { baseApi } from '../../shared/api/base';

export interface MyDerStats {
  totalPresent:  number
  totalAbsent:   number
  totalSessions: number
  avgStars:      number | null
  score:         number
  rankGlobal:    number | null
  totalGlobal:   number
  groupRanks:    Record<string, { rank: number; total: number }>
}

export interface MyDerStatsResponse {
  stats: MyDerStats
  from:  string
  to:    string
}

export const fetchMyDerStats = async (params?: {
  from?: string
  to?:   string
  group?: string
}): Promise<MyDerStatsResponse> => {
  const q = new URLSearchParams()
  if (params?.from)  q.set('from',  params.from)
  if (params?.to)    q.set('to',    params.to)
  if (params?.group) q.set('group', params.group)
  const res = await baseApi.get(`attendance/der/my-stats?${q.toString()}`)
  return res.data
}
