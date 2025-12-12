# Diagnóstico: Vídeos Não Aparecem no Site

## 🔍 Possíveis Causas

1. **Filmes não estão marcados como publicados**
2. **Erro de conexão com o banco de dados**
3. **Erro na API não visível**

## ✅ Passo 1: Verificar se os Filmes Estão Publicados

1. Acesse a página admin: `https://seu-dominio.vercel.app/admin`
2. Verifique a lista de filmes
3. Veja se há filmes com status "Publicado" (verde) ou "Rascunho" (laranja)
4. **Se estiverem como "Rascunho":**
   - Clique em "Editar" em cada filme
   - Marque a checkbox "Publicar imediatamente"
   - Salve o filme

## 🔍 Passo 2: Verificar Logs da Vercel

1. Acesse: https://vercel.com/dashboard
2. Clique no projeto `cinema-landing-page`
3. Vá em **"Deployments"**
4. Clique no último deployment
5. Vá em **"Functions"** ou **"Logs"**
6. Procure por erros relacionados a:
   - `DATABASE_URL`
   - `Prisma`
   - `films`
   - `api/films`

## 🧪 Passo 3: Testar a API Diretamente

Abra no navegador:
```
https://seu-dominio.vercel.app/api/films?published=true
```

**Resultado esperado:**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "title": "...",
      "isPublished": true,
      ...
    }
  ]
}
```

**Se der erro:**
- Verifique se a `DATABASE_URL` está correta na Vercel
- Verifique se a porta é `6543` (Session Pooler)
- Verifique os logs da Vercel para mais detalhes

## 🔧 Passo 4: Verificar Variáveis de Ambiente

1. Na Vercel, vá em **Settings** > **Environment Variables**
2. Verifique se `DATABASE_URL` está configurada
3. Verifique se termina com `:6543/postgres` (não `:5432`)
4. Se estiver errado, edite e faça um **Redeploy**

## 🐛 Passo 5: Verificar Console do Navegador

1. Abra o site no navegador
2. Pressione `F12` (ou `Cmd+Option+I` no Mac)
3. Vá na aba **Console**
4. Procure por erros em vermelho
5. Vá na aba **Network**
6. Procure por requisições para `/api/films`
7. Clique na requisição e veja a resposta

## 📝 Passo 6: Verificar Banco de Dados

Se tiver acesso ao Prisma Studio ou Supabase:

1. Verifique se há filmes na tabela `Film`
2. Verifique se `isPublished = true` para os filmes que devem aparecer
3. Verifique se `videoUrl` não está vazio

## ✅ Solução Rápida

1. **Acesse `/admin`** no site da Vercel
2. **Edite cada filme** que você quer que apareça
3. **Marque "Publicar imediatamente"**
4. **Salve**
5. **Recarregue a página principal**

## 🆘 Se Nada Funcionar

1. Verifique os logs da Vercel (Deployments > Functions/Logs)
2. Teste a API diretamente: `/api/films?published=true`
3. Verifique o console do navegador (F12)
4. Verifique se a `DATABASE_URL` está correta

