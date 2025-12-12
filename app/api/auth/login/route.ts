import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    // Senha armazenada em variável de ambiente
    const adminPassword = process.env.ADMIN_PASSWORD || '101113Al'

    if (!password || password !== adminPassword) {
      return NextResponse.json(
        { success: false, message: 'Senha incorreta' },
        { status: 401 }
      )
    }

    // Criar cookie de sessão (válido por 24 horas)
    const cookieStore = await cookies()
    cookieStore.set('admin-session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 horas
      path: '/',
    })

    return NextResponse.json(
      { success: true, message: 'Login realizado com sucesso' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro ao fazer login:', error)
    return NextResponse.json(
      { success: false, message: 'Erro ao processar login' },
      { status: 500 }
    )
  }
}

