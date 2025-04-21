# User Controller

## Visão Geral
Este projeto é um backend desenvolvido com ``Node.js``, ``Express``, ``Prisma ORM`` e ``TypeScript``, seguindo os princípios do ``SOLID``, ``Clean Architecture`` e ``Clean Code``. Trata-se de uma aplicação simples de um `CRUD` de usuários, utilizando  ``Testes unitários`` com `Jest`, e com armazenamento no ``PostgreSQL``. O sistema foi desenvolvido seguindo a metodologia ágil ``Scrum``.

## Tecnologias Utilizadas
- ``Node.js``
- ``Express``
- ``Prisma ORM``
- ``TypeScript``
- ``Jest``
- ``Docker``
- ``PostgreSQL``
- ``API RESTful``
- ``Scrum`` (com sprints documentadas no Notion)

## Estrutura de Pastas
```
src/
  ├── controllers/
  │     ├── user/
  │     │     ├── create/
  │     │     ├── delete/
  │     │     ├── get/
  │     │     ├── update/
  ├── entities/
  │     ├── user.ts
  ├── infrastructure/
  │     ├── database/
  │     ├── repositories/
  ├── middlewares/
  │     ├── error-handler.ts
  ├── routes/
  │     ├── routes.ts
  ├── types/
  │     ├── http.ts
  ├── use-cases/
  │     ├── user/
  │     │     ├── create/
  │     │     ├── delete/
  │     │     ├── get/
  │     │     ├── update/
  ├── main.ts
  ├── Dockerfile
  ├── docker-compose.yml
  ├── entrypoint.sh
  ├── .dockerignore
```

## Entidade

### Usuário (`User`)
```typescript
export interface User {
    id: string;
    name: string;
    email: string;
}
```

## Endpoints

- **POST** `users/create` - Criar um novo usuário
- **GET** `users/all-users` - Listar todos os usuários
- **DELETE** `users/delete/:id` - Deletar usuário
- **PUT** `users/update/:id` - Atualizar usuário

## Métodologia de desenvolvimento
O projeto está sendo desenvolvido utilizando a métodologia agil Scrum, as sprints foram desenvolvidas por mim, no Notion, e estão divididas em:
- **Backlog** - Lista geral de tarefas.
- **Sprint Backlog** - Lista de tarefas semanais.
- **To Do** - Foco atual.
- **In Progress** - Tarefas em andamento.
- **Done** - Sprints finalizadas.

## Configuração do Ambiente
1. Clone o repositório:
   ```bash
   git clone https://github.com/jhondharkyson520/crud-simple-jest.git
   ```
2. Acesse o diretório do projeto:
   ```bash
   cd crud-simple-jest
   ```
3. Configure as variáveis de ambiente no arquivo `.env`.
   Basta editar o arquivo `example.env`, altere-o de acordo com suas informações e o renomeie para `.env`.

4. Instale as dependências:
   ```bash
   npm install
   npx prisma generate
   npx prisma migrate dev
   ```

5. Execute o projeto com Docker:
   ```bash
   docker-compose up --build
   ```
6. Ou execute localmente sem Docker:
   ```bash
   npm run dev
   ```

7. O servidor estará disponível em `http://localhost:PORTA`.

## Variável ambiente .env
Foi criado uma variável ``example.env`` para facilitar. Modifique-a com suas informações e a renomeie para  `.env`. Faça isso antes de executar o projeto.
