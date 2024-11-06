# Book Management API

A REST API for managing your books, built with Node.js, Express, and MySQL.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup local](#database-setup-local)
- [Scripts](#scripts)
- [Docker](#docker)
- [Author](#author)
- [Version](#version)

## Requirements

- [Node.js](https://nodejs.org/)
- [MySQL Server](https://www.mysql.com/)
- [Docker & Docker Compose](https://www.docker.com/) (Optional, for containerized deployment)

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd book-management
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create the `.env` file**:
   Copy the `.env.example` file to a new `.env` file, which contains configurations.

   ```bash
   cp .env.example .env
   ```

## Configuration

The `.env` file holds all configuration variables necessary to run the application. Below is an explanation of each key variable:

- **Server Settings**:
    - `APP_PORT`: Port on which the server will run.
    - `APP_DOCKER_PORT`: Port to expose when running with Docker.
    - `NODE_ENV`: Set to `development` for local development, Set to `staging` for docker.
  
- **Logging**:
    - `WINSTON_LOG_LEVEL`: Set log level for Winston (e.g., `debug`, `info`, `warn`, `error`).

- **Authentication**:
    - `JWT_SECRET_KEY`: A secret key used to sign JSON Web Tokens (JWT).

- **User Roles**:
    - `USER_WRITE`: Username with write privileges.
    - `USER_READ`: Username with read privileges.

- **Database Settings**:
    - `LOCAL_DB_CLIENT`: Database client for local development (tested with `mysql2`).
    - `LOCAL_DB_HOST`: Local database host (e.g., `127.0.0.1`).
    - `LOCAL_DB_USER`: Local database user (e.g., `admin_user`).
    - `LOCAL_DB_PASS`: Password for the local database user.
    - `LOCAL_DB_NAME`: Local database name (e.g., `bookmanagement`).
    - `LOCAL_DB_PORT`: Local database port (e.g., `3306`).

    - `DOCKER_DB_CLIENT`: Database client for docker (e.g., `mysql2`).
    - `DOCKER_DB_HOST`: docker database host.
    - `DOCKER_DB_USER`: docker database user.
    - `DOCKER_DB_PASS`: Password for the docker database user.
    - `DOCKER_DB_NAME`: docker database name (e.g., `bookmanagement`).
    - `DOCKER_DB_PORT`: docker database port (e.g., `3306`).
    - 
- **Database Settings**:
    - `DOCKER_DB_DOCKER_PORT`: External port to access Dockerized MySQL.
    - `DOCKER_DB_ROOT_PASSWORD`: Root password for the Docker MySQL container.
    - `DOCKER_DB_DATABASE`: Database to create in Docker MySQL container.

Update your `.env` file with the necessary details for your environment.

## Database Setup local

1. **Create the MySQL Database and User**:
   Ensure your MySQL server is running, then create a database matching the `LOCAL_DB_NAME` specified in your `.env` file.
2. Then create a user matching the `LOCAL_DB_USER`, the development user for needs also CREATE and DROP grants for certain knex operations.

   ```sql
   CREATE DATABASE bookmanagement;
   CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
   GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP ON bookmanagement.* TO 'username'@'localhost';
   ```
   
3. **Run Migrations**:
   Use Knex to run migrations and set up the database schema.

   ```bash
   npm run knex:migrate
   ```

4**Seed the Database** 
   Populate the database with initial data:

   ```bash
   npm run knex:seed
   ```

## Scripts

The `package.json` file includes various scripts for running, testing, and maintaining the project:

- **Start the server**:
  ```bash
  npm start
  ```

- **Start the server in development mode**:
  ```bash
  npm run start-dev
  ```

- **Run Knex migrations**:
  ```bash
  npm run knex:migrate
  ```

- **Rollback Knex migrations**:
  ```bash
  npm run knex:rollback
  ```

- **Lint code**:
  ```bash
  npm run lint
  ```

- **Run tests**:
  ```bash
  npm run test
  ```

- **Check test coverage**:
  ```bash
  npm run test:coverage
  ```
## Docker
Start the application with Docker Compose, in the root directory of your project, run:

```bash
docker-compose up
```

## Author

Simon Dietrich

## Version

0.1.2

