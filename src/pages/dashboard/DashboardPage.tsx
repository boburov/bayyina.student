import { BookOpen, Users, TrendingDown, TrendingUp, GraduationCap } from 'lucide-react';
import { useProfile } from '../../features/auth/model/useProfile';
import { useEnrollments } from '../../entities/enrollment/useEnrollments';
import { Card } from '../../shared/ui/Card';
import { BottomNav } from '../../widgets/bottom-nav/BottomNav';

const fmt = (n: number | null | undefined) => (n ?? 0).toLocaleString('uz-UZ') + " so'm";

export const DashboardPage = () => {
  const { profile } = useProfile();
  const { enrollments, loading } = useEnrollments();

  const valid        = enrollments.filter((e) => e.group != null);
  const activeCount  = valid.filter((e) => e.status === 'active').length;
  const totalDebt    = valid.reduce((s, e) => s + e.debt, 0);
  const totalBalance = valid.reduce((s, e) => s + e.balance, 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-sm mx-auto px-4 pt-6 pb-24">

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-stone-200">
          <GraduationCap className="w-5 h-5 text-brown-600" />
          <span className="text-base font-semibold text-stone-900">Bayyina</span>
        </div>

        {/* Greeting */}
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-stone-900">
            Xush kelibsiz{profile ? `, ${profile.firstName}` : ''}
          </h2>
          <p className="text-sm text-stone-500 mt-0.5">O'quv jarayoniga umumiy ko'rinish</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="p-4">
            <BookOpen className="w-4 h-4 text-brown-600 mb-2" />
            <p className="text-xl font-bold text-stone-900">
              {loading ? '—' : activeCount}
            </p>
            <p className="text-xs text-stone-500 mt-0.5">Faol kurslar</p>
          </Card>
          <Card className="p-4">
            <Users className="w-4 h-4 text-stone-400 mb-2" />
            <p className="text-xl font-bold text-stone-900">
              {loading ? '—' : valid.length}
            </p>
            <p className="text-xs text-stone-500 mt-0.5">Jami guruhlar</p>
          </Card>
          <Card className={`p-4 ${!loading && totalDebt > 0 ? 'border-red-200' : ''}`}>
            <TrendingDown className={`w-4 h-4 mb-2 ${!loading && totalDebt > 0 ? 'text-red-500' : 'text-stone-300'}`} />
            <p className={`text-sm font-bold leading-tight break-all ${!loading && totalDebt > 0 ? 'text-red-600' : 'text-stone-400'}`}>
              {loading ? '—' : totalDebt > 0 ? fmt(totalDebt) : "Yo'q"}
            </p>
            <p className="text-xs text-stone-500 mt-0.5">Qarzdorlik</p>
          </Card>
          <Card className={`p-4 ${!loading && totalBalance > 0 ? 'border-green-200' : ''}`}>
            <TrendingUp className={`w-4 h-4 mb-2 ${!loading && totalBalance > 0 ? 'text-green-500' : 'text-stone-300'}`} />
            <p className={`text-sm font-bold leading-tight break-all ${!loading && totalBalance > 0 ? 'text-green-600' : 'text-stone-400'}`}>
              {loading ? '—' : fmt(totalBalance)}
            </p>
            <p className="text-xs text-stone-500 mt-0.5">Balans</p>
          </Card>
        </div>

        {/* Enrollment list */}
        {!loading && valid.length > 0 && (
          <>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Guruhlarim</p>
            <div className="flex flex-col gap-2">
              {valid.map((en) => (
                <Card key={en._id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-stone-900">{en.group.name}</p>
                      {en.group.schedule && (
                        <p className="text-xs text-stone-400 mt-0.5">
                          {en.group.schedule.days?.join(', ')} · {en.group.schedule.time}
                        </p>
                      )}
                    </div>
                    <div className="text-right max-w-[120px]">
                      {en.debt > 0 && (
                        <p className="text-xs font-semibold text-red-600 break-all">{fmt(en.debt)} qarz</p>
                      )}
                      {en.balance > 0 && (
                        <p className="text-xs font-semibold text-green-600 break-all">{fmt(en.balance)} balans</p>
                      )}
                      {en.nextPaymentDate && (
                        <p className="text-xs text-stone-400 mt-0.5">
                          {new Date(en.nextPaymentDate).toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit' })} da to'lov
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {!loading && valid.length === 0 && (
          <Card className="p-6 text-center">
            <p className="text-sm text-stone-400">Hozircha hech qanday guruh yo'q</p>
          </Card>
        )}

      </div>
      <BottomNav />
    </div>
  );
};
