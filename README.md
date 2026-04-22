# Gordim Barbearia - Website Premium

Site profissional e responsivo para barbearia com sistema de agendamento online, painel administrativo e integração com WhatsApp.

## 🎨 Características

- **Design Dark Premium**: Interface sofisticada com tons dourado e âmbar
- **Agendamento Online**: Sistema completo de reservas com seleção de serviço, barbeiro, data e horário
- **Painel Administrativo**: Gerenciamento de agendamentos, serviços, barbeiros, galeria e depoimentos
- **WhatsApp Integrado**: Botão flutuante e confirmação de agendamento via WhatsApp
- **Galeria de Fotos**: Showcase dos trabalhos realizados
- **Depoimentos**: Seção de avaliações de clientes
- **Localização**: Mapa integrado, endereço e horários de funcionamento
- **Notificações**: Alertas automáticos ao dono quando novo agendamento é realizado
- **Animações Suaves**: Loading screen, scroll animado e transições elegantes

## 🚀 Stack Tecnológico

### Frontend
- React 19 com TypeScript
- Tailwind CSS 4
- Shadcn/ui components
- Framer Motion (animações)

### Backend
- Express 4
- tRPC 11 (API type-safe)
- Drizzle ORM

### Banco de Dados
- MySQL/TiDB (desenvolvimento)
- PlanetScale (produção)

### Hospedagem
- Vercel (frontend)
- Railway (backend)
- PlanetScale (banco de dados)

## 📦 Instalação Local

### Pré-requisitos
- Node.js 22+
- pnpm 10+
- MySQL (local) ou PlanetScale (nuvem)

### Setup

```bash
# Clonar repositório
git clone https://github.com/ArthurCavalcanti098/gordim-barbearia.git
cd gordim-barbearia

# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env.local

# Editar .env.local com suas credenciais
# DATABASE_URL, JWT_SECRET, etc.

# Executar migrations
pnpm db:push

# Iniciar servidor de desenvolvimento
pnpm dev
```

Acesse http://localhost:3000

## 🛠️ Desenvolvimento

### Scripts Disponíveis

```bash
pnpm dev          # Iniciar servidor de desenvolvimento
pnpm build        # Build para produção
pnpm start        # Iniciar servidor de produção
pnpm test         # Executar testes
pnpm check        # Verificar tipos TypeScript
pnpm format       # Formatar código
pnpm db:push      # Executar migrations do banco
```

### Estrutura de Pastas

```
.
├── client/                 # Frontend React
│   ├── src/
│   │   ├── pages/         # Páginas (Home, Admin)
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── lib/           # Utilitários (tRPC, etc)
│   │   └── index.css      # Estilos globais
│   └── dist/              # Build output
├── server/                # Backend Express
│   ├── routers.ts         # Definição de procedures tRPC
│   ├── db.ts              # Query helpers
│   └── _core/             # Configuração interna
├── drizzle/               # Schema e migrations
├── Dockerfile             # Para Railway
├── vercel.json            # Configuração Vercel
└── DEPLOY.md              # Guia de deploy
```

## 🔑 Variáveis de Ambiente

```env
# Banco de dados
DATABASE_URL=mysql://user:password@host/database

# Autenticação
JWT_SECRET=sua-chave-secreta-aqui

# OAuth (Manus)
VITE_APP_ID=seu-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im

# APIs Manus
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=sua-chave-api
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=sua-chave-frontend

# Dono da barbearia
OWNER_NAME=Gordim Barbearia
OWNER_OPEN_ID=seu-id

# Analytics
VITE_ANALYTICS_ENDPOINT=https://analytics.manus.im
VITE_ANALYTICS_WEBSITE_ID=seu-id
```

## 📱 Painel Administrativo

Acesse em `/admin` com a senha padrão: `gordim2024`

### Funcionalidades

- **Agendamentos**: Visualizar, confirmar, concluir ou cancelar agendamentos
- **Serviços**: Adicionar, editar e remover serviços (corte, barba, etc)
- **Barbeiros**: Gerenciar equipe e disponibilidade
- **Galeria**: Upload e gerenciamento de fotos
- **Depoimentos**: Adicionar e gerenciar avaliações de clientes

## 🚀 Deploy

Veja [DEPLOY.md](./DEPLOY.md) para instruções completas de deploy em Vercel + Railway + PlanetScale.

### Quick Deploy

```bash
# 1. Push para GitHub
git push origin main

# 2. Vercel detectará automaticamente e fará deploy
# 3. Railway fará deploy do backend
# 4. Configure as variáveis de ambiente em ambas as plataformas
```

## 🧪 Testes

```bash
# Executar todos os testes
pnpm test

# Testes incluem:
# - Agendamento online
# - Autenticação admin
# - Integração WhatsApp
# - Notificações
```

## 🔒 Segurança

- Autenticação OAuth integrada
- Senhas de admin protegidas
- HTTPS automático em produção
- Validação de entrada com Zod
- Proteção CORS configurada

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique a seção Troubleshooting em [DEPLOY.md](./DEPLOY.md)
2. Consulte a documentação das plataformas:
   - [Vercel Docs](https://vercel.com/docs)
   - [Railway Docs](https://docs.railway.app)
   - [PlanetScale Docs](https://docs.planetscale.com)

## 📄 Licença

MIT

## 👨‍💼 Autor

Desenvolvido por Manus AI

---

**Gordim Barbearia** - Seu estilo começa aqui. ✂️
