import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'

const filmSchema = z.object({
  title: z.string().min(1).optional(),
  titleEn: z.string().optional(),
  titleEs: z.string().optional(),
  description: z.string().optional(),
  descriptionEn: z.string().optional(),
  descriptionEs: z.string().optional(),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional(),
  duration: z.string().regex(/^\d{2}:\d{2}:\d{2}$/).optional(),
  category: z.enum(['Ficção', 'Drama', 'Documentário', 'Comercial']).optional(),
  type: z.enum(['Vídeo Clipe', 'Curta Metragem', 'Longa Metragem', 'Propaganda', 'Institucional', 'Trailler', 'Em Desenvolvimento']).optional(),
  thumbnail: z.union([z.string().url(), z.literal('')]).optional(),
  videoUrl: z.string().url().optional(),
  videoSize: z.number().int().positive().optional(),
  videoFormat: z.string().optional(),
  isPublished: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
})

// GET - Buscar filme por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const film = await prisma.film.findUnique({
      where: { id },
    })

    if (!film) {
      return NextResponse.json(
        { success: false, message: 'Filme não encontrado' },
        { status: 404 }
      )
    }

    // Incrementar visualizações
    await prisma.film.update({
      where: { id },
      data: { views: { increment: 1 } },
    })

    return NextResponse.json({ success: true, data: film }, { status: 200 })
  } catch (error) {
    console.error('Erro ao buscar filme:', error)
    return NextResponse.json(
      { success: false, message: 'Erro ao buscar filme' },
      { status: 500 }
    )
  }
}

// PATCH - Atualizar filme
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    // Limpar campos vazios antes de validar
    const cleanedBody: any = {}
    Object.keys(body).forEach((key) => {
      const value = body[key]
      if (value !== undefined && value !== null && value !== '') {
        cleanedBody[key] = value
      }
    })
    
    const validatedData = filmSchema.parse(cleanedBody)

    const film = await prisma.film.update({
      where: { id },
      data: validatedData,
    })

    return NextResponse.json({ success: true, data: film }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Erro de validação:', error.errors)
      return NextResponse.json(
        {
          success: false,
          message: 'Dados inválidos',
          errors: error.errors,
        },
        { status: 400 }
      )
    }

    console.error('Erro ao atualizar filme:', error)
    const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar filme'
    const errorStack = error instanceof Error ? error.stack : undefined
    
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        ...(process.env.NODE_ENV === 'development' && errorStack && { stack: errorStack })
      },
      { status: 500 }
    )
  }
}

// DELETE - Deletar filme
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.film.delete({
      where: { id },
    })

    return NextResponse.json(
      { success: true, message: 'Filme deletado com sucesso' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro ao deletar filme:', error)
    return NextResponse.json(
      { success: false, message: 'Erro ao deletar filme' },
      { status: 500 }
    )
  }
}

