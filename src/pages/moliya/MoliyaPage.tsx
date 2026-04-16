import { useEnrollments } from '../../entities/enrollment/useEnrollments';
import { usePayments } from '../../entities/payment/usePayments';
import { Card } from '../../shared/ui/Card';
import { BottomNav } from '../../widgets/bottom-nav/BottomNav';

const fmt = (n: number | null | undefined) => (n ?? 0).toLocaleString('uz-UZ') + " so'm";

const paymentStatusLabel: Record<string, { text: string; cls: string }> = {
  paid:    { text: "To'landi",       cls: 'text-green-600 bg-green-50 border border-green-200' },
  pending: { text: 'Kutilmoqda',     cls: 'text-stone-500 bg-stone-50 border border-stone-200' },
  overdue: { text: "Muddati o'tgan", cls: 'text-red-600 bg-red-50 border border-red-200' },
};

const formatMonth = (iso: string) =>
  new Date(iso).toLocaleDateString('uz-UZ', { month: 'long', year: 'numeric' });

export const MoliyaPage = () => {
  const { enrollments: raw, loading: enrollLoading } = useEnrollments();
  const enrollments = raw.filter((e) => e.group != null);
  const { payments, loading: payLoading } = usePayments();

  const totalDebt    = enrollments.reduce((s, e) => s + e.debt, 0);
  const totalBalance = enrollments.reduce((s, e) => s + e.balance, 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-sm mx-auto px-4 pt-6 pb-24">
        <h1 className="text-lg font-semibold text-stone-900 mb-5">Moliya</h1>

        {/* Summary */}
        {!enrollLoading && (
          <div className="grid grid-cols-2 gap-3 mb-5">
            <Card className={`p-4 ${totalDebt > 0 ? 'border-red-200' : ''}`}>
              <p className="text-xs text-stone-400 mb-1">Umumiy qarz</p>
              <p className={`text-base font-bold ${totalDebt > 0 ? 'text-red-600' : 'text-stone-400'}`}>
                {totalDebt > 0 ? fmt(totalDebt) : "Yo'q"}
              </p>
            </Card>
            <Card className={`p-4 ${totalBalance > 0 ? 'border-green-200' : ''}`}>
              <p className="text-xs text-stone-400 mb-1">Umumiy balans</p>
              <p className={`text-base font-bold ${totalBalance > 0 ? 'text-green-600' : 'text-stone-400'}`}>
                {totalBalance > 0 ? fmt(totalBalance) : '0'}
              </p>
            </Card>
          </div>
        )}

        {/* Per-group financial status */}
        {!enrollLoading && enrollments.length > 0 && (
          <>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Guruhlar bo'yicha</p>
            {enrollments.map((en) => (
              <Card key={en._id} className="mb-2">
                <div className="px-4 py-3 border-b border-stone-100 flex items-center justify-between">
                  <p className="text-sm font-medium text-stone-900">{en.group.name}</p>
                  <span className="text-xs text-stone-400">{fmt(en.monthlyFee)}/oy</span>
                </div>
                <div className="px-4 py-3 flex gap-6">
                  <div>
                    <p className="text-xs text-stone-400">Qarz</p>
                    <p className={`text-sm font-semibold ${en.debt > 0 ? 'text-red-600' : 'text-stone-300'}`}>
                      {en.debt > 0 ? fmt(en.debt) : '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-stone-400">Balans</p>
                    <p className={`text-sm font-semibold ${en.balance > 0 ? 'text-green-600' : 'text-stone-300'}`}>
                      {en.balance > 0 ? fmt(en.balance) : '—'}
                    </p>
                  </div>
                  {en.nextPaymentDate && (
                    <div className="ml-auto text-right">
                      <p className="text-xs text-stone-400">Keyingi to'lov</p>
                      <p className="text-xs font-medium text-stone-700">
                        {new Date(en.nextPaymentDate).toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit' })}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </>
        )}

        {/* Payment history */}
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3 mt-4">To'lovlar tarixi</p>

        {payLoading && (
          <Card className="p-4">
            <p className="text-sm text-stone-400 text-center">Yuklanmoqda...</p>
          </Card>
        )}

        {!payLoading && payments.length === 0 && (
          <Card className="p-4">
            <p className="text-sm text-stone-400 text-center">To'lovlar topilmadi</p>
          </Card>
        )}

        {!payLoading && payments.length > 0 && (
          <Card className="divide-y divide-stone-100">
            {payments.map((p) => {
              const st = paymentStatusLabel[p.status] ?? paymentStatusLabel.pending;
              return (
                <div key={p._id} className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-stone-800">{formatMonth(p.month)}</p>
                    {p.note && <p className="text-xs text-stone-400 mt-0.5">{p.note}</p>}
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <p className="text-sm font-semibold text-stone-900">{fmt(p.amount)}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-sm font-medium ${st.cls}`}>
                      {st.text}
                    </span>
                  </div>
                </div>
              );
            })}
          </Card>
        )}
      </div>
      <BottomNav />
    </div>
  );
};
