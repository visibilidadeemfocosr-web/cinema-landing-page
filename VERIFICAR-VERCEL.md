# Verificar Por Que Filmes Não Aparecem na Vercel

## 🔍 Diagnóstico

Se os filmes aparecem localmente mas não na Vercel, o problema é provavelmente:
1. **Conexão com o banco de dados não está funcionando na Vercel**
2. **Variável DATABASE_URL incorreta ou não configurada**
3. **Erro na API que não está sendo mostrado**

## ✅ Passo 1: Testar a API na Vercel

Abra no navegador:
```
https://cinema-landing-page.vercel.app/api/films?published=true
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

**Se der erro ou retornar vazio:**
- Problema de conexão com o banco
- Verifique os logs da Vercel

## 🔍 Passo 2: Verificar Logs da Vercel

1. Acesse: https://vercel.com/dashboard
2. Clique no projeto `cinema-landing-page`
3. Vá em **"Deployments"**
4. Clique no último deployment
5. Vá em **"Functions"** ou **"Logs"**
6. Procure por:
   - Erros relacionados a `DATABASE_URL`
   - Erros do Prisma
   - Erros de conexão

## 🔧 Passo 3: Verificar DATABASE_URL na Vercel

1. Na Vercel, vá em **Settings** > **Environment Variables**
2. Verifique se `DATABASE_URL` está configurada
3. **IMPORTANTE:** Verifique se termina com `:6543/postgres` (Session Pooler)
4. Se estiver com `:5432`, edite para `:6543`
5. Faça um **Redeploy** após alterar

## 🧪 Passo 4: Testar Conexão

Se a API retornar erro, verifique:

1. **Formato da DATABASE_URL:**
   ```
   postgresql://postgres.REF_ID:SENHA@aws-1-sa-east-1.pooler.supabase.com:6543/postgres
   ```

2. **Verifique se a senha está correta** (sem espaços extras)

3. **Verifique se está usando Session Pooler** (porta 6543)

## 🐛 Passo 5: Verificar Console do Navegador

1. Abra o site da Vercel no navegador
2. Pressione `F12` (ou `Cmd+Option+I` no Mac)
3. Vá na aba **Console**
4. Procure por erros em vermelho
5. Vá na aba **Network**
6. Procure por requisições para `/api/films`
7. Clique na requisição e veja:
   - Status code (deve ser 200)
   - Response (deve ter `{"success": true, "data": [...]}`)

## ✅ Solução Mais Provável

O problema é quase sempre a `DATABASE_URL` na Vercel:

1. **Verifique se está com porta 6543** (não 5432)
2. **Verifique se a senha está correta**
3. **Faça um Redeploy** após corrigir

## 🔄 Após Corrigir

1. Edite a `DATABASE_URL` na Vercel (se necessário)
2. Faça um **Redeploy**
3. Teste a API: `/api/films?published=true`
4. Se retornar os filmes, recarregue a página principal

