import { useState }              from 'react'
import {
  Bell, ChevronLeft, ChevronRight,
  MessageSquare, User, X,
} from 'lucide-react'
import { useNotifications }      from '../../entities/notification/useNotifications'
import type { Notification }     from '../../entities/notification/model'
import { Card }                  from '../../shared/ui/Card'
import { BottomNav }             from '../../widgets/bottom-nav/BottomNav'

// ─── Static maps ──────────────────────────────────────────────────────────────

const typeLabel: Record<string, string> = {
  complaint:  'Shikoyat',
  suggestion: 'Taklif',
  info:       "Ma'lumot",
  request:    "So'rov",
}

const statusCls: Record<string, string> = {
  open:    'bg-amber-50 text-amber-700 border border-amber-200',
  closed:  'bg-green-50 text-green-700 border border-green-200',
  pending: 'bg-stone-100 text-stone-500 border border-stone-200',
}

const statusText: Record<string, string> = {
  open:    'Ochiq',
  closed:  'Yopiq',
  pending: 'Kutilmoqda',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function groupName(n: Notification): string {
  if (!n.group) return '—'
  if (typeof n.group === 'string') return '—'
  return n.group.name
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('uz-UZ', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  })
}

// ─── Detail sheet ─────────────────────────────────────────────────────────────

function DetailSheet({ n, onClose }: { n: Notification; onClose: () => void }) {
  const feedbacks = n.feedback ?? []

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-start gap-3 px-4 py-4 border-b border-stone-200">
        <button
          onClick={onClose}
          className="flex items-center justify-center w-7 h-7 border border-stone-200 text-stone-400 shrink-0 mt-0.5"
          aria-label="Orqaga"
        >
          <X size={13} />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
            <span className="text-xs text-stone-400">{typeLabel[n.type] ?? n.type}</span>
            <span className="text-stone-300">·</span>
            <span className={`text-[10px] px-1.5 py-0.5 font-medium ${statusCls[n.status] ?? statusCls.pending}`}>
              {statusText[n.status] ?? n.status}
            </span>
          </div>
          <p className="text-sm font-semibold text-stone-900">{n.title}</p>
          <p className="text-xs text-stone-400 mt-0.5">
            {groupName(n)} · {fmtDate(n.createdAt)}
          </p>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-6 space-y-4">
        {/* Message */}
        <div className="border border-stone-200 bg-stone-50 px-4 py-3">
          <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-wrap">{n.message}</p>
        </div>

        {/* Feedback */}
        <div>
          <div className="flex items-center gap-1.5 mb-3">
            <MessageSquare size={12} className="text-stone-400" />
            <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
              Javoblar ({feedbacks.length})
            </p>
          </div>

          {feedbacks.length === 0 ? (
            <p className="text-sm text-stone-400">Hali javob berilmagan</p>
          ) : (
            <div className="divide-y divide-stone-100 border border-stone-200">
              {feedbacks.map((fb) => (
                <div key={fb._id} className="px-4 py-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <User size={11} className="text-stone-400" />
                    <span className="text-xs font-medium text-stone-600 capitalize">{fb.role}</span>
                    <span className="text-xs text-stone-400 ml-auto">{fmtDate(fb.createdAt)}</span>
                  </div>
                  <p className="text-sm text-stone-700">{fb.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export const NotificationsPage = () => {
  const {
    notifications, loading, error,
    page, totalPages, hasNextPage, hasPrevPage, goToPage,
  } = useNotifications()

  const [selected, setSelected] = useState<Notification | null>(null)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-sm mx-auto px-4 pt-6 pb-24">
        <h1 className="text-lg font-semibold text-stone-900 mb-5">Xabarnomalar</h1>

        {/* Loading */}
        {loading && (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4 animate-pulse space-y-2">
                <div className="w-1/3 h-3 bg-stone-100" />
                <div className="w-2/3 h-4 bg-stone-100" />
                <div className="w-full h-3 bg-stone-100" />
              </Card>
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <Card className="p-4 border-red-200">
            <p className="text-sm text-red-600 text-center">{error}</p>
          </Card>
        )}

        {/* Empty */}
        {!loading && !error && notifications.length === 0 && (
          <Card className="p-8 flex flex-col items-center gap-2">
            <Bell size={28} className="text-stone-300" strokeWidth={1.5} />
            <p className="text-sm text-stone-400">Xabarnomalar yo'q</p>
          </Card>
        )}

        {/* List */}
        {!loading && !error && notifications.length > 0 && (
          <>
            <div className="divide-y divide-stone-100 border border-stone-200 bg-white">
              {notifications.map((n) => (
                <button
                  key={n._id}
                  onClick={() => setSelected(n)}
                  className="w-full text-left px-4 py-3.5 hover:bg-stone-50 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs text-stone-400">{typeLabel[n.type] ?? n.type}</span>
                    <div className="flex items-center gap-1.5">
                      {(n.feedback?.length ?? 0) > 0 && (
                        <span className="flex items-center gap-0.5 text-[10px] text-stone-400">
                          <MessageSquare size={10} />
                          {n.feedback.length}
                        </span>
                      )}
                      <span className={`text-[10px] px-1.5 py-0.5 font-medium ${statusCls[n.status] ?? statusCls.pending}`}>
                        {statusText[n.status] ?? n.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-stone-900 truncate">{n.title}</p>
                  <p className="text-xs text-stone-500 mt-0.5 truncate">{n.message}</p>
                  <p className="text-[10px] text-stone-400 mt-1">
                    {groupName(n)} · {fmtDate(n.createdAt)}
                  </p>
                </button>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-stone-400">{page}/{totalPages}-sahifa</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => goToPage(page - 1)}
                    disabled={!hasPrevPage}
                    className="flex items-center justify-center w-7 h-7 border border-stone-200 text-stone-400 hover:bg-stone-50 disabled:opacity-40 transition-colors"
                  >
                    <ChevronLeft size={13} />
                  </button>
                  <button
                    onClick={() => goToPage(page + 1)}
                    disabled={!hasNextPage}
                    className="flex items-center justify-center w-7 h-7 border border-stone-200 text-stone-400 hover:bg-stone-50 disabled:opacity-40 transition-colors"
                  >
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <BottomNav />

      {/* Detail sheet (full-screen overlay on mobile) */}
      {selected && (
        <DetailSheet n={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
