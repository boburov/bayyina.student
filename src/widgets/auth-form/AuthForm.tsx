import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, AlertCircle } from 'lucide-react'
import { useLogin } from '../../features/auth/model/useLogin'
import { useAuth }  from '../../app/providers/AuthProvider'
import { InputTel, phoneDigits } from '../../shared/ui/InputTel'
import { Input }    from '../../shared/ui/Input'
import { Button }   from '../../shared/ui/Button'

export const AuthForm = () => {
  const [phone,        setPhone]        = useState('')
  const [password,     setPassword]     = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { loading, error, login } = useLogin()
  const { signIn }  = useAuth()
  const navigate    = useNavigate()

  const isReady = phoneDigits(phone).length === 9 && password.trim() !== ''

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!isReady) return
    // Send as raw digits (998XXXXXXXXX) — matches server expectation
    const rawPhone = '998' + phoneDigits(phone)
    const token    = await login(rawPhone, password)
    if (token) {
      signIn(token)
      navigate('/dashboard')
    }
  }

  const passwordToggle = (
    <button
      type="button"
      onClick={() => setShowPassword((v) => !v)}
      className="text-stone-400 hover:text-brown-800 transition-colors"
      tabIndex={-1}
      aria-label={showPassword ? 'Parolni yashirish' : "Parolni ko'rsatish"}
    >
      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  )

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      <InputTel
        label="Telefon raqam"
        value={phone}
        onChange={setPhone}
        autoFocus
      />

      <Input
        label="Parol"
        type={showPassword ? 'text' : 'password'}
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        leftIcon={<Lock className="h-4 w-4" />}
        rightIcon={passwordToggle}
      />

      {error && (
        <div className="flex items-center gap-2 px-3 py-2.5 border border-red-200 bg-red-50 text-red-600 text-sm rounded-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <Button
        type="submit"
        fullWidth
        loading={loading}
        disabled={!isReady}
        className="mt-1"
      >
        Kirish
      </Button>
    </form>
  )
}
