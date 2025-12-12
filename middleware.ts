import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Verificar se é uma rota protegida
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const session = request.cookies.get('admin-session')

    // Se não tem sessão, redirecionar para login
    if (!session || session.value !== 'authenticated') {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Permitir acesso às rotas de API de autenticação
  if (request.nextUrl.pathname.startsWith('/api/auth/login')) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/auth/login',
  ],
}

