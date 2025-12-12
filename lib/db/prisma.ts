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
    
    const prismaOptions: any = {
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    }
    
    const client = new PrismaClient(prismaOptions)
    
    return client
  } catch (error) {
    console.error('Erro ao criar Prisma Client:', error)
    if (error instanceof Error && error.message.includes('PrismaClient')) {
      console.error('⚠️ Execute: npx prisma generate')
    }
    throw error
  }
}

// Reutilizar instância global para evitar múltiplas conexões
// Em Vercel/serverless, o globalThis pode não ser compartilhado entre invocações,
// mas ainda é melhor tentar reutilizar quando possível
export const prisma =
  globalForPrisma.prisma ?? createPrismaClient()

// Armazenar na instância global para reutilização
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prisma
}

// Função helper para executar queries com tratamento de erro de prepared statement
export async function withPrisma<T>(
  operation: (client: PrismaClient) => Promise<T>
): Promise<T> {
  try {
    // Garantir que está conectado
    await prisma.$connect()
    return await operation(prisma)
  } catch (error: any) {
    // Se for erro de prepared statement, tentar desconectar e reconectar
    if (error?.message?.includes('prepared statement') || 
        error?.code === '42P05') {
      console.warn('Erro de prepared statement detectado, tentando reconectar...')
      try {
        await prisma.$disconnect()
        await prisma.$connect()
        // Tentar novamente após reconectar
        return await operation(prisma)
      } catch (retryError) {
        console.error('Erro ao reconectar:', retryError)
        throw retryError
      }
    }
    throw error
  }
}

