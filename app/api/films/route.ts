import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'

// Schema de validação para criar/atualizar filme
const filmSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  titleEn: z.string().optional(),
  titleEs: z.string().optional(),
  description: z.string().optional(),
  descriptionEn: z.string().optional(),
  descriptionEs: z.string().optional(),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  duration: z.string().regex(/^\d{2}:\d{2}:\d{2}$/, 'Duração deve estar no formato HH:MM:SS'),
  category: z.enum(['Ficção', 'Drama', 'Documentário', 'Comercial']),
  type: z.enum(['Vídeo Clipe', 'Curta Metragem', 'Longa Metragem', 'Propaganda', 'Institucional']).optional(),
  thumbnail: z.union([z.string().url(), z.literal('')]).optional(),
  videoUrl: z.string().url('URL do vídeo é obrigatória'),
  videoSize: z.union([z.number().int().positive(), z.undefined()]).optional(),
  videoFormat: z.union([z.string().min(1), z.undefined()]).optional(),
  isPublished: z.boolean().optional().default(false),
  displayOrder: z.number().int().optional().default(0),
})

// GET - Listar filmes
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const published = searchParams.get('published')
    const category = searchParams.get('category')

    const where: any = {}
    
    if (published === 'true') {
      where.isPublished = true
    }
    
    if (category) {
      where.category = category
    }

    // Verificar se Prisma está disponível
    if (!prisma) {
      console.error('Prisma Client não está disponível')
      // Retornar array vazio em vez de erro para não quebrar a página
      return NextResponse.json(
        { 
          success: true, 
          data: [],
          message: 'Prisma Client não inicializado - retornando array vazio'
        },
        { status: 200 }
      )
    }

    // Verificar se DATABASE_URL está configurado
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL não está configurado')
      // Retornar array vazio em vez de erro
      return NextResponse.json(
        { 
          success: true, 
          data: [],
          message: 'DATABASE_URL não configurado - retornando array vazio'
        },
        { status: 200 }
      )
    }

    // Log para debug: verificar se está usando pooling
    if (process.env.VERCEL && process.env.DATABASE_URL) {
      const dbUrl = process.env.DATABASE_URL
      const hasPooling = dbUrl.includes('pooler') || dbUrl.includes('pgbouncer')
      console.log('DATABASE_URL pooling check:', { 
        hasPooling, 
        port: dbUrl.match(/:\d+/)?.[0],
        hasPooler: dbUrl.includes('pooler'),
        hasPgbouncer: dbUrl.includes('pgbouncer')
      })
    }

    // Buscar filmes e ordenar manualmente para lidar com valores null
    // Tratar erro de prepared statement tentando reconectar se necessário
    let films
    try {
      films = await prisma.film.findMany({
        where,
      })
    } catch (preparedStatementError: any) {
      // Se for erro de prepared statement, tentar desconectar e reconectar
      if (preparedStatementError?.message?.includes('prepared statement') || 
          preparedStatementError?.code === '42P05') {
        console.warn('Erro de prepared statement detectado, tentando reconectar...')
        try {
          await prisma.$disconnect()
          await prisma.$connect()
          // Tentar novamente após reconectar
          films = await prisma.film.findMany({
            where,
          })
        } catch (retryError) {
          console.error('Erro ao reconectar após prepared statement:', retryError)
          throw retryError
        }
      } else {
        throw preparedStatementError
      }
    }

    // Ordenar: primeiro por displayOrder DECRESCENTE (maior número primeiro, nulls por último), depois por createdAt
    films.sort((a, b) => {
      const aOrder = a.displayOrder ?? -1 // nulls vão para o final
      const bOrder = b.displayOrder ?? -1
      
      if (aOrder !== bOrder) {
        return bOrder - aOrder // Ordem DECRESCENTE (maior primeiro)
      }
      
      // Se displayOrder for igual, ordenar por data de criação (mais recente primeiro)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    return NextResponse.json(
      { success: true, data: films }, 
      { 
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      }
    )
  } catch (error) {
    console.error('Erro ao listar filmes:', error)
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
    const errorStack = error instanceof Error ? error.stack : undefined
    
    // Log detalhado em produção também para debug
    if (error instanceof Error) {
      console.error('Erro detalhado:', {
        message: error.message,
        name: error.name,
        ...(errorStack && { stack: errorStack.substring(0, 500) }) // Limitar tamanho do stack
      })
    }
    
    // Em caso de erro, retornar array vazio em vez de erro 500 para não quebrar a página
    // Isso permite que a página carregue mesmo se houver problema com o banco
    return NextResponse.json(
      { 
        success: true, 
        data: [],
        message: 'Erro ao buscar filmes - retornando array vazio',
        error: errorMessage,
        ...(process.env.NODE_ENV === 'development' && errorStack && { stack: errorStack })
      },
      { status: 200 } // Retornar 200 com array vazio em vez de 500
    )
  }
}

// POST - Criar novo filme
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Log para debug (apenas em desenvolvimento)
    if (process.env.NODE_ENV === 'development') {
      console.log('Body recebido:', JSON.stringify(body, null, 2))
    }
    
    // Validar category primeiro
    const validCategories = ['Ficção', 'Drama', 'Documentário', 'Comercial']
    if (body.category && !validCategories.includes(body.category)) {
      return NextResponse.json(
        {
          success: false,
          message: `Categoria inválida: "${body.category}". Use uma das seguintes: ${validCategories.join(', ')}`,
        },
        { status: 400 }
      )
    }
    
    // Limpar campos vazios antes de validar
    const cleanedBody: any = {}
    Object.keys(body).forEach((key) => {
      const value = body[key]
      // Incluir apenas valores que não são undefined, null ou string vazia
      if (value !== undefined && value !== null && value !== '') {
        cleanedBody[key] = value
      }
    })
    
    // Remover videoSize e videoFormat se forem 0, vazios ou undefined (não enviar ao Prisma)
    if (cleanedBody.videoSize === 0 || cleanedBody.videoSize === undefined || cleanedBody.videoSize === null) {
      delete cleanedBody.videoSize
    }
    if (cleanedBody.videoFormat === '' || cleanedBody.videoFormat === undefined || cleanedBody.videoFormat === null || cleanedBody.videoFormat === 'mp4') {
      delete cleanedBody.videoFormat
    }
    
    // Validar com Zod
    const validatedData = filmSchema.parse(cleanedBody)
    
    // Criar objeto para Prisma - incluir apenas campos que existem e não são undefined
    // Campos opcionais que não foram fornecidos não devem ser incluídos
    const prismaData: any = {}
    const allowedKeys = [
      'title', 'titleEn', 'titleEs', 'description', 'descriptionEn', 'descriptionEs',
      'year', 'duration', 'category', 'type', 'thumbnail', 'videoUrl',
      'videoSize', 'videoFormat', 'isPublished', 'displayOrder'
    ]
    
    for (const key of allowedKeys) {
      if (key in validatedData && (validatedData as any)[key] !== undefined) {
        prismaData[key] = (validatedData as any)[key]
      }
    }
    
    // Log para debug (apenas em desenvolvimento)
    if (process.env.NODE_ENV === 'development') {
      console.log('cleanedBody:', JSON.stringify(cleanedBody, null, 2))
      console.log('validatedData:', JSON.stringify(validatedData, null, 2))
      console.log('Dados para Prisma:', JSON.stringify(prismaData, null, 2))
      console.log('Keys em prismaData:', Object.keys(prismaData))
    }

    // Criar filme
    // Campos opcionais que não foram incluídos serão null no banco (comportamento padrão do Prisma)
    const film = await prisma.film.create({
      data: prismaData,
    })

    return NextResponse.json(
      { success: true, data: film },
      { status: 201 }
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

    console.error('Erro ao criar filme:', error)
    const errorMessage = error instanceof Error ? error.message : 'Erro ao criar filme'
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        ...(process.env.NODE_ENV === 'development' && { details: String(error) })
      },
      { status: 500 }
    )
  }
}

