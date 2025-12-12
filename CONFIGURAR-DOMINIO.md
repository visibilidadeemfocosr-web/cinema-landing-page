# Como Configurar Domínio no Registro.br para Vercel

Este guia irá te ajudar a configurar seu domínio do Registro.br para funcionar com a Vercel.

## 📋 Pré-requisitos

- ✅ Projeto deployado na Vercel
- ✅ Domínio registrado no Registro.br
- ✅ Acesso ao painel do Registro.br

## 🌐 Passo 1: Adicionar Domínio na Vercel

1. Acesse: https://vercel.com/dashboard
2. Clique no projeto `cinema-landing-page`
3. Vá em **Settings** > **Domains**
4. Clique em **"Add"** ou **"Add Domain"**
5. Digite seu domínio (ex: `alicestamato.com.br`)
6. Clique em **"Add"**

## 🔧 Passo 2: Configurar DNS no Registro.br

A Vercel irá mostrar as instruções de DNS. Você precisará adicionar os seguintes registros no Registro.br:

### Opção 1: Apex Domain (domínio raiz - ex: `alicestamato.com.br`)

**Registro A:**
```
Tipo: A
Nome: @ (ou deixe vazio)
Valor: 76.76.21.21
TTL: 3600 (ou padrão)
```

**Registro A (segundo):**
```
Tipo: A
Nome: @ (ou deixe vazio)
Valor: 76.76.22.22
TTL: 3600 (ou padrão)
```

### Opção 2: Subdomínio www (ex: `www.alicestamato.com.br`)

**Registro CNAME:**
```
Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
TTL: 3600 (ou padrão)
```

### Opção 3: Configuração Completa (Recomendado)

Para ter tanto o domínio raiz quanto o www funcionando:

1. **Domínio raiz (apex):**
   - Adicione 2 registros A com os valores `76.76.21.21` e `76.76.22.22`

2. **Subdomínio www:**
   - Adicione 1 registro CNAME apontando para `cname.vercel-dns.com`

## 📝 Passo 3: Adicionar Registros no Registro.br

1. Acesse: https://registro.br
2. Faça login na sua conta
3. Clique no domínio que você quer configurar
4. Vá em **"DNS"** ou **"Zona DNS"**
5. Clique em **"Adicionar Registro"** ou **"Novo Registro"**

### Para Domínio Raiz (apex):

**Registro 1:**
- **Tipo:** A
- **Nome:** @ (ou deixe vazio para domínio raiz)
- **Valor/IP:** `76.76.21.21`
- **TTL:** 3600

**Registro 2:**
- **Tipo:** A
- **Nome:** @ (ou deixe vazio)
- **Valor/IP:** `76.76.22.22`
- **TTL:** 3600

### Para Subdomínio www:

**Registro:**
- **Tipo:** CNAME
- **Nome:** www
- **Valor:** `cname.vercel-dns.com`
- **TTL:** 3600

## ⏳ Passo 4: Aguardar Propagação DNS

Após adicionar os registros:

1. **Propagação DNS:** Pode levar de 1 a 48 horas (geralmente 1-2 horas)
2. **Verificação na Vercel:** A Vercel mostrará o status:
   - 🔴 **Invalid Configuration** = DNS ainda não propagou ou está incorreto
   - 🟡 **Pending** = Aguardando propagação
   - 🟢 **Valid Configuration** = Configurado corretamente!

## ✅ Passo 5: Verificar Status

1. Na Vercel, vá em **Settings** > **Domains**
2. Você verá o status do domínio:
   - Se estiver verde ✅ = Funcionando!
   - Se estiver amarelo ⚠️ = Aguardando propagação
   - Se estiver vermelho ❌ = Verifique os registros DNS

## 🔍 Verificar Propagação DNS

Você pode verificar se o DNS propagou usando:

1. **Ferramenta online:** https://dnschecker.org
2. **Digite seu domínio** e verifique os registros A e CNAME
3. **Aguarde até aparecer** os valores corretos em todos os servidores DNS

## 📌 Notas Importantes

- **Registro.br:** Alguns painéis do Registro.br podem ter interface diferente, mas os tipos de registro (A, CNAME) são os mesmos
- **TTL:** Use 3600 (1 hora) ou o padrão do Registro.br
- **Propagação:** Pode levar até 48 horas, mas geralmente é mais rápido
- **HTTPS:** A Vercel configura SSL/HTTPS automaticamente após o DNS propagar

## 🆘 Problemas Comuns

### DNS não propaga
- Aguarde mais tempo (até 48 horas)
- Verifique se os valores estão corretos
- Certifique-se de que não há outros registros conflitantes

### Domínio mostra "Invalid Configuration"
- Verifique se os registros A estão corretos (`76.76.21.21` e `76.76.22.22`)
- Verifique se o CNAME do www aponta para `cname.vercel-dns.com`
- Aguarde a propagação DNS

### www funciona mas o domínio raiz não (ou vice-versa)
- Certifique-se de ter configurado AMBOS:
  - Domínio raiz: 2 registros A
  - www: 1 registro CNAME

## 🎉 Pronto!

Após a propagação DNS, seu domínio estará funcionando e a Vercel configurará automaticamente o certificado SSL (HTTPS).

