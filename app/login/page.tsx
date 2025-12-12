'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Lock } from 'lucide-react'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: 'Sucesso!',
          description: 'Login realizado com sucesso!',
        })
        router.push('/admin')
        router.refresh()
      } else {
        toast({
          title: 'Erro',
          description: data.message || 'Senha incorreta',
          variant: 'destructive',
        })
        setPassword('')
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao fazer login. Tente novamente.',
        variant: 'destructive',
      })
      setPassword('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-oklch(0.98 0.01 140) to-oklch(0.97 0.015 145) text-zinc-900 relative overflow-x-hidden">
      {/* Background com círculos animados */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          {/* ========== CÍRCULOS ANIMADOS PEQUENOS E SUAVES ========== */}
          
          {/* Círculo pequeno superior esquerda */}
          <circle
            cx="20%"
            cy="10%"
            r="2.5"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="0.8"
            fill="none"
            opacity="0.4"
            className="animate-circle-pulse-smooth"
          />

          {/* Círculo médio meio direita */}
          <circle
            cx="80%"
            cy="40%"
            r="3"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="0.8"
            fill="none"
            opacity="0.4"
            className="animate-circle-pulse-smooth"
          />

          {/* Círculo pequeno inferior esquerda */}
          <circle
            cx="15%"
            cy="80%"
            r="2"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="0.7"
            fill="none"
            opacity="0.4"
            className="animate-circle-pulse-smooth animate-circle-rotate-smooth"
          />

          {/* Círculo médio centro */}
          <circle
            cx="50%"
            cy="65%"
            r="2.8"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="0.8"
            fill="none"
            opacity="0.35"
            className="animate-circle-pulse-smooth"
          />

          {/* Círculo direita inferior */}
          <circle
            cx="85%"
            cy="75%"
            r="3.5"
            stroke="oklch(0.52 0.12 45)"
            strokeWidth="0.8"
            fill="none"
            opacity="0.35"
            className="animate-circle-pulse-smooth animate-circle-rotate-smooth"
          />

          {/* Novos círculos adicionados */}
          <circle
            cx="75%"
            cy="15%"
            r="2"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="0.7"
            fill="none"
            opacity="0.3"
            className="animate-circle-pulse-smooth"
          />
          <circle
            cx="45%"
            cy="25%"
            r="2.5"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="0.8"
            fill="none"
            opacity="0.4"
            className="animate-circle-pulse-smooth animate-circle-rotate-smooth"
          />
          <circle
            cx="25%"
            cy="55%"
            r="1.8"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="0.6"
            fill="none"
            opacity="0.35"
            className="animate-circle-pulse-smooth"
          />
          <circle
            cx="65%"
            cy="60%"
            r="2.7"
            stroke="oklch(0.52 0.12 45)"
            strokeWidth="0.8"
            fill="none"
            opacity="0.4"
            className="animate-circle-pulse-smooth animate-circle-rotate-smooth"
          />
          <circle
            cx="70%"
            cy="90%"
            r="2.3"
            stroke="oklch(0.58 0.15 35)"
            strokeWidth="0.7"
            fill="none"
            opacity="0.38"
            className="animate-circle-pulse-smooth"
          />
          <circle
            cx="10%"
            cy="30%"
            r="3"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="0.8"
            fill="none"
            opacity="0.4"
            className="animate-circle-pulse-smooth animate-circle-rotate-smooth"
          />
          <circle
            cx="55%"
            cy="45%"
            r="2"
            stroke="oklch(0.62 0.16 38)"
            strokeWidth="0.7"
            fill="none"
            opacity="0.3"
            className="animate-circle-pulse-smooth"
          />
          <circle
            cx="30%"
            cy="70%"
            r="2.5"
            stroke="oklch(0.52 0.12 45)"
            strokeWidth="0.8"
            fill="none"
            opacity="0.4"
            className="animate-circle-pulse-smooth"
          />
        </svg>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 sm:p-10 border border-zinc-200/50">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center mb-6">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                  <Image
                    src="/peixeheader.png"
                    alt="Alice Stamato"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-800 mb-2">
                Área Administrativa
              </h1>
              <p className="text-zinc-600 text-sm sm:text-base font-sans">
                Digite sua senha para acessar
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-zinc-900 font-medium font-sans">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    required
                    disabled={loading}
                    className="text-zinc-900 pl-10 h-12 border-zinc-300 focus:border-oklch(0.58 0.15 35) focus:ring-oklch(0.58 0.15 35) font-sans"
                    autoFocus
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold font-sans !bg-oklch(0.58 0.15 35) hover:!bg-oklch(0.55 0.15 35) !text-white transition-all duration-200 shadow-md hover:shadow-lg disabled:!bg-oklch(0.65 0.12 35) disabled:!opacity-70 disabled:cursor-not-allowed"
                disabled={loading || !password}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Entrar
                  </>
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-zinc-200 text-center">
              <p className="text-xs text-zinc-500 font-sans">
                Alice Stamato - Diretora de Cinema
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

