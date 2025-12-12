# Vercel Não Está Detectando Novos Commits

Se a Vercel não está detectando os novos commits após o push, siga estes passos:

## 🔍 Verificar se o Push Foi Feito

1. Acesse seu repositório no GitHub:
   https://github.com/visibilidadeemfocosr-web/cinema-landing-page

2. Verifique se os commits mais recentes aparecem:
   - `859a2b0` - Corrige extensão da imagem do hero e adiciona thumbnailFile no handleEdit
   - `4d714c3` - Corrige ordenação displayOrder decrescente e atualização automática da listagem

3. Se os commits **NÃO** aparecem no GitHub, você precisa fazer push:
   ```bash
   git push origin main
   ```

## 🔗 Verificar Conexão do Repositório na Vercel

1. Acesse o projeto na Vercel: https://vercel.com/dashboard
2. Clique no projeto `cinema-landing-page`
3. Vá em **"Settings"** > **"Git"**
4. Verifique se o repositório está conectado:
   - Deve mostrar: `visibilidadeemfocosr-web/cinema-landing-page`
   - Branch: `main`

## 🔄 Forçar Novo Deploy

Se o repositório está conectado mas não detectou o commit:

### Opção 1: Redeploy Manual
1. Na página do projeto, vá em **"Deployments"**
2. Clique nos três pontos (`...`) do último deployment
3. Selecione **"Redeploy"**

### Opção 2: Trigger Manual via Git
1. Faça um pequeno commit (ex: adicionar um espaço em branco)
2. Faça push novamente
3. A Vercel deve detectar automaticamente

### Opção 3: Desconectar e Reconectar
1. Vá em **Settings** > **Git**
2. Clique em **"Disconnect"**
3. Clique em **"Connect Git Repository"**
4. Selecione `visibilidadeemfocosr-web/cinema-landing-page`
5. Configure novamente (variáveis de ambiente serão mantidas)

## ⚠️ Se Deletou o Projeto Errado

Se você deletou o projeto que estava conectado ao repositório:

1. Crie um novo projeto na Vercel
2. Conecte ao mesmo repositório: `visibilidadeemfocosr-web/cinema-landing-page`
3. Configure as variáveis de ambiente novamente
4. Faça o deploy

## ✅ Verificar Webhooks do GitHub

1. No GitHub, vá em **Settings** do repositório
2. Clique em **"Webhooks"**
3. Verifique se há um webhook da Vercel configurado
4. Se não houver, a Vercel deve criar automaticamente ao conectar

