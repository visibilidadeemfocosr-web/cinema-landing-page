import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Verificar se DATABASE_URL está configurado
if (!process.env.DATABASE_URL) {
  console.error('⚠️ DATABASE_URL não está configurado!')
}

function createPrismaClient() {
  try {
    // Verificar se Prisma Client está disponível
    if (typeof PrismaClient === 'undefined') {
      throw new Error('PrismaClient não está disponível. Execute: npx prisma generate')
    }
    
    return new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
  } catch (error) {
    console.error('Erro ao criar Prisma Client:', error)
    if (error instanceof Error && error.message.includes('PrismaClient')) {
      console.error('⚠️ Execute: npx prisma generate')
    }
    throw error
  }
}

export const prisma =
  globalForPrisma.prisma ??
  createPrismaClient()

// Em produção, também reutilizar a instância global
if (process.env.NODE_ENV === 'production') {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = prisma
  }
} else {
  globalForPrisma.prisma = prisma
}

