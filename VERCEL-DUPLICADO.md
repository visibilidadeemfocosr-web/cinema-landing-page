# Como Resolver Projetos Duplicados na Vercel

Você tem dois projetos na Vercel:
1. `cinema-landing-page-t9w2` (5 minutos atrás)
2. `cinema-landing-page` (10 minutos atrás)

## 🔍 Qual Manter?

**Recomendação**: Mantenha o projeto **`cinema-landing-page`** (sem o sufixo `-t9w2`)

O projeto com sufixo (`-t9w2`) geralmente é criado automaticamente quando há algum problema ou quando você faz deploy múltiplas vezes.

## 🗑️ Como Deletar o Projeto Duplicado

### Opção 1: Via Dashboard da Vercel

1. Acesse [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Clique no projeto que você quer deletar (`cinema-landing-page-t9w2`)
3. Vá em **"Settings"** (no menu superior)
4. Role até o final da página
5. Na seção **"Danger Zone"**, clique em **"Delete Project"**
6. Digite o nome do projeto para confirmar
7. Clique em **"Delete"**

### Opção 2: Manter Ambos (Opcional)

Se quiser manter ambos:
- Um pode ser usado para **produção** (`cinema-landing-page`)
- O outro pode ser usado para **testes/staging** (`cinema-landing-page-t9w2`)

## ✅ Após Deletar

1. Certifique-se de que o projeto `cinema-landing-page` está funcionando
2. Verifique se as variáveis de ambiente estão configuradas corretamente
3. Faça um novo deploy se necessário

## 🔗 Configurar Domínio

Depois de manter apenas um projeto:
1. Vá em **Settings** > **Domains**
2. Adicione seu domínio personalizado (ex: `alicestamato.com.br`)
3. Siga as instruções de DNS

