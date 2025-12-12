# 🔧 Corrigir Erro "prepared statement already exists" no Vercel

## Problema

O erro `prepared statement "s2" already exists` ocorre porque o Supabase em serverless (Vercel) precisa usar **Connection Pooling**.

## Solução: Usar Connection Pooling do Supabase

### Passo 1: Obter URL de Connection Pooling

1. Acesse o dashboard do Supabase: https://supabase.com
2. Selecione seu projeto
3. Vá em **Settings** (ícone de engrenagem) > **Database**
4. Role até **Connection String**
5. **IMPORTANTE**: Selecione a aba **"Session mode"** (não "Transaction mode")
6. Copie a URL que aparece (deve conter `pooler` ou `pgbouncer`)

A URL deve ser algo como:
```
postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**OU** (dependendo da região):
```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:6543/postgres?pgbouncer=true
```

### Passo 2: Atualizar no Vercel

1. Acesse o Vercel Dashboard: https://vercel.com
2. Selecione seu projeto
3. Vá em **Settings** > **Environment Variables**
4. Encontre a variável `DATABASE_URL`
5. Clique em **Edit**
6. Cole a **nova URL de Connection Pooling** (com `pooler` ou `pgbouncer`)
7. Clique em **Save**
8. **IMPORTANTE**: Selecione os ambientes onde aplicar (Production, Preview, Development)
9. Faça um novo deploy ou aguarde o próximo deploy automático

### Passo 3: Verificar

Após o deploy, teste:
- `https://alicestamato.com.br/api/health` - deve retornar `databaseConnection: true`
- `https://alicestamato.com.br/api/films?published=true` - deve retornar os filmes

## Diferença entre as URLs

### ❌ URL Direta (causa erro em serverless):
```
postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```
- Porta: `5432`
- Sem `pooler` ou `pgbouncer`
- **NÃO funciona bem em serverless**

### ✅ URL com Connection Pooling (correta para Vercel):
```
postgresql://postgres.xxxxx:[PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```
- Porta: `6543` (ou `5432` com `?pgbouncer=true`)
- Contém `pooler` ou `pgbouncer`
- **Funciona perfeitamente em serverless**

## Por que isso acontece?

Em ambientes serverless (Vercel), cada requisição pode ser executada em uma função diferente. O Prisma tenta reutilizar prepared statements, mas em serverless isso causa conflitos. O Connection Pooling (PgBouncer) gerencia essas conexões corretamente.

## Verificação Rápida

Se sua URL contém:
- ✅ `pooler` ou `pgbouncer` → **Está correto!**
- ❌ Apenas `db.xxxxx.supabase.co:5432` → **Precisa atualizar!**

