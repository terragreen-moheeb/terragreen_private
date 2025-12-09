'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FormControl from '../forms/form_components/FormControl'
import { Button } from '../ui/button'
import { createClient } from '@/utils/supabase/client'

const validateEmail = (value: string): string => {
  if (!value) return 'Bitte gib eine E-Mail-Adresse ein.'
  if (!/\S+@\S+\.\S+/.test(value)) return 'Bitte gib eine gültige E-Mail-Adresse ein.'
  return ''
}

const validatePassword = (value: string): string => {
  if (!value) return 'Bitte gib dein Passwort ein.'
  if (value.length < 6) return 'Das Passwort muss mindestens 6 Zeichen lang sein.'
  return ''
}

const translateAuthError = (message: string): string => {
  const translations: Record<string, string> = {
    'Invalid login credentials': 'Ungültige Anmeldedaten. Bitte überprüfe deine E-Mail und dein Passwort.',
    'Email not confirmed': 'Deine E-Mail-Adresse wurde noch nicht bestätigt. Bitte überprüfe dein Postfach.',
    'User already registered': 'Ein Benutzer mit dieser E-Mail-Adresse ist bereits registriert.',
    'User not found': 'Benutzer nicht gefunden. Bitte überprüfe deine Eingaben.',
    'Invalid email or password': 'E-Mail oder Passwort ist falsch.'
  }
  return translations[message] || 'Ein unbekannter Fehler ist aufgetreten.'
}

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ email: '', password: '', global: '' })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const clearErrors = () => setErrors({ email: '', password: '', global: '' })

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearErrors()

    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError, global: '' })
      return
    }

    setLoading(true)
    try {
      const client = createClient();

      // Supabase JS v2: use auth.signInWithPassword
      const { error: signInError } = await client.auth.signInWithPassword({
        email,
        password
      })
      if (signInError) throw signInError
      router.push('/user')
      // Loading bleibt true während Navigation
    } catch (err) {
      const message = err instanceof Error ? err.message : ''
      setErrors(prev => ({ ...prev, global: translateAuthError(message) }))
      setLoading(false)
    }
  }



  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-50">Willkommen zurück</h1>
        <p className="mt-2 text-sm text-gray-100">Melde dich mit deinem Account an</p>
      </div>

      <form noValidate onSubmit={handlePasswordSubmit} className="space-y-5">
        <FormControl
          type="email"
          label="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Deine E-Mail-Adresse"
          required
          error={errors.email}
          labelClassName="text-gray-200"
        />

        <FormControl
          type="password"
          label="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          error={errors.password}
          labelClassName="text-gray-200"
        />

        {errors.global && (
          <div className="p-3.5 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
            {errors.global}
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          variant="primary"
          size="lg"
          className="w-full text-base font-semibold"
        >
          Anmelden
        </Button>
      </form>
    </div>
  )
}