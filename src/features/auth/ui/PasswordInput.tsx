import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '../../../shared/ui/Input';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const PasswordInput = ({ value, onChange, error }: PasswordInputProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        label="Parol"
        type={visible ? 'text' : 'password'}
        placeholder="Parolni kiriting"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={error}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-3 top-8 text-stone-400 hover:text-brown-600 transition-colors"
        tabIndex={-1}
        aria-label={visible ? 'Parolni yashirish' : "Parolni ko'rsatish"}
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
};
