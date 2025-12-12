import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
  try {
    // Verificar se DATABASE_URL está configurado
    const hasDatabaseUrl = !!process.env.DATABASE_URL
    
    // Verificar se Prisma Client está disponível
    const hasPrisma = !!prisma
    
    // Tentar conectar ao banco
    let dbConnected = false
    let dbError = null
    
    if (hasPrisma && hasDatabaseUrl) {
      try {
        await prisma.$connect()
        // Testar uma query simples
        await prisma.$queryRaw`SELECT 1`
        dbConnected = true
        await prisma.$disconnect()
      } catch (error) {
        dbError = error instanceof Error ? error.message : String(error)
      }
    }
    
    return NextResponse.json({
      status: 'ok',
      checks: {
        databaseUrl: hasDatabaseUrl,
        prismaClient: hasPrisma,
        databaseConnection: dbConnected,
        ...(dbError && { error: dbError }),
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

