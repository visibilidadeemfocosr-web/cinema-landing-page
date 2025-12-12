# Como Criar um Personal Access Token (PAT) no GitHub

Para fazer push no repositório via HTTPS, você precisa criar um **Personal Access Token (PAT)**.

## 🔑 Passo 1: Criar o Token

1. Acesse [https://github.com](https://github.com) e faça login
2. Clique no seu **avatar** (canto superior direito) > **"Settings"**
3. No menu lateral esquerdo, role até o final e clique em **"Developer settings"**
4. Clique em **"Personal access tokens"** > **"Tokens (classic)"**
5. Clique no botão **"Generate new token"** > **"Generate new token (classic)"**

## ⚙️ Passo 2: Configurar o Token

1. **Note**: Dê um nome descritivo (ex: `cinema-landing-page-push`)
2. **Expiration**: Escolha a validade:
   - **30 days** (temporário)
   - **90 days** (recomendado)
   - **No expiration** (permanente - use com cuidado)
3. **Select scopes**: Marque as permissões necessárias:
   - ✅ **`repo`** (Full control of private repositories)
     - Isso inclui: `repo:status`, `repo_deployment`, `public_repo`, `repo:invite`, `security_events`
   - ✅ **`workflow`** (se você usar GitHub Actions)

## 💾 Passo 3: Copiar o Token

1. Clique em **"Generate token"** (botão verde no final)
2. **⚠️ IMPORTANTE**: Copie o token imediatamente! Ele só aparece uma vez!
3. O token será algo como: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## 🚀 Passo 4: Usar o Token

### Opção A: Usar no comando (temporário)

Quando o Git pedir senha, use o **token** como senha:

```bash
git push -u origin main
# Username: visibilidadeemfocosr-web
# Password: [cole o token aqui]
```

### Opção B: Salvar no Git Credential Helper (recomendado)

```bash
# Configurar para salvar credenciais
git config --global credential.helper osxkeychain

# Fazer push (vai pedir username e password uma vez)
git push -u origin main
# Username: visibilidadeemfocosr-web
# Password: [cole o token aqui]
```

Depois disso, o Git salvará suas credenciais e não pedirá mais.

### Opção C: Usar na URL (não recomendado para segurança)

```bash
git remote set-url origin https://SEU_TOKEN@github.com/visibilidadeemfocosr-web/cinema-landing-page.git
```

## 🔒 Segurança

- **Nunca** commite o token no código
- **Nunca** compartilhe o token publicamente
- Se o token vazar, revogue imediatamente em **Settings** > **Developer settings** > **Personal access tokens**

## 🔄 Revogar Token

Se precisar revogar um token:
1. Vá em **Settings** > **Developer settings** > **Personal access tokens**
2. Encontre o token e clique em **"Revoke"**

## ✅ Próximo Passo

Após criar o token, execute:

```bash
cd /Users/macbookair/Downloads/cinema-landing-page
git push -u origin main
```

Quando pedir:
- **Username**: `visibilidadeemfocosr-web`
- **Password**: Cole o token que você criou

