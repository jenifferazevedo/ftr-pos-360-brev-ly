# FTR Pós 360 Brev.ly

This is FTR activity where we can save links with short links alias and export a CSV file with the saved link list.

## Technology

**DB:** Postgres

**Server:** Node, Fastify, TypeScript, Drizzle, Zod

**Client:** React, Vite, Typescript, TailwindCSS, React Query, React Hook Form, Radix

## Install and Run

Used node v23. Follow the install steps:

### Env file

Use the env.example to create your env. file with the necessary data.

### Server - Dev
From the project root

```bash
cd server

docker-compose -f docker-compose.dev.yml up -d

npm i 

npm run dev 
```

### Server - Docker
From the project root

```bash
cd server

docker-compose -f docker-compose.yml up -d

```

##### Obs: The docker-compose.dev.yml will up the Postgres DB and run the migrations and need the "db" as host in the DATABASE_URL

### Web

```bash
cd web 

npm i 

npm run dev 
```

### DevOps

The DevOps was done only to the server folder, where we have:
- **docker-compose.yml**: responsible for the DB, Migrations and Server
- **github actions**: where we have 3 action
  - build: run the server build - when push on main or do a PR to main
  - docker-publish.yml: publish docker image on ECR - triggered manually by option
  - docker-publish-and-deploy.yml: publish docker image on ECR and deploy on ECS - triggered manually by option 

## Usage

On the browser, access localhost:5173 and try it!!!
