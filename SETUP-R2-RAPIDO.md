# 🚀 SETUP RÁPIDO - Cloudflare R2 (10 minutos)

## Passo 1: Criar Conta no Cloudflare (2 min)

1. Acesse: https://cloudflare.com
2. Clique em **"Sign Up"** (ou faça login se já tiver conta)
3. É **GRATUITO** - não precisa de cartão de crédito

## Passo 2: Criar Bucket R2 (3 min)

1. No dashboard do Cloudflare, vá em **R2** (menu lateral)
2. Clique em **"Create bucket"**
3. Preencha:
   - **Bucket name**: `cinema-films` (ou outro nome)
   - **Location**: Escolha a mais próxima (ex: `South America`)
4. Clique em **"Create bucket"**

## Passo 3: Criar API Token (3 min)

1. Ainda na página do R2, clique em **"Manage R2 API Tokens"** (ou vá em **Settings** > **R2 API Tokens**)
2. Clique em **"Create API token"**
3. Preencha:
   - **Token name**: `cinema-upload-token`
   - **Permissions**: **Object Read & Write**
   - **TTL**: Deixe em branco (sem expiração)
   - **Bucket access**: Selecione o bucket que você criou
4. Clique em **"Create API Token"**
5. **IMPORTANTE**: Copie e salve:
   - **Access Key ID**
   - **Secret Access Key**
   - Você só verá o Secret uma vez!

## Passo 4: Configurar Domínio Público (2 min)

1. No bucket que você criou, vá em **Settings**
2. Role até **"Public Access"**
3. Clique em **"Allow Access"** ou **"Connect Domain"**
4. Se usar domínio próprio, configure. Se não, o Cloudflare fornece uma URL pública automaticamente
5. Anote a **URL pública** do bucket (algo como `https://pub-xxxxx.r2.dev`)

## Passo 5: Obter Account ID

1. No dashboard do Cloudflare, no canto superior direito, clique no seu **Account ID**
2. Copie o ID (aparece algo como `abc123def456...`)

## Passo 6: Adicionar ao .env.local

Adicione estas variáveis ao seu `.env.local`:

```env
R2_ACCOUNT_ID="seu-account-id-aqui"
R2_ACCESS_KEY_ID="sua-access-key-id"
R2_SECRET_ACCESS_KEY="seu-secret-access-key"
R2_BUCKET_NAME="cinema-films"
R2_PUBLIC_URL="https://pub-xxxxx.r2.dev"
```

## ✅ Pronto!

Agora você pode fazer upload de filmes de até **15GB** diretamente pela página admin!

## 📝 Limites R2 Free:

- **10GB de armazenamento** gratuito
- **Bandwidth ilimitado**
- **Arquivos ilimitados** (sem limite de tamanho por arquivo)
- **Sem custos escondidos**

## 🆘 Problemas?

- **Erro de autenticação**: Verifique se copiou o Secret Access Key corretamente
- **Erro de bucket**: Verifique se o nome do bucket está correto
- **URL não funciona**: Verifique se o Public Access está habilitado

