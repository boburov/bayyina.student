import { AuthForm } from '../../widgets/auth-form/AuthForm'

export const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-sm">

        {/* Brand */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <img src="/favicon.png" alt="Bayyina" className="w-12 h-12 object-contain" />
          <div className="text-center">
            <h1 className="text-lg font-semibold text-stone-900">Bayyina</h1>
            <p className="text-sm text-stone-400 mt-0.5">Talaba paneli</p>
          </div>
        </div>

        {/* Card */}
        <div className="border border-stone-200 bg-white px-6 py-7">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-stone-900">Xush kelibsiz!</h2>
            <p className="text-sm text-stone-500 mt-1">
              Talaba sifatida tizimga kiring
            </p>
          </div>
          <AuthForm />
        </div>

        <p className="text-center text-xs text-stone-400 mt-5">
          © {new Date().getFullYear()} Bayyina Ta'lim Markazi
        </p>
      </div>
    </div>
  )
}
