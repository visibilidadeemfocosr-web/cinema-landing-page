import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'

// Schema de validação
const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100),
  email: z.string().email('Email inválido'),
  subject: z.string().min(3, 'Assunto deve ter pelo menos 3 caracteres').max(200),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres').max(2000),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validação dos dados
    const validatedData = contactSchema.parse(body)

    // Salvar no banco de dados
    await prisma.contactMessage.create({
      data: validatedData,
    })

    // Aqui você pode integrar com:
    // - Serviço de email (Resend, SendGrid, etc.)
    // - Webhook para notificações

    return NextResponse.json(
      {
        success: true,
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Dados inválidos',
          errors: error.errors,
        },
        { status: 400 }
      )
    }

    console.error('Erro ao processar formulário:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Erro ao enviar mensagem. Tente novamente mais tarde.',
      },
      { status: 500 }
    )
  }
}

