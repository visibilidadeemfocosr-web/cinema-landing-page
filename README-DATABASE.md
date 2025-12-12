# Configuração do Banco de Dados

## Para Produção (Vercel)

### Opção 1: Supabase (Recomendado - Tudo em um lugar)

1. Crie conta em [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Vá em Settings > Database > Connection String
4. Copie a connection string (URI)
5. Adicione no `.env`:
   ```
   DATABASE_URL="postgresql://user:password@host:5432/database"
   ```

**Limites Free:**
- Banco: 500MB
- Storage: 1GB (vídeos até 50MB cada)

### Opção 2: Supabase + Cloudflare R2 (Para vídeos grandes)

1. Configure Supabase para o banco (passos acima)
2. Configure Cloudflare R2 para vídeos:
   - Crie conta em [cloudflare.com](https://cloudflare.com)
   - Vá em R2 > Create Bucket
   - Configure as credenciais
   - Adicione no `.env`:
     ```
     R2_ACCOUNT_ID="seu-account-id"
     R2_ACCESS_KEY_ID="sua-key"
     R2_SECRET_ACCESS_KEY="seu-secret"
     R2_BUCKET_NAME="nome-do-bucket"
     R2_PUBLIC_URL="https://seu-bucket.r2.cloudflarestorage.com"
     ```

**Limites Free:**
- Banco (Supabase): 500MB
- Storage (R2): 10GB (vídeos ilimitados em tamanho)

## Para Desenvolvimento Local

Você pode usar SQLite localmente mudando o schema:

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

## Comandos Prisma

```bash
# Instalar Prisma
npm install prisma @prisma/client

# Criar banco e tabelas
npx prisma migrate dev --name init

# Ver dados no banco (interface visual)
npx prisma studio
```

## Variáveis de Ambiente

Crie um arquivo `.env.local`:

```env
# Banco de dados (Supabase)
DATABASE_URL="postgresql://..."

# Cloudflare R2 (se usar)
R2_ACCOUNT_ID="..."
R2_ACCESS_KEY_ID="..."
R2_SECRET_ACCESS_KEY="..."
R2_BUCKET_NAME="..."
R2_PUBLIC_URL="..."
```

