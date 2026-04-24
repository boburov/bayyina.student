import { useState } from 'react';
import type { FormEvent } from 'react';
import { GraduationCap, CheckCircle, AlertCircle } from 'lucide-react';
import { createLead } from '../../features/leads/api/createLead';
import { Input } from '../../shared/ui/Input';
import { Button } from '../../shared/ui/Button';

const SOURCES = [
  'instagram',
  'telegram',
  'facebook',
  'youtube',
  'friend',
  'other',
];


interface FormState {
  firstName: string;
  phone: string;
  gender: 'male' | 'female' | '';
  age: string;
  profession: string;
  source: string;
  interest: string;
}

interface FieldErrors {
  firstName?: string;
  phone?: string;
  gender?: string;
  age?: string;
  profession?: string;
  source?: string;
  interest?: string;
}

const initialForm: FormState = {
  firstName: '',
  phone: '',
  gender: '',
  age: '',
  profession: '',
  source: '',
  interest: '',
};

export const CreateLeadsPage = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const set = (key: keyof FormState) => (val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const validate = (): FieldErrors => {
    const e: FieldErrors = {};
    if (!form.firstName.trim()) e.firstName = "Ism kiritish shart";
    if (!form.phone.trim()) {
      e.phone = "Telefon raqam kiritish shart";
    } else if (!/^\d{9,15}$/.test(form.phone.replace(/\s/g, ''))) {
      e.phone = "Telefon raqam noto'g'ri (masalan: 998901234567)";
    }
    if (!form.gender) e.gender = "Jins tanlash shart";
    if (!form.age.trim()) {
      e.age = "Yosh kiritish shart";
    } else if (isNaN(Number(form.age)) || Number(form.age) < 5 || Number(form.age) > 100) {
      e.age = "Yosh 5 va 100 orasida bo'lishi kerak";
    }
    if (!form.profession.trim()) e.profession = "Kasb kiritish shart";
    if (!form.source) e.source = "Qayerdan bilib kelgansiz — tanlash shart";
    if (!form.interest.trim()) {
      e.interest = "Qiziqish kiritish shart";
    } else if (form.interest.length > 100) {
      e.interest = "100 ta belgidan oshmasin";
    }
    return e;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setApiError(null);
    setLoading(true);
    try {
      await createLead({
        firstName: form.firstName.trim(),
        phone: Number(form.phone.replace(/\s/g, '')),
        gender: form.gender as 'male' | 'female',
        age: Number(form.age),
        profession: form.profession.trim(),
        source: form.source,
        interest: form.interest,
      });
      setSubmitted(true);
    } catch {
      setApiError("Xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-sm border border-stone-200 bg-white px-8 py-10 text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-stone-900 mb-2">Muvaffaqiyatli yuborildi!</h2>
          <p className="text-sm text-stone-500 mb-6">
            Arizangiz qabul qilindi. Tez orada siz bilan bog'lanamiz.
          </p>
          <Button
            variant="outline"
            fullWidth
            onClick={() => {
              setForm(initialForm);
              setSubmitted(false);
            }}
          >
            Yangi ariza yuborish
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm border border-stone-200 bg-white px-8 py-10">

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-10 h-10 bg-brown-600 flex items-center justify-center mb-4">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-stone-900">Bayyina</h1>
          <p className="text-sm text-stone-500 mt-1">Ariza qoldiring</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

          {/* First name */}
          <Input
            label="Ism"
            type="text"
            placeholder="Ali"
            value={form.firstName}
            onChange={(e) => set('firstName')(e.target.value)}
            error={errors.firstName}
            autoComplete="given-name"
          />

          {/* Phone */}
          <Input
            label="Telefon raqam"
            type="tel"
            inputMode="numeric"
            placeholder="998901234567"
            value={form.phone}
            onChange={(e) => set('phone')(e.target.value)}
            error={errors.phone}
            autoComplete="tel"
          />

          {/* Gender */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-stone-700">Jins</label>
            <div className="flex gap-2">
              {(['male', 'female'] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => set('gender')(g)}
                  className={`flex-1 py-2.5 rounded-sm border text-sm font-medium transition-colors cursor-pointer ${
                    form.gender === g
                      ? 'bg-brown-600 border-brown-600 text-white'
                      : 'border-stone-300 text-stone-700 bg-white hover:border-stone-400'
                  }`}
                >
                  {g === 'male' ? 'Erkak' : 'Ayol'}
                </button>
              ))}
            </div>
            {errors.gender && <p className="text-xs text-red-500">{errors.gender}</p>}
          </div>

          {/* Age */}
          <Input
            label="Yosh"
            type="number"
            inputMode="numeric"
            placeholder="19"
            min={5}
            max={100}
            value={form.age}
            onChange={(e) => set('age')(e.target.value)}
            error={errors.age}
          />

          {/* Profession */}
          <Input
            label="Kasb / O'quv joyi"
            type="text"
            placeholder="Talaba"
            value={form.profession}
            onChange={(e) => set('profession')(e.target.value)}
            error={errors.profession}
          />

          {/* Source */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-stone-700">Qayerdan bildingiz?</label>
            <select
              value={form.source}
              onChange={(e) => set('source')(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-sm border bg-white text-stone-900 outline-none transition-colors focus:border-brown-600 appearance-none ${
                errors.source ? 'border-red-400 focus:border-red-400' : 'border-stone-300'
              }`}
            >
              <option value="" disabled>Tanlang...</option>
              {SOURCES.map((s) => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
            {errors.source && <p className="text-xs text-red-500">{errors.source}</p>}
          </div>

          {/* Interest */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-stone-700">Qaysi kurs qiziqtiradi?</label>
            <div className="relative">
              <textarea
                value={form.interest}
                onChange={(e) => set('interest')(e.target.value)}
                maxLength={100}
                rows={2}
                placeholder="Masalan: kechki ingliz tili kursi..."
                className={`w-full px-3 py-2.5 rounded-sm border bg-white text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-brown-600 resize-none ${
                  errors.interest ? 'border-red-400 focus:border-red-400' : 'border-stone-300'
                }`}
              />
              <span className={`absolute bottom-2 right-2.5 text-xs ${form.interest.length > 90 ? 'text-red-400' : 'text-stone-400'}`}>
                {form.interest.length}/100
              </span>
            </div>
            {errors.interest && <p className="text-xs text-red-500">{errors.interest}</p>}
          </div>

          {/* API error */}
          {apiError && (
            <div className="flex items-center gap-2 px-3 py-2.5 border border-red-200 bg-red-50 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {apiError}
            </div>
          )}

          <Button
            type="submit"
            fullWidth
            loading={loading}
            className="mt-2"
          >
            Ariza yuborish
          </Button>

        </form>
      </div>
    </main>
  );
};
