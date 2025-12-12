# 🌐 Configurar Domínio no Registro.br para Vercel

Este guia te ajudará a configurar seu domínio `.br` no Registro.br para apontar para a Vercel.

## 📋 Pré-requisitos

1. ✅ Domínio registrado no Registro.br
2. ✅ Projeto já deployado na Vercel
3. ✅ Acesso ao painel do Registro.br

## 🚀 Passo 1: Adicionar Domínio na Vercel

1. Acesse [https://vercel.com](https://vercel.com) e faça login
2. Vá no seu projeto
3. Clique em **"Settings"** > **"Domains"**
4. Digite seu domínio (ex: `alicestamato.com.br`)
5. Clique em **"Add"**
6. A Vercel irá mostrar as instruções de DNS

**Anote os valores que a Vercel mostrará:**
- Para domínio raiz (apex): IP fornecido pela Vercel (ex: `216.198.79.1`)
- Para subdomínio www: CNAME específico fornecido pela Vercel (ex: `3a9236fd2b37e7a4.vercel-dns-017.com.`)

**⚠️ IMPORTANTE**: Use os valores EXATOS que aparecem na sua tela da Vercel, não os valores genéricos!

## 🔧 Passo 2: Acessar o Painel do Registro.br

1. Acesse [https://registro.br](https://registro.br)
2. Faça login com seu CPF/CNPJ e senha
3. Clique em **"Meus Domínios"**
4. Selecione o domínio que você quer configurar (ex: `alicestamato.com.br`)

## 📝 Passo 3: Configurar DNS no Registro.br

### Opção A: Configurar Domínio Raiz (apex) - alicestamato.com.br

1. No painel do domínio, clique em **"DNS"** ou **"Zona DNS"**
2. Se você já tem registros DNS, clique em **"Editar"** ou **"Gerenciar DNS"**
3. Adicione/Edite os seguintes registros:

**Registro A (para domínio raiz - alicestamato.com.br):**
```
Tipo: A
Nome: @ (ou deixe em branco)
Valor: 216.198.79.1 (use o IP que aparece na SUA tela da Vercel)
TTL: 3600 (ou padrão)
```

**Registro CNAME (para www - www.alicestamato.com.br):**
```
Tipo: CNAME
Nome: www
Valor: 3a9236fd2b37e7a4.vercel-dns-017.com. (use o valor que aparece na SUA tela da Vercel)
TTL: 3600 (ou padrão)
```

**⚠️ ATENÇÃO**: 
- Os valores acima são EXEMPLOS baseados na sua tela
- **SEMPRE use os valores EXATOS que aparecem na sua configuração da Vercel**
- Cada projeto na Vercel tem valores únicos
- O CNAME do www termina com ponto (.) - inclua o ponto no Registro.br

### ⚠️ Sobre IPs Antigos vs Novos

A Vercel pode mostrar uma mensagem sobre "IP range expansion". Isso significa:
- **Novos IPs** (ex: `216.198.79.1`) são recomendados
- **IPs antigos** (ex: `76.76.21.21`) ainda funcionam, mas use os novos se possível
- **Sempre use os valores que aparecem na SUA tela da Vercel**

### Opção B: Se a Vercel fornecer múltiplos IPs

Se a Vercel mostrar mais de um IP para o domínio raiz, adicione **todos** como registros A separados:

```
Tipo: A
Nome: @
Valor: [IP 1 da Vercel]
TTL: 3600

Tipo: A
Nome: @
Valor: [IP 2 da Vercel]
TTL: 3600
```

(Adicione quantos IPs a Vercel fornecer)

## ⚙️ Passo 4: Salvar e Aguardar Propagação

1. Clique em **"Salvar"** ou **"Confirmar"** no Registro.br
2. Aguarde a propagação DNS:
   - **Tempo mínimo**: 5-15 minutos
   - **Tempo médio**: 1-2 horas
   - **Tempo máximo**: 24-48 horas

## ✅ Passo 5: Verificar na Vercel

1. Volte para a Vercel
2. Vá em **"Settings"** > **"Domains"**
3. O status deve mudar de:
   - ⏳ "Pending" → 
   - ✅ "Valid Configuration"

**Quando aparecer "Valid Configuration"**, seu domínio está funcionando!

## 🔍 Verificar Propagação DNS

Você pode verificar se o DNS propagou usando:

1. **Online**: [https://dnschecker.org](https://dnschecker.org)
   - Digite seu domínio
   - Selecione tipo "A" ou "CNAME"
   - Verifique se os valores estão corretos

2. **Terminal** (Mac/Linux):
   ```bash
   dig alicestamato.com.br A
   dig www.alicestamato.com.br CNAME
   ```

3. **Windows** (PowerShell):
   ```powershell
   Resolve-DnsName alicestamato.com.br -Type A
   Resolve-DnsName www.alicestamato.com.br -Type CNAME
   ```

## 🆘 Problemas Comuns

### ❌ "Invalid Configuration" na Vercel

**Causa**: DNS ainda não propagou ou valores incorretos

**Solução**:
1. Verifique se os valores no Registro.br estão corretos
2. Aguarde mais tempo (pode levar até 48h)
3. Verifique se não há outros registros conflitantes

### ❌ Domínio não carrega após propagação

**Causa**: Cache do navegador ou DNS local

**Solução**:
1. Limpe o cache do navegador
2. Tente em modo anônimo
3. Use outro navegador
4. Aguarde alguns minutos

### ❌ Erro "DNS_PROBE_FINISHED_NXDOMAIN"

**Causa**: DNS ainda não propagou completamente

**Solução**: Aguarde mais tempo e verifique a propagação

### ❌ Não consigo editar DNS no Registro.br

**Causa**: Domínio pode estar usando DNS externo

**Solução**:
1. Verifique se o domínio está usando "DNS do Registro.br"
2. Se estiver usando DNS externo (ex: Cloudflare), configure lá
3. Para mudar para DNS do Registro.br, vá em "DNS" > "Usar DNS do Registro.br"

## 📌 Notas Importantes

1. **TTL (Time To Live)**: 
   - Use 3600 (1 hora) para mudanças rápidas
   - Use valores maiores (86400 = 24h) para produção estável

2. **Domínio raiz vs Subdomínio**:
   - Domínio raiz (`alicestamato.com.br`) → usa registro **A**
   - Subdomínio (`www.alicestamato.com.br`) → usa registro **CNAME**

3. **Múltiplos IPs**:
   - A Vercel pode fornecer múltiplos IPs para redundância
   - Adicione todos os IPs como registros A separados

4. **Propagação Global**:
   - DNS pode propagar em alguns lugares e não em outros
   - Isso é normal e pode levar até 48h para propagação completa

## ✅ Checklist Final

- [ ] Domínio adicionado na Vercel
- [ ] Registro A configurado no Registro.br (domínio raiz)
- [ ] Registro CNAME configurado no Registro.br (www)
- [ ] Valores salvos no Registro.br
- [ ] Aguardou pelo menos 15 minutos
- [ ] Status na Vercel mostra "Valid Configuration"
- [ ] Site acessível pelo domínio personalizado

## 🎉 Pronto!

Seu domínio está configurado e funcionando! O site estará acessível em:
- `https://alicestamato.com.br`
- `https://www.alicestamato.com.br`

**Dica**: A Vercel redireciona automaticamente HTTP para HTTPS, então seu site sempre será seguro! 🔒

