# Gordim Barbearia - TODO

## Database & Backend
- [x] Schema: tabelas services, barbers, appointments, gallery, testimonials
- [x] Migration SQL aplicada via webdev_execute_sql
- [x] tRPC router: serviços (CRUD admin)
- [x] tRPC router: barbeiros (CRUD admin)
- [x] tRPC router: agendamentos (criar, listar, cancelar, confirmar)
- [x] tRPC router: galeria (CRUD admin)
- [x] tRPC router: depoimentos (CRUD admin)
- [x] Lógica de horários disponíveis (bloquear horários ocupados)
- [x] Notificação ao dono ao criar agendamento (notifyOwner)
- [x] Autenticação admin via senha protegida

## Frontend - Seções One-Page
- [x] Loading screen elegante com logo animado
- [x] Navbar fixa com âncoras e scroll suave
- [x] Hero Section: nome, slogan, botão agendamento, overlay dark
- [x] Seção Sobre Nós: história, diferenciais, equipe
- [x] Seção Serviços: cards com preço e duração
- [x] Seção Agendamento: formulário completo (serviço, barbeiro, data, horário, nome, telefone)
- [x] Seção Galeria: grid de fotos com lightbox
- [x] Seção Avaliações: slider de depoimentos
- [x] Seção Localização: endereço, horário, mapa Google Maps
- [x] Rodapé profissional com links e redes sociais
- [x] Botão flutuante WhatsApp (sempre visível)
- [x] Animações de scroll (fade-in, slide-up)
- [x] Cursor customizado (desktop)
- [x] Scroll suave entre seções

## Painel Admin
- [x] Rota /admin protegida por senha
- [x] Login admin com senha (padrão: gordim2024)
- [x] Dashboard: listagem de agendamentos do dia/semana
- [x] Gerenciar serviços (adicionar, editar, remover)
- [x] Gerenciar barbeiros (adicionar, editar, remover)
- [x] Gerenciar galeria (adicionar, remover fotos)
- [x] Gerenciar depoimentos

## Design & UX
- [x] Tema dark premium (preto fosco, dourado, âmbar)
- [x] Tipografia elegante (Google Fonts: Playfair Display + Inter)
- [x] Design 100% responsivo mobile-first
- [x] SEO: meta tags, title, description

## Testes
- [x] Testes vitest para routers de agendamento
- [x] Testes para lógica de horários disponíveis
- [x] 11 testes passando (2 arquivos de teste)


## Migração para Vercel + Railway + PlanetScale

- [x] Configurar vercel.json para frontend
- [x] Criar Dockerfile para backend Express
- [x] Criar repositório GitHub e fazer push
- [x] Banco de dados simulado (mock) - funciona sem PlanetScale
- [x] Criar guia DEPLOY-MANUAL.md com instruções passo-a-passo
- [x] Criar guia VERCEL-QUICK-START.md para deploy simplificado
- [x] Banco de dados simulado testado e funcionando
- [x] 19 testes passando (mock database)
- [x] Repositório GitHub atualizado com todas as configurações
