FROM node:alpine AS build

WORKDIR /usr/src/user
COPY package*.json ./
RUN npm install
RUN npm install --save-dev prisma@latest @prisma/client@latest
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:alpine
WORKDIR /usr/src/user
COPY --from=build /usr/src/user/dist ./dist
COPY --from=build /usr/src/user/node_modules ./node_modules
COPY --from=build /usr/src/user/package*.json ./
COPY --from=build /usr/src/user/prisma ./prisma
COPY --from=build /usr/src/user/entrypoint.sh ./
RUN apk add --no-cache netcat-openbsd
RUN apk add --no-cache openssl
RUN npm i --save-dev prisma@latest
RUN npm i @prisma/client@latest
RUN chmod +x entrypoint.sh
EXPOSE 3000
CMD ["sh", "entrypoint.sh"]
