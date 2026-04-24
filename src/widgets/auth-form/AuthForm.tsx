import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, AlertCircle } from 'lucide-react';
import { useLogin } from '../../features/auth/model/useLogin';
import { PasswordInput } from '../../features/auth/ui/PasswordInput';
import { useAuth } from '../../app/providers/AuthProvider';
import { Input } from '../../shared/ui/Input';
import { Button } from '../../shared/ui/Button';

export const AuthForm = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, login } = useLogin();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const isEmpty = phone.trim() === '' || password.trim() === '';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = await login(phone, password);
    if (token) {
      signIn(token);
      navigate('/dashboard');
    }
  };

  return (
    <div className="w-full max-w-sm border border-stone-200 bg-white px-8 py-10">
      <div className="flex flex-col items-center mb-8">
        <img src="/favicon.png" alt="Bayyina" className="w-12 h-12 object-contain mb-4" />
        <h1 className="text-xl font-semibold text-stone-900">Bayyina</h1>
        <p className="text-sm text-stone-500 mt-1">Talaba paneli</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <Input
            label="Telefon raqam"
            type="tel"
            inputMode="numeric"
            placeholder="998901234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
          />
          <Phone className="absolute right-3 top-8 h-4 w-4 text-stone-400 pointer-events-none" />
        </div>

        <PasswordInput
          value={password}
          onChange={setPassword}
        />

        {error && (
          <div className="flex items-center gap-2 px-3 py-2.5 border border-red-200 bg-red-50 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <Button
          type="submit"
          fullWidth
          loading={loading}
          disabled={isEmpty}
          className="mt-2"
        >
          Kirish
        </Button>
      </form>
    </div>
  );
};
