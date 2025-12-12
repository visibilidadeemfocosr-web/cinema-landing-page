import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('admin-session')

    return NextResponse.json(
      { success: true, message: 'Logout realizado com sucesso' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro ao fazer logout:', error)
    return NextResponse.json(
      { success: false, message: 'Erro ao processar logout' },
      { status: 500 }
    )
  }
}

