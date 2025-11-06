API Service (apps/api)

This README contains instructions specific to the api service, primarily for managing the database with Prisma.

It is assumed you have already completed all steps from the root README.md and
your Docker environment (the docker-compose up command) is running. <br/>
When you run docker-compose up for the first time, the postgres_db is empty.
You must apply the schema.prisma (run migrations) to create the tables.
Open a SECOND terminal (do not close the docker-compose up terminal).

🗄️ Managing Prisma Migrations

All Prisma commands must be run inside apps/api.

**1.  How to Create a New Migration (Changing the Schema)** <br/>
If you change the apps/api/prisma/schema.prisma file (e.g., add a new field to the User model),
you must generate a new .sql migration file. <br/>
**1.1** Run prisma migrate dev: <br/>
pnpm --filter api exec prisma migrate dev --name <your-migration-name> <br/>
Example: pnpm --filter api exec prisma migrate dev --name add-email-to-user <br/>
**1.2** What happens: <br/>
Prisma creates a new folder in apps/api/prisma/migrations/ with your name and a .sql file. <br/>
Prisma automatically applies this new migration to your postgres_db in Docker.

**2. How to Apply Migrations** <br/>
If you just cloned the project (or git pull brought in new migrations), you need to apply them. <br/>
**2.1** Run the same migrate dev command: <br/>
pnpm --filter api exec prisma migrate dev --name init <br/>
**2.2** Prisma will see that the database is "behind" the migrations folder and apply all pending migrations.