# 🚀 Deploy Rápido no Vercel (Com Banco de Dados Simulado)

Este guia mostra como fazer deploy do site **Gordim Barbearia** no Vercel em **menos de 5 minutos**, sem precisar configurar banco de dados externo.

## ✨ Características

- ✅ Banco de dados **simulado em memória** (não precisa de PlanetScale)
- ✅ Frontend + Backend **em um único deploy** no Vercel
- ✅ Dados persistem durante a sessão
- ✅ Perfeito para testes e demonstração

## 📋 Pré-requisitos

1. Conta no **GitHub** (já tem o repositório criado)
2. Conta no **Vercel** (crie em https://vercel.com)

## 🎯 Passo 1: Conectar Vercel ao GitHub (2 min)

1. Acesse https://vercel.com
2. Clique em **"Add New..."** → **"Project"**
3. Clique em **"Import Git Repository"**
4. Busque por `gordim-barbearia`
5. Clique em **"Import"**

## ⚙️ Passo 2: Configurar Build (1 min)

Na página de configuração do projeto:

- **Framework Preset**: Selecione **"Other"** (ou deixe em branco)
- **Build Command**: `pnpm build`
- **Output Directory**: `client/dist`
- **Install Command**: `pnpm install`

## 🔐 Passo 3: Adicionar Variáveis de Ambiente (1 min)

Clique em **"Environment Variables"** e adicione:

```
NODE_ENV = production
```

Pronto! Não precisa de mais nada porque estamos usando banco de dados simulado.

## 🚀 Passo 4: Deploy (1 min)

1. Clique em **"Deploy"**
2. Aguarde o build completar (2-3 minutos)
3. Você receberá uma URL como: `https://gordim-barbearia.vercel.app`

## ✅ Testando

Acesse sua URL e teste:

1. **Homepage**: Veja todas as seções
2. **Agendamento**: Clique em "Agendar Agora"
   - Escolha serviço, barbeiro, data e horário
   - Preencha seus dados
   - Clique em "Confirmar Agendamento"
3. **Painel Admin**: Acesse `/admin`
   - Senha: `gordim2024`
   - Veja os agendamentos criados
   - Adicione serviços, barbeiros, fotos, depoimentos

## 📊 Dados Simulados Iniciais

O banco de dados começa com:

- **2 Barbeiros**: Carlos e João
- **5 Serviços**: Corte Clássico, Corte Premium, Barba, Combo, Sobrancelha
- **2 Fotos**: Exemplos de trabalhos
- **2 Depoimentos**: Avaliações de clientes

Todos os dados que você adicionar ficarão salvos **durante a sessão**. Se o servidor reiniciar, voltarão aos dados iniciais.

## 🔄 Atualizar o Site

Sempre que você fizer mudanças no GitHub:

1. Faça commit e push
2. Vercel detectará automaticamente
3. Fará redeploy em 2-3 minutos
4. Seu site será atualizado

## 🌐 Usar Domínio Personalizado (Opcional)

1. No Vercel, vá para **"Settings"** → **"Domains"**
2. Clique em **"Add Domain"**
3. Digite seu domínio (ex: `gordimbarbearia.com.br`)
4. Siga as instruções para configurar DNS

## 🔐 Mudar Senha do Admin

1. Abra `server/routers.ts`
2. Procure por `gordim2024`
3. Substitua pela nova senha
4. Faça commit e push
5. Vercel fará redeploy automaticamente

## 📞 Atualizar Número de WhatsApp

1. Abra `client/src/components/WhatsAppFloat.tsx`
2. Procure por `5569993135258`
3. Substitua pelo número real da barbearia
4. Faça commit e push
5. Vercel fará redeploy

## ⚠️ Limitações do Banco Simulado

- Dados **não persistem** entre reinicializações
- Ideal para **testes e demonstração**
- Para **produção**, use PlanetScale (veja `DEPLOY-MANUAL.md`)

## 🚀 Próximos Passos

1. ✅ Deploy concluído no Vercel
2. Teste todas as funcionalidades
3. Personalize com suas informações
4. (Opcional) Configure banco de dados real (PlanetScale)
5. (Opcional) Configure domínio personalizado

## 💡 Dicas

- O site funciona **100% offline** (sem dependências externas)
- Perfeito para **MVP** ou **demonstração**
- Fácil de **escalar** para banco de dados real depois
- Todos os **dados são simulados** - seguro para testes

## 🆘 Troubleshooting

### Erro: "Build failed"
- Verifique se o `pnpm-lock.yaml` está no repositório
- Tente fazer push novamente

### Site não carrega
- Aguarde 2-3 minutos após o deploy
- Limpe o cache do navegador (Ctrl+Shift+Del)
- Verifique os logs no Vercel

### Agendamentos não aparecem no admin
- Certifique-se de que está usando a mesma URL
- Recarregue a página (F5)

---

**Pronto! Seu site está em produção! 🎉**

Para suporte ou dúvidas, consulte `DEPLOY-MANUAL.md` para instruções mais detalhadas.
