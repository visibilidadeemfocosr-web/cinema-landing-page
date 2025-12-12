# Guia de Deploy na Vercel

Este guia irá te ajudar a publicar o projeto na Vercel e configurar o domínio.

## 📋 Pré-requisitos

1. ✅ Projeto commitado no Git (GitHub, GitLab ou Bitbucket)
2. ✅ Conta na Vercel (gratuita): [https://vercel.com](https://vercel.com)
3. ✅ Variáveis de ambiente configuradas

## 🚀 Passo 1: Criar Repositório no GitHub

1. Acesse [https://github.com](https://github.com) e faça login
2. Clique no botão **"+"** no canto superior direito > **"New repository"**
3. **Repository name**: `cinema-landing-page` (ou outro nome)
4. **Description**: "Portfolio de Alice Stamato - Diretora de Cinema"
5. **Visibility**: Escolha **Public** ou **Private**
6. **NÃO** marque "Initialize this repository with a README" (já temos arquivos)
7. Clique em **"Create repository"**

## 🔗 Passo 2: Conectar Repositório Local ao GitHub

No terminal, execute:

```bash
# Adicionar o repositório remoto (substitua SEU_USUARIO pelo seu username do GitHub)
git remote add origin https://github.com/SEU_USUARIO/cinema-landing-page.git

# Renomear branch para main (se necessário)
git branch -M main

# Fazer push do código
git push -u origin main
```

**Nota**: Se você usar SSH ao invés de HTTPS:
```bash
git remote add origin git@github.com:SEU_USUARIO/cinema-landing-page.git
```

## 🌐 Passo 3: Deploy na Vercel

1. Acesse [https://vercel.com](https://vercel.com) e faça login (pode usar GitHub)
2. Clique em **"Add New..."** > **"Project"**
3. **Import Git Repository**: Selecione seu repositório `cinema-landing-page`
4. Clique em **"Import"**

### Configurações do Projeto

5. **Project Name**: `cinema-landing-page` (ou outro nome)
6. **Framework Preset**: Next.js (deve detectar automaticamente)
7. **Root Directory**: `./` (raiz)
8. **Build Command**: `npm run build` (padrão)
9. **Output Directory**: `.next` (padrão)
10. **Install Command**: `npm install` (padrão)

### Variáveis de Ambiente

11. Clique em **"Environment Variables"** e adicione:

```
DATABASE_URL=postgresql://postgres.SEU_REF_ID:[SUA_SENHA]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres
R2_ACCOUNT_ID=seu-account-id
R2_ACCESS_KEY_ID=sua-access-key-id
R2_SECRET_ACCESS_KEY=sua-secret-access-key
R2_BUCKET_NAME=alicestamato
R2_PUBLIC_URL=https://pub-SEU_ID.r2.dev
ADMIN_PASSWORD=sua-senha-segura-aqui
```

**🔐 Sobre ADMIN_PASSWORD**:
- Esta é a senha para acessar a área administrativa (`/admin`)
- Se não for definida, o padrão será `101113Al`
- Para maior segurança, defina uma senha personalizada na variável de ambiente

**⚠️ IMPORTANTE**: 
- Substitua todos os valores pelos seus valores reais
- Use a connection string do Supabase com **Session Pooler** (porta 6543)
- Não use a connection string direta (porta 5432) na Vercel

12. Clique em **"Deploy"**

## ⏳ Passo 4: Aguardar Build

- O build pode levar 2-5 minutos
- A Vercel irá:
  - Instalar dependências
  - Executar `prisma generate`
  - Fazer build do Next.js
  - Fazer deploy

## 🗄️ Passo 5: Configurar Banco de Dados na Vercel

Após o deploy, você precisa rodar as migrações do Prisma:

1. Na Vercel, vá em **"Settings"** > **"Functions"**
2. Ou use o terminal da Vercel CLI:

```bash
# Instalar Vercel CLI (se ainda não tiver)
npm i -g vercel

# Fazer login
vercel login

# Linkar projeto
vercel link

# Rodar migrações (usando Vercel CLI)
vercel env pull .env.local
npx prisma migrate deploy
```

**Alternativa**: Use o Prisma Studio localmente após configurar as variáveis de ambiente.

## 🌍 Passo 6: Configurar Domínio Personalizado

1. Na Vercel, vá em **"Settings"** > **"Domains"**
2. Digite seu domínio (ex: `alicestamato.com.br`)
3. Clique em **"Add"**

### Configuração DNS

A Vercel irá mostrar as instruções de DNS. Você precisa adicionar os seguintes registros no seu provedor de domínio:

**Opção 1: Apex Domain (domínio raiz)**
```
Tipo: A
Nome: @
Valor: 76.76.21.21
```

**Opção 2: Subdomínio (www)**
```
Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
```

**Opção 3: Configuração Automática (Recomendado)**
- A Vercel pode configurar automaticamente se você usar um provedor compatível
- Siga as instruções na tela da Vercel

### Verificar DNS

Após adicionar os registros DNS:
- Pode levar até 48 horas para propagar (geralmente 1-2 horas)
- A Vercel mostrará o status: "Valid Configuration" quando estiver correto

### 📖 Guia Detalhado para Registro.br

**Para domínios `.br` registrados no Registro.br**, consulte o guia completo:
👉 **[CONFIGURAR-REGISTRO-BR.md](./CONFIGURAR-REGISTRO-BR.md)**

Este guia inclui:
- Passo a passo detalhado para o painel do Registro.br
- Como configurar registros A e CNAME
- Como verificar propagação DNS
- Solução de problemas comuns

## ✅ Passo 7: Verificar Deploy

1. Acesse a URL fornecida pela Vercel (ex: `cinema-landing-page.vercel.app`)
2. Teste:
   - ✅ Página inicial carrega
   - ✅ Admin funciona (`/admin`)
   - ✅ Upload de vídeos funciona
   - ✅ Listagem de filmes funciona

## 🔧 Troubleshooting

### Erro: "Prisma Client not generated"
```bash
# Adicione ao package.json scripts:
"postinstall": "prisma generate"
```

### Erro: "Database connection failed"
- Verifique se a `DATABASE_URL` está correta
- Use **Session Pooler** (porta 6543) na Vercel
- Verifique se o Supabase permite conexões externas

### Erro: "R2 upload failed"
- Verifique todas as variáveis R2_* estão configuradas
- Verifique se o bucket R2 está público (Public Development URL habilitada)

### Build falha
- Verifique os logs na Vercel
- Certifique-se de que todas as dependências estão no `package.json`
- Verifique se não há erros de TypeScript

## 📝 Notas Importantes

1. **Variáveis de Ambiente**: Nunca commite `.env.local` no Git
2. **Banco de Dados**: Use sempre **Session Pooler** na produção (porta 6543)
3. **R2**: Certifique-se de que o bucket está configurado como público
4. **Domínio**: DNS pode levar até 48h para propagar completamente

## 🎉 Pronto!

Seu site estará online e acessível pelo seu domínio personalizado!

