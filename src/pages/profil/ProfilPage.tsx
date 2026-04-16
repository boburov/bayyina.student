import { useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '../../app/providers/AuthProvider';
import { useProfile } from '../../features/auth/model/useProfile';
import { useEnrollments } from '../../entities/enrollment/useEnrollments';
import { Card } from '../../shared/ui/Card';
import { Button } from '../../shared/ui/Button';
import { BottomNav } from '../../widgets/bottom-nav/BottomNav';

const fmt = (n: number | null | undefined) =>
  (n ?? 0).toLocaleString('uz-UZ') + " so'm";

const statusLabel: Record<string, { text: string; cls: string }> = {
  active:    { text: 'Faol',             cls: 'bg-green-50 text-green-700 border border-green-200' },
  completed: { text: 'Tugallangan',      cls: 'bg-stone-100 text-stone-600 border border-stone-200' },
  dropped:   { text: 'Tashlab ketilgan', cls: 'bg-stone-100 text-stone-400 border border-stone-200' },
};

const formatDate = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : '—';

export const ProfilPage = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { profile, loading: profileLoading } = useProfile();
  const { enrollments: raw, loading: enrollLoading } = useEnrollments();
  const enrollments = raw.filter((e) => e.group != null);

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-sm mx-auto px-4 pt-6 pb-24">
        <h1 className="text-lg font-semibold text-stone-900 mb-5">Profil</h1>

        {/* Avatar + name */}
        <Card className="p-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brown-600 flex items-center justify-center shrink-0">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              {profileLoading ? (
                <p className="text-sm text-stone-400">Yuklanmoqda...</p>
              ) : profile ? (
                <>
                  <p className="text-sm font-semibold text-stone-900">{profile.firstName} {profile.lastName}</p>
                  <p className="text-xs text-stone-400 mt-0.5">{profile.phone}</p>
                  {profile.gender && (
                    <p className="text-xs text-stone-400">
                      {profile.gender === 'male' ? 'Erkak' : 'Ayol'}{profile.age ? `, ${profile.age} yosh` : ''}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm text-red-500">Xatolik yuz berdi</p>
              )}
            </div>
          </div>
        </Card>

        {/* Enrollments */}
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Mening guruhlarim</p>

        {enrollLoading && (
          <Card className="p-4 mb-2">
            <p className="text-sm text-stone-400 text-center">Yuklanmoqda...</p>
          </Card>
        )}

        {!enrollLoading && enrollments.length === 0 && (
          <Card className="p-4 mb-2">
            <p className="text-sm text-stone-400 text-center">Hech qanday guruh topilmadi</p>
          </Card>
        )}

        {enrollments.map((en) => {
          const st = statusLabel[en.status] ?? statusLabel.active;
          return (
            <Card key={en._id} className="mb-2">
              {/* Group name + status */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100">
                <p className="text-sm font-medium text-stone-900">{en.group.name}</p>
                <span className={`text-xs px-2 py-0.5 font-medium rounded-sm ${st.cls}`}>
                  {st.text}
                </span>
              </div>

              {/* Debt / Balance */}
              <div className="grid grid-cols-2 divide-x divide-stone-100">
                <div className="px-4 py-3">
                  <p className="text-xs text-stone-400 mb-0.5">Qarzdorlik</p>
                  <p className={`text-sm font-semibold ${en.debt > 0 ? 'text-red-600' : 'text-stone-400'}`}>
                    {en.debt > 0 ? fmt(en.debt) : "Yo'q"}
                  </p>
                </div>
                <div className="px-4 py-3">
                  <p className="text-xs text-stone-400 mb-0.5">Balans</p>
                  <p className={`text-sm font-semibold ${en.balance > 0 ? 'text-green-600' : 'text-stone-400'}`}>
                    {en.balance > 0 ? fmt(en.balance) : "0"}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="divide-y divide-stone-100 border-t border-stone-100">
                <div className="px-4 py-2 flex justify-between">
                  <span className="text-xs text-stone-400">Oylik to'lov</span>
                  <span className="text-xs font-medium text-stone-700">{fmt(en.monthlyFee)}</span>
                </div>
                {en.discount > 0 && (
                  <div className="px-4 py-2 flex justify-between">
                    <span className="text-xs text-stone-400">Chegirma</span>
                    <span className="text-xs font-medium text-green-600">-{fmt(en.discount)}</span>
                  </div>
                )}
                <div className="px-4 py-2 flex justify-between">
                  <span className="text-xs text-stone-400">Keyingi to'lov</span>
                  <span className="text-xs font-medium text-stone-700">{formatDate(en.nextPaymentDate)}</span>
                </div>
                {en.group.schedule && (
                  <div className="px-4 py-2 flex justify-between">
                    <span className="text-xs text-stone-400">Dars vaqti</span>
                    <span className="text-xs font-medium text-stone-700">
                      {en.group.schedule.days?.join(', ')} · {en.group.schedule.time}
                    </span>
                  </div>
                )}
              </div>
            </Card>
          );
        })}

        <div className="mt-4">
          <Button variant="outline" fullWidth onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Chiqish
          </Button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};
