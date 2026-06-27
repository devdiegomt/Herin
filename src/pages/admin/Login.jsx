import { useState } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { Lock, Loader2 } from 'lucide-react'
import { signIn, useAuth } from '../../auth/AuthContext'

export default function Login() {
  const { session, loading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  if (!loading && session) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async () => {
    setError(null)
    setSubmitting(true)
    try {
      await signIn(email.trim(), password)
      navigate('/admin')
    } catch (err) {
      setError(
        err.message?.includes('Invalid login')
          ? 'Correo o contraseña incorrectos.'
          : 'No pudimos iniciar sesión. Intenta de nuevo.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-light px-5">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="font-display text-4xl font-semibold text-charcoal tracking-wide">
            HERIN
          </Link>
          <p className="text-warm-gray text-sm mt-2">Panel de administración</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-sand/60 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-charcoal mb-6">
            <Lock size={18} className="text-terracotta" />
            <h1 className="font-display text-xl font-semibold">Iniciar sesión</h1>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-warm-gray mb-1.5">Correo</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                className="w-full px-4 py-2.5 rounded-xl border border-sand bg-cream-light/50 text-charcoal text-sm outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/15 transition"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-warm-gray mb-1.5">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                className="w-full px-4 py-2.5 rounded-xl border border-sand bg-cream-light/50 text-charcoal text-sm outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/15 transition"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-terracotta-dark bg-terracotta/10 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={submitting || !email || !password}
              className="w-full flex items-center justify-center gap-2 bg-moss hover:bg-moss-light disabled:opacity-50 disabled:cursor-not-allowed text-cream-light py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-300"
            >
              {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
              {submitting ? 'Entrando…' : 'Entrar'}
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-warm-gray/70 mt-6">
          <Link to="/" className="hover:text-terracotta transition-colors">← Volver al sitio</Link>
        </p>
      </div>
    </div>
  )
}
