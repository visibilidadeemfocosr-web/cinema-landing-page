# 🎬 Setup do Sistema de Filmes

## 📋 Pré-requisitos

1. Node.js 18+ instalado
2. Conta no Supabase (para banco de dados)
3. Conta no Cloudflare (para storage de vídeos - opcional)

## 🚀 Passo a Passo

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Banco de Dados (Supabase)

1. Acesse [supabase.com](https://supabase.com) e crie uma conta
2. Crie um novo projeto
3. Vá em **Settings > Database > Connection String**
4. Copie a connection string (URI format)
5. Crie arquivo `.env.local` na raiz do projeto:

```env
DATABASE_URL="postgresql://user:password@host:5432/database"
```

### 3. Configurar Prisma

```bash
# Gerar cliente Prisma
npx prisma generate

# Criar tabelas no banco
npx prisma migrate dev --name init

# (Opcional) Abrir interface visual do banco
npx prisma studio
```

### 4. Configurar Cloudflare R2 (Para vídeos grandes)

1. Acesse [cloudflare.com](https://cloudflare.com) e crie uma conta
2. Vá em **R2 > Create Bucket**
3. Dê um nome ao bucket (ex: `cinema-films`)
4. Vá em **Manage R2 API Tokens > Create API Token**
5. Copie as credenciais
6. Adicione no `.env.local`:

```env
R2_ACCOUNT_ID="seu-account-id"
R2_ACCESS_KEY_ID="sua-access-key"
R2_SECRET_ACCESS_KEY="seu-secret-key"
R2_BUCKET_NAME="cinema-films"
R2_PUBLIC_URL="https://pub-xxxxx.r2.dev" # URL pública do bucket
```

### 5. Rodar o Projeto

```bash
npm run dev
```

## 📁 Estrutura Criada

```
app/api/
├── films/
│   ├── route.ts          # Listar e criar filmes
│   └── [id]/route.ts     # Buscar, atualizar, deletar
├── upload/
│   └── route.ts          # Upload de vídeos para R2
└── contact/
    └── route.ts          # Mensagens de contato (salva no banco)

lib/
├── db/
│   └── prisma.ts         # Cliente Prisma
└── hooks/
    └── use-films.ts      # Hook para buscar filmes

components/
└── video-player.tsx      # Player de vídeo customizado
```

## 🎥 Como Usar

### Adicionar um Filme

```typescript
// POST /api/films
{
  "title": "Nome do Filme",
  "titleEn": "Movie Name",
  "titleEs": "Nombre de la Película",
  "year": 2024,
  "duration": "01:45:30",
  "category": "Ficção",
  "videoUrl": "https://r2.cloudflare.com/filme.mp4",
  "videoSize": 15728640000, // bytes
  "videoFormat": "mp4",
  "thumbnail": "https://...",
  "isPublished": true
}
```

### Fazer Upload de Vídeo

```typescript
const formData = new FormData()
formData.append('file', videoFile)

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
})

const { data } = await response.json()
// data.url contém a URL do vídeo no R2
```

### Listar Filmes

```typescript
// GET /api/films?published=true&category=Ficção
const response = await fetch('/api/films?published=true')
const { data } = await response.json()
```

## 🔧 Comandos Úteis

```bash
# Ver dados no banco
npx prisma studio

# Criar nova migração
npx prisma migrate dev --name nome-da-migracao

# Resetar banco (CUIDADO: apaga tudo)
npx prisma migrate reset

# Gerar tipos TypeScript
npx prisma generate
```

## 📝 Variáveis de Ambiente

Crie um arquivo `.env.local`:

```env
# Banco de dados
DATABASE_URL="postgresql://..."

# Cloudflare R2 (opcional)
R2_ACCOUNT_ID="..."
R2_ACCESS_KEY_ID="..."
R2_SECRET_ACCESS_KEY="..."
R2_BUCKET_NAME="..."
R2_PUBLIC_URL="..."
```

## ⚠️ Limites

### Supabase Free:
- Banco: 500MB
- Storage: 1GB (vídeos até 50MB cada)

### Cloudflare R2 Free:
- Storage: 10GB
- Bandwidth: Ilimitado
- Tamanho de arquivo: Ilimitado

## 🚀 Deploy na Vercel

1. Configure as variáveis de ambiente na Vercel
2. Faça push do código
3. A Vercel vai rodar `prisma generate` automaticamente
4. Execute as migrações manualmente ou use `prisma migrate deploy`

```bash
# Na Vercel, adicione este build command:
npx prisma generate && npm run build
```

## 🎯 Próximos Passos

- [ ] Criar painel admin para gerenciar filmes
- [ ] Adicionar autenticação
- [ ] Implementar busca e filtros
- [ ] Adicionar analytics de visualizações
- [ ] Otimizar vídeos (transcoding)

