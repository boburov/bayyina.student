import { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Calendar, BookOpen } from 'lucide-react';
import { fetchMyDerStats } from '../../entities/rating/api';
import type { MyDerStats } from '../../entities/rating/api';
import { Card } from '../../shared/ui/Card';
import { BottomNav } from '../../widgets/bottom-nav/BottomNav';

type Period = '7' | '30' | '90';

const PERIOD_OPTIONS: { label: string; value: Period }[] = [
  { label: '7 kun',  value: '7'  },
  { label: '30 kun', value: '30' },
  { label: '90 kun', value: '90' },
];

function toDateStr(d: Date): string {
  return d.toISOString().split('T')[0];
}

function fromDays(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return toDateStr(d);
}

function GradeRow({ avg }: { avg: number | null }) {
  if (avg == null) {
    return <span className="text-stone-300 text-sm">Hali baho yo'q</span>;
  }
  const color =
    avg >= 4.5 ? 'text-emerald-600' :
    avg >= 3.5 ? 'text-blue-600' :
    avg >= 2.5 ? 'text-amber-600' :
    'text-rose-600';
  return (
    <div className="flex items-center gap-2">
      <span className={`text-3xl font-bold ${color}`}>{avg.toFixed(1)}</span>
      <span className="text-stone-400 text-sm">o'rtacha baho</span>
    </div>
  );
}

function AttendancePie({ present, total }: { present: number; total: number }) {
  const pct = total > 0 ? Math.round((present / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-14 h-14">
        <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f1f0ef" strokeWidth="3" />
          <circle
            cx="18" cy="18" r="15.9"
            fill="none"
            stroke={pct >= 80 ? '#34d399' : pct >= 50 ? '#fbbf24' : '#f87171'}
            strokeWidth="3"
            strokeDasharray={`${pct} 100`}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-stone-700">
          {pct}%
        </span>
      </div>
      <div>
        <p className="text-lg font-bold text-stone-900">{present}/{total}</p>
        <p className="text-xs text-stone-400">kun qatnashdim</p>
      </div>
    </div>
  );
}

export const ReytingPage = () => {
  const [period, setPeriod]   = useState<Period>('30');
  const [stats, setStats]     = useState<MyDerStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetchMyDerStats({ from: fromDays(Number(period)), to: toDateStr(new Date()) })
      .then((res) => { setStats(res.stats); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [period]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-sm mx-auto px-4 pt-6 pb-24">

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-stone-200">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span className="text-base font-semibold text-stone-900">Reyting</span>
        </div>

        {/* Period selector */}
        <div className="flex gap-2 mb-5">
          {PERIOD_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setPeriod(opt.value)}
              className={`flex-1 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                period === opt.value
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'text-stone-500 border-stone-200 hover:border-stone-400'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col gap-3">
            {[1,2,3].map((i) => (
              <div key={i} className="h-24 bg-stone-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <Card className="p-6 text-center">
            <p className="text-sm text-stone-400">Ma'lumotlar yuklanmadi</p>
          </Card>
        ) : !stats ? null : (
          <div className="flex flex-col gap-3">

            {/* Global rank */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-brown-600" />
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Umumiy reyting</p>
              </div>
              <p className="text-3xl font-bold text-stone-900">
                {stats.rankGlobal != null ? `#${stats.rankGlobal}` : '—'}
              </p>
              <p className="text-xs text-stone-400 mt-0.5">
                {stats.totalGlobal} ta o'quvchi ichida
              </p>
            </Card>

            {/* Attendance */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-brown-600" />
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Davomat</p>
              </div>
              <AttendancePie present={stats.totalPresent} total={stats.totalSessions} />
              {stats.totalAbsent > 0 && (
                <p className="text-xs text-rose-400 mt-2">{stats.totalAbsent} kun qatnashmadim</p>
              )}
            </Card>

            {/* Grade */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-blue-500" />
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Baho</p>
              </div>
              <GradeRow avg={stats.avgGrade} />
            </Card>

            {/* Group ranks */}
            {Object.keys(stats.groupRanks).length > 0 && (
              <Card className="p-4">
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">Guruh ichidagi o'rin</p>
                <div className="flex flex-col gap-2">
                  {Object.entries(stats.groupRanks).map(([gid, gr]) => (
                    <div key={gid} className="flex items-center justify-between">
                      <span className="text-sm text-stone-500">Guruh</span>
                      <span className="text-sm font-semibold text-stone-800">
                        #{gr.rank} / {gr.total}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};
