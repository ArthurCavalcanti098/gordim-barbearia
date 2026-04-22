FROM node:22-alpine

WORKDIR /app

# Copiar package.json e pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Instalar pnpm
RUN npm install -g pnpm@10.4.1

# Instalar dependências
RUN pnpm install --frozen-lockfile

# Copiar código-fonte
COPY . .

# Build da aplicação
RUN pnpm build

# Expor porta (Railway injeta PORT como variável de ambiente)
EXPOSE 3000

# Iniciar servidor
CMD ["node", "dist/index.js"]
