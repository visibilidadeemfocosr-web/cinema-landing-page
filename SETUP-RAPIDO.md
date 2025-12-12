# 🚀 SETUP RÁPIDO - Banco de Dados (2 horas)

## Passo 1: Criar Novo Projeto no Supabase (5 min)

1. Acesse: https://supabase.com
2. Faça login ou crie uma conta
3. Clique em **"New Project"**
4. Preencha:
   - **Name**: `cinema-landing-page` (ou outro nome)
   - **Database Password**: Anote essa senha! Você vai precisar
   - **Region**: Escolha a mais próxima (ex: `South America (São Paulo)`)
   - **Pricing Plan**: Free (suficiente para começar)
5. Clique em **"Create new project"**
6. Aguarde 1-2 minutos para o projeto ser criado

## Passo 2: Obter Connection String (2 min)

1. No dashboard do Supabase, vá em **Settings** (ícone de engrenagem no menu lateral)
2. Clique em **Database**
3. Role até **Connection String**
4. Selecione a aba **"URI"**
5. Copie a string que aparece (algo como):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
6. **IMPORTANTE**: Substitua `[YOUR-PASSWORD]` pela senha que você criou no Passo 1

## Passo 3: Configurar .env.local (1 min)

1. No terminal, na raiz do projeto, execute:
   ```bash
   touch .env.local
   ```

2. Abra o arquivo `.env.local` e adicione:
   ```env
   DATABASE_URL="postgresql://postgres:SUA_SENHA_AQUI@db.xxxxx.supabase.co:5432/postgres"
   ```
   (Substitua `SUA_SENHA_AQUI` e `xxxxx` pelos valores reais)

## Passo 4: Rodar Migrações do Prisma (2 min)

1. No terminal, execute:
   ```bash
   npx prisma generate
   ```

2. Depois execute:
   ```bash
   npx prisma db push
   ```

3. Isso vai criar as tabelas `Film` e `ContactMessage` no banco

## Passo 5: Verificar se Funcionou (1 min)

1. No Supabase, vá em **Table Editor**
2. Você deve ver duas tabelas:
   - `Film`
   - `ContactMessage`

✅ **Pronto!** Seu banco está configurado!

## ⚠️ IMPORTANTE PARA PRODUÇÃO (Vercel)

Quando for fazer deploy na Vercel:

1. Vá em **Settings** > **Environment Variables**
2. Adicione a variável `DATABASE_URL` com o mesmo valor do `.env.local`
3. Faça o deploy novamente

## 🆘 Problemas Comuns

- **Erro de conexão**: Verifique se a senha está correta na connection string
- **Erro "relation does not exist"**: Execute `npx prisma db push` novamente
- **Erro de autenticação**: Verifique se copiou a connection string completa

