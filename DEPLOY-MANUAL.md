# 🚀 Guia Passo-a-Passo: Deploy Manual Vercel + Railway + PlanetScale

Este guia detalha cada passo para fazer deploy do site Gordim Barbearia em produção.

---

## PARTE 1: CRIAR BANCO DE DADOS NO PLANETSCALE

### Passo 1.1: Criar Conta no PlanetScale
1. Acesse https://planetscale.com
2. Clique em **"Sign up"**
3. Escolha: **"Sign up with GitHub"** (mais fácil)
4. Autorize o acesso ao seu GitHub
5. Complete o cadastro

### Passo 1.2: Criar Banco de Dados
1. Na dashboard do PlanetScale, clique em **"Create a new database"**
2. Preencha:
   - **Database name**: `gordim-barbearia`
   - **Region**: Escolha a mais próxima (ex: `us-east` se for nos EUA)
3. Clique em **"Create database"**
4. Aguarde a criação (leva alguns segundos)

### Passo 1.3: Obter Connection String
1. Clique no banco de dados criado
2. Clique em **"Connect"** (botão azul no topo)
3. Na janela que abrir, selecione **"Node.js"** no dropdown
4. Copie a string que aparece (será algo como):
   ```
   mysql://username:password@aws.connect.psdb.cloud/gordim-barbearia?sslaccept=strict
   ```
5. **Salve em um lugar seguro** - você precisará dela em breve

### Passo 1.4: Criar Password (Chave de Acesso)
1. Ainda na página de Connect, clique em **"New password"**
2. Dê um nome: `railway-access`
3. Copie a senha gerada
4. **Salve também** - você precisará

---

## PARTE 2: CONFIGURAR BACKEND NO RAILWAY

### Passo 2.1: Criar Conta no Railway
1. Acesse https://railway.app
2. Clique em **"Start Project"**
3. Escolha: **"Deploy from GitHub repo"**
4. Autorize o Railway a acessar seu GitHub
5. Selecione o repositório `gordim-barbearia`
6. Clique em **"Deploy"**
7. Aguarde o build (leva 2-3 minutos)

### Passo 2.2: Configurar Variáveis de Ambiente
1. No Railway, clique em seu projeto
2. Clique na aba **"Variables"** (ou **"Environment"**)
3. Clique em **"New Variable"** e adicione cada uma:

```
DATABASE_URL = mysql://username:password@aws.connect.psdb.cloud/gordim-barbearia?sslaccept=strict
```
(Cole a connection string do PlanetScale que você copiou)

```
JWT_SECRET = seu-segredo-aleatorio-aqui
```
(Gere uma string aleatória, ex: `abc123xyz789abc123xyz789`)

```
NODE_ENV = production
```

```
OWNER_NAME = Gordim Barbearia
```

```
OWNER_OPEN_ID = seu-id-manus
```
(Se não tiver, deixe como `admin`)

```
VITE_APP_ID = seu-app-id-manus
```

```
OAUTH_SERVER_URL = https://api.manus.im
```

```
VITE_OAUTH_PORTAL_URL = https://portal.manus.im
```

```
BUILT_IN_FORGE_API_URL = https://api.manus.im
```

```
BUILT_IN_FORGE_API_KEY = sua-chave-api-manus
```

```
VITE_FRONTEND_FORGE_API_URL = https://api.manus.im
```

```
VITE_FRONTEND_FORGE_API_KEY = sua-chave-frontend-manus
```

```
VITE_ANALYTICS_ENDPOINT = https://analytics.manus.im
```

```
VITE_ANALYTICS_WEBSITE_ID = seu-id-analytics
```

### Passo 2.3: Obter URL do Railway
1. Clique na aba **"Deployments"**
2. Procure por um URL como: `https://gordim-barbearia-production.up.railway.app`
3. **Copie e salve esta URL** - você precisará para o Vercel

### Passo 2.4: Testar Backend
1. Acesse a URL do Railway
2. Você deve ver a página inicial do site
3. Se der erro, verifique as variáveis de ambiente

---

## PARTE 3: CONFIGURAR FRONTEND NO VERCEL

### Passo 3.1: Criar Conta no Vercel
1. Acesse https://vercel.com
2. Clique em **"Sign up"**
3. Escolha: **"Continue with GitHub"**
4. Autorize o Vercel a acessar seu GitHub

### Passo 3.2: Importar Projeto
1. Na dashboard do Vercel, clique em **"Add New..."**
2. Selecione **"Project"**
3. Clique em **"Import Git Repository"**
4. Procure por `gordim-barbearia` e selecione
5. Clique em **"Import"**

### Passo 3.3: Configurar Build
1. Na página de configuração, você verá:
   - **Framework Preset**: Selecione **"Vite"**
   - **Root Directory**: Deixe em branco (ou `./`)
   - **Build Command**: Mude para `pnpm build`
   - **Output Directory**: Mude para `client/dist`
   - **Install Command**: Deixe como `pnpm install`

### Passo 3.4: Adicionar Variáveis de Ambiente
1. Clique em **"Environment Variables"**
2. Adicione cada variável:

```
VITE_API_URL = https://seu-railway-url.up.railway.app
```
(Cole a URL do Railway que você copiou no Passo 2.3)

```
VITE_APP_ID = seu-app-id-manus
```

```
VITE_OAUTH_PORTAL_URL = https://portal.manus.im
```

```
VITE_FRONTEND_FORGE_API_URL = https://api.manus.im
```

```
VITE_FRONTEND_FORGE_API_KEY = sua-chave-frontend-manus
```

### Passo 3.5: Deploy
1. Clique em **"Deploy"**
2. Aguarde o build completar (leva 2-3 minutos)
3. Você receberá uma URL do Vercel (ex: `https://gordim-barbearia.vercel.app`)
4. **Copie e salve esta URL**

### Passo 3.6: Testar Frontend
1. Acesse a URL do Vercel
2. Você deve ver o site completo
3. Teste o agendamento
4. Teste o painel admin em `/admin` (senha: `gordim2024`)

---

## PARTE 4: CONECTAR FRONTEND E BACKEND

### Passo 4.1: Atualizar vercel.json
1. No seu repositório GitHub, abra o arquivo `vercel.json`
2. Substitua `seu-railway-url` pela URL real do Railway:

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "client/dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://gordim-barbearia-production.up.railway.app/api/:path*"
    }
  ]
}
```

3. Clique em **"Commit changes"** (ou faça via git)
4. Vercel detectará a mudança e fará redeploy automaticamente

### Passo 4.2: Testar Integração
1. Acesse o site no Vercel
2. Teste o agendamento (deve salvar no banco de dados)
3. Verifique se o painel admin funciona
4. Teste o WhatsApp flutuante

---

## PARTE 5: CONFIGURAÇÕES FINAIS

### Passo 5.1: Adicionar Domínio Personalizado (Opcional)
1. No Vercel, vá para **"Settings"** → **"Domains"**
2. Clique em **"Add Domain"**
3. Digite seu domínio (ex: `gordimbarbearia.com.br`)
4. Siga as instruções para configurar DNS

### Passo 5.2: Atualizar Número de WhatsApp
1. No seu repositório, abra `client/src/components/WhatsAppFloat.tsx`
2. Procure por `5569993135258`
3. Substitua pelo número real da barbearia
4. Faça commit e push
5. Vercel fará redeploy automaticamente

### Passo 5.3: Adicionar Fotos à Galeria
1. Acesse o painel admin: `seu-site.vercel.app/admin`
2. Senha: `gordim2024`
3. Vá para a aba **"Galeria"**
4. Clique em **"Adicionar Foto"**
5. Cole a URL da foto (deve estar hospedada em algum lugar, ex: Imgur, Cloudinary)
6. Adicione legenda e categoria
7. Clique em **"Adicionar"**

### Passo 5.4: Alterar Senha do Admin (Recomendado)
1. Você precisará editar o arquivo `server/routers.ts`
2. Procure por `gordim2024`
3. Substitua pela nova senha
4. Faça commit e push
5. Railway fará redeploy automaticamente

---

## 🔧 TROUBLESHOOTING

### Erro: "Cannot find module 'pnpm'"
- **Solução**: Vercel e Railway usam pnpm automaticamente. Se der erro, verifique se o `pnpm-lock.yaml` está no repositório.

### Erro: "Database connection failed"
- **Solução**: Verifique se a `DATABASE_URL` está correta no Railway. Copie exatamente do PlanetScale.

### Erro: "404 Not Found" em `/api/trpc`
- **Solução**: Verifique se a URL do Railway está correta em `vercel.json`. Teste a URL diretamente no navegador.

### Erro: "CORS error"
- **Solução**: Adicione a URL do Vercel à lista de origens permitidas. Edite `server/_core/context.ts` se necessário.

### Site carrega mas agendamento não funciona
- **Solução**: Verifique se as variáveis de ambiente estão corretas em ambas as plataformas (Vercel e Railway).

### Painel admin não abre
- **Solução**: Verifique se você está usando a senha correta (`gordim2024` por padrão).

---

## 📞 PRÓXIMOS PASSOS

1. ✅ Deploy concluído
2. Compre um domínio personalizado
3. Configure SSL/HTTPS (automático em Vercel e Railway)
4. Adicione mais fotos à galeria
5. Altere a senha do admin para uma mais segura
6. Configure notificações por email (opcional)
7. Monitore o tráfego no Vercel Analytics

---

## 📚 RECURSOS ÚTEIS

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **PlanetScale Docs**: https://docs.planetscale.com
- **Repositório**: https://github.com/ArthurCavalcanti098/gordim-barbearia

---

**Pronto! Seu site está em produção! 🎉**

Se tiver dúvidas, consulte este guia novamente ou verifique os recursos úteis acima.
