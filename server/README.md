# Brev.ly

This is the backend api.

## Technology

**DB:** Postgres

**Server:** Node, Fastify, TypeScript, Drizzle, Zod

## Install and Run

Used node v23.

### Env file

Use the env.example to create your env. file with the necessary data.

### Server

```bash

docker-compose -f docker-compose.dev.yml up -d

npm i 

npm run dev 

```

##### Obs: The docker-compose.dev.yml will up the Postgres DB and run the migrations and need the "db" as host in the DATABASE_URL

### DevOps

The DevOps was done only to the server folder, where we have:
- **docker-compose.yml**: responsible for the DB, Migrations and Server
- **github actions**: where we have 3 action
  - build: run the server build - when push on main or do a PR to main
  - docker-publish.yml: publish docker image on ECR - triggered manually by option
  - docker-publish-and-deploy.yml: publish docker image on ECR and deploy on ECS - triggered manually by option 

## Considerations

To run the docker publish and deploy actions, the vars and secrets are required.
