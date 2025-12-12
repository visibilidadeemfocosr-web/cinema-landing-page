# 🔍 Como Encontrar Connection String no Supabase

## Opção 1: Verificar no Vercel (Mais Rápido)

1. Acesse: https://vercel.com
2. Selecione seu projeto
3. Vá em **Settings** > **Environment Variables**
4. Encontre `DATABASE_URL` e veja qual URL está configurada

**Se a URL atual for:**
```
postgresql://postgres:[SENHA]@db.xxxxx.supabase.co:5432/postgres
```

**Transforme para Connection Pooling:**
```
postgresql://postgres.xxxxx:[SENHA]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**OU** (dependendo da região):
```
postgresql://postgres:[SENHA]@db.xxxxx.supabase.co:6543/postgres?pgbouncer=true
```

## Opção 2: Procurar no Supabase

### Método A: Settings > API
1. No Supabase, vá em **Settings** (⚙️) > **API**
2. Procure por "Database URL" ou "Connection String"
3. Pode estar em uma seção chamada "Database" ou "Connection Info"

### Método B: Project Settings
1. No Supabase, clique no nome do projeto (canto superior esquerdo)
2. Vá em **Project Settings**
3. Procure por "Database" ou "Connection String"

### Método C: Na página Database
1. Vá em **Database** (menu lateral)
2. Procure por uma aba ou seção chamada "Connection String" ou "Connection Info"
3. Pode estar no topo da página, não no final

## Opção 3: Construir Manualmente

Se você tem a URL atual do Vercel, posso ajudar a transformá-la na URL de pooling.

**Formato da URL de Pooling:**
- **Host**: `aws-0-sa-east-1.pooler.supabase.com` (ou similar com `pooler`)
- **Porta**: `6543` (Session mode)
- **Parâmetro**: `?pgbouncer=true`

## ⚠️ Importante

A URL de Connection Pooling **sempre** tem:
- ✅ Porta `6543` (ou `5432` com `?pgbouncer=true`)
- ✅ Contém `pooler` no hostname
- ✅ Termina com `?pgbouncer=true`

## 🆘 Se Não Encontrar

Me envie a URL atual que está no Vercel (sem a senha) e eu ajudo a transformá-la!

