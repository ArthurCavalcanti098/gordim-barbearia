# Guia de Deploy: Vercel + Railway + PlanetScale

Este guia explica como fazer deploy do site Gordim Barbearia em Vercel (frontend), Railway (backend) e PlanetScale (banco de dados).

## 1. Criar Banco de Dados no PlanetScale

### Passo 1: Criar conta no PlanetScale
1. Acesse https://planetscale.com
2. Clique em "Sign up"
3. Crie uma conta com GitHub ou email

### Passo 2: Criar banco de dados
1. Clique em "Create a new database"
2. Nome: `gordim-barbearia`
3. Region: Escolha a mais próxima (ex: `us-east`)
4. Clique em "Create database"

### Passo 3: Obter connection string
1. Clique em "Connect"
2. Selecione "Node.js"
3. Copie a connection string (será algo como: `mysql://user:password@host/database`)
4. **Guarde esta string** - você precisará dela

## 2. Deploy do Backend no Railway

### Passo 1: Criar conta no Railway
1. Acesse https://railway.app
2. Clique em "Start Project"
3. Conecte com GitHub

### Passo 2: Criar novo projeto
1. Clique em "New Project"
2. Selecione "Deploy from GitHub repo"
3. Escolha o repositório `gordim-barbearia`
4. Clique em "Deploy"

### Passo 3: Configurar variáveis de ambiente
1. No Railway, vá para "Variables"
2. Adicione as seguintes variáveis:

```
DATABASE_URL=mysql://user:password@host/database
JWT_SECRET=sua-chave-secreta-aqui
NODE_ENV=production
OWNER_NAME=Gordim Barbearia
OWNER_OPEN_ID=seu-id-aqui
VITE_APP_ID=seu-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=sua-chave-api
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=sua-chave-frontend
VITE_ANALYTICS_ENDPOINT=https://analytics.manus.im
VITE_ANALYTICS_WEBSITE_ID=seu-id
```

### Passo 4: Obter URL do Railway
1. Após o deploy, Railway fornecerá uma URL (ex: `https://gordim-barbearia-production.up.railway.app`)
2. **Copie esta URL** - você precisará para o Vercel

## 3. Deploy do Frontend no Vercel

### Passo 1: Conectar Vercel ao GitHub
1. Acesse https://vercel.com
2. Clique em "New Project"
3. Selecione "Import Git Repository"
4. Escolha `gordim-barbearia`

### Passo 2: Configurar projeto
1. **Framework Preset**: Vite
2. **Root Directory**: `./` (deixe em branco)
3. **Build Command**: `pnpm build`
4. **Output Directory**: `client/dist`

### Passo 3: Configurar variáveis de ambiente
1. Clique em "Environment Variables"
2. Adicione as seguintes variáveis:

```
VITE_API_URL=https://gordim-barbearia-production.up.railway.app
VITE_APP_ID=seu-app-id
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=sua-chave-frontend
```

### Passo 4: Deploy
1. Clique em "Deploy"
2. Aguarde o build completar
3. Você receberá uma URL do Vercel (ex: `https://gordim-barbearia.vercel.app`)

## 4. Atualizar vercel.json

Após obter a URL do Railway, atualize o arquivo `vercel.json`:

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "client/dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://seu-railway-url.up.railway.app/api/:path*"
    }
  ]
}
```

Faça commit e push:
```bash
git add vercel.json
git commit -m "Update Railway URL in vercel.json"
git push
```

## 5. Testar o Deploy

1. Acesse a URL do Vercel
2. Teste o agendamento
3. Verifique se o painel admin funciona em `/admin`
4. Teste o WhatsApp flutuante

## Troubleshooting

### Erro de conexão com banco de dados
- Verifique se a `DATABASE_URL` está correta no Railway
- Certifique-se de que o PlanetScale permite conexões de Railway

### Erro 404 em `/api/trpc`
- Verifique se a URL do Railway está correta em `vercel.json`
- Teste a URL do Railway diretamente no navegador

### Erro de CORS
- Adicione a URL do Vercel à lista de origens permitidas no backend

## Próximos Passos

1. Compre um domínio personalizado (ex: gordimbarbearia.com.br)
2. Configure o domínio no Vercel
3. Atualize o número de WhatsApp real
4. Adicione fotos reais à galeria
5. Configure SSL/HTTPS (automático no Vercel e Railway)

## Suporte

Para dúvidas sobre:
- **Vercel**: https://vercel.com/docs
- **Railway**: https://docs.railway.app
- **PlanetScale**: https://docs.planetscale.com
