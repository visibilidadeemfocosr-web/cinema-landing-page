import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Verificar se DATABASE_URL está configurado
if (!process.env.DATABASE_URL) {
  console.error('⚠️ DATABASE_URL não está configurado!')
} else {
  // Verificar se está usando connection pooling (necessário para serverless)
  const dbUrl = process.env.DATABASE_URL
  if ((process.env.VERCEL || process.env.NODE_ENV === 'production') && 
      !dbUrl.includes('pgbouncer') && 
      !dbUrl.includes('pooler') &&
      dbUrl.includes('supabase')) {
    console.warn('⚠️ ATENÇÃO: Para Supabase em produção, use a URL de Connection Pooling!')
    console.warn('   Vá em Supabase > Settings > Database > Connection String > Session mode')
    console.warn('   Use a URL que contém "pooler" ou "pgbouncer"')
  }
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
// O problema de "prepared statement already exists" é resolvido usando
// connection pooling no DATABASE_URL (PgBouncer para Supabase)
export const prisma =
  globalForPrisma.prisma ?? createPrismaClient()

// Armazenar na instância global para reutilização
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prisma
}

