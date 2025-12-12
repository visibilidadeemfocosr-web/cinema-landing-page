# Cinema Landing Page - Alice Stamato

Portfolio profissional de Alice Stamato, diretora de cinema e roteirista brasileira. Fundadora da produtora audiovisual Lombada Filmes.

## 🎬 Características

- **Design Moderno**: Interface inspirada no Vimeo com elementos artísticos terracotta
- **Multi-idioma**: Suporte para Português, Inglês e Espanhol
- **Painel Admin**: Gerenciamento completo de filmes e vídeos
- **Upload de Vídeos**: Integração com Cloudflare R2 para armazenamento de arquivos grandes (até 15GB)
- **Banco de Dados**: PostgreSQL (Supabase) com Prisma ORM
- **Responsivo**: Design adaptável para desktop, tablet e mobile

## 🚀 Tecnologias

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **Prisma** (ORM)
- **PostgreSQL** (Supabase)
- **Cloudflare R2** (Armazenamento)
- **shadcn/ui** (Componentes)

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou pnpm
- Conta no Supabase (banco de dados)
- Conta no Cloudflare (R2 storage)

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/SEU_USUARIO/cinema-landing-page.git
cd cinema-landing-page
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp env-template.txt .env.local
```

Edite `.env.local` com suas credenciais:
- `DATABASE_URL`: Connection string do Supabase
- `R2_ACCOUNT_ID`: Account ID do Cloudflare
- `R2_ACCESS_KEY_ID`: Access Key do R2
- `R2_SECRET_ACCESS_KEY`: Secret Key do R2
- `R2_BUCKET_NAME`: Nome do bucket R2
- `R2_PUBLIC_URL`: URL pública do bucket R2

4. Configure o banco de dados:
```bash
npx prisma generate
npx prisma db push
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O site estará disponível em `http://localhost:3002`

## 📚 Documentação

- [SETUP.md](./SETUP.md) - Guia completo de configuração
- [SETUP-RAPIDO.md](./SETUP-RAPIDO.md) - Configuração rápida do Supabase
- [SETUP-R2-RAPIDO.md](./SETUP-R2-RAPIDO.md) - Configuração rápida do Cloudflare R2
- [DEPLOY-VERCEL.md](./DEPLOY-VERCEL.md) - Guia de deploy na Vercel
- [README-DATABASE.md](./README-DATABASE.md) - Informações sobre o banco de dados

## 🎨 Páginas

- **/** - Página principal (portfolio de filmes)
- **/admin** - Painel administrativo para gerenciar filmes

## 🔐 Admin

Acesse `/admin` para:
- Adicionar/editar/deletar filmes
- Fazer upload de vídeos e thumbnails
- Gerenciar ordem de exibição
- Publicar/despublicar filmes

## 🌍 Internacionalização

O site suporta 3 idiomas:
- 🇧🇷 Português (padrão)
- 🇺🇸 Inglês
- 🇪🇸 Espanhol

O idioma é selecionado através do seletor no header e salvo no localStorage.

## 📦 Estrutura do Projeto

```
cinema-landing-page/
├── app/                    # Next.js App Router
│   ├── admin/             # Página admin
│   ├── api/                # API Routes
│   └── page.tsx            # Página principal
├── components/             # Componentes React
│   ├── ui/                # Componentes shadcn/ui
│   └── ...
├── lib/                    # Utilitários e hooks
│   ├── db/                # Prisma client
│   ├── hooks/             # React hooks
│   └── i18n/              # Internacionalização
├── prisma/                 # Schema do banco de dados
└── public/                 # Arquivos estáticos
```

## 🚢 Deploy

Veja o guia completo em [DEPLOY-VERCEL.md](./DEPLOY-VERCEL.md)

Resumo rápido:
1. Faça push do código para GitHub
2. Conecte o repositório na Vercel
3. Configure as variáveis de ambiente
4. Deploy automático!

## 📝 Licença

Todos os direitos reservados - Alice Stamato

## 👤 Autor

Desenvolvido para Alice Stamato - Diretora de Cinema e Roteirista

---

**Lombada Filmes** - Produtora audiovisual independente

