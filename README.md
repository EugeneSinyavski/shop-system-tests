Shop System

🗄️ Project Structure

**/apps/api**: The main NestJS application (backend). <br/>
**/packages/dto**: Shared DTOs (Data Transfer Objects) for the API. <br/>
**/docker-compose.yml**: Manages the startup of the api and postgres_db. <br/>
**/apps/api/Dev.dockerfile**: Dockerfile for development (with hot-reload).

🚀 Getting Started
These steps describe how to run the complete development environment (API + Database) using Docker.

**1. Prerequisites**

Node.js (v20+) <br/>
pnpm (v9+) <br/>
Docker Desktop (must be running) <br/>
Git

**2. Installation**

**2.1** Clone the repository:

git clone <your-repository-url> <br/>
cd shop-system

**2.2** Install dependencies: (This is necessary for pnpm to link the workspace and for your IDE to see the types).

pnpm install

**3. Environment Setup**

The project requires two .env files to run (as per requirements).
You should replace the default variables with your own values.

**3.1** Root .env <br/>
**3.2** API .env (for NestJS)

**4. Running the Application**

**4.1** Start Docker Compose: (This command will build the Dev.dockerfile and start both api and postgres_db) <br/>
--build is only needed the first time or if you change a Dockerfile <br/>
docker-compose up --build -d

**4.2** The server is running!

      The API will be available at http://localhost:3000
      The Swagger UI (documentation) will be at: http://localhost:3000/api-docs
      Hot-reload is enabled: Any changes in apps/api or packages/dto will automatically restart the server.