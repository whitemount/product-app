# Product App - Developer Guide

## Database Setup

This application uses PostgreSQL as its database. Follow these steps to set up the database and configure the necessary roles.

### 1. Install PostgreSQL

If you haven't already, install PostgreSQL on your system. You can download it from [the official PostgreSQL website](https://www.postgresql.org/download/).

### 2. Create the Database

Open your terminal and connect to PostgreSQL as a superuser:

```bash
sudo -u postgres psql
```

Then create the database:

```sql
CREATE DATABASE productdb;
```

### 3. Create a User and Grant Permissions

Create a new user and grant the necessary permissions:

```sql
CREATE USER productuser WITH ENCRYPTED PASSWORD 'your_password_here';
GRANT ALL PRIVILEGES ON DATABASE productdb TO productuser;
```

### 4. Configure Schema Permissions

Connect to the `productdb` database:

```sql
\c productdb
```

Grant the necessary permissions on the public schema:

```sql
GRANT ALL ON SCHEMA public TO productuser;
GRANT ALL ON ALL TABLES IN SCHEMA public TO productuser;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO productuser;
```

Set default privileges for future tables and sequences:

```sql
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO productuser;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO productuser;
```

### 5. Configure Database Connection

In your backend NestJS application, update the `database.config.ts` file with the correct database connection details:

```typescript
export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'productuser',
  password: 'your_password_here',
  database: 'productdb',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, // Set to false in production
};
```

## Running the Application

### Backend (NestJS)

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run start:dev
   ```

The backend will be available at `http://localhost:3000`.

### Frontend (React)

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

The frontend will be available at `http://localhost:3001`.

## Authentication

This application uses basic authentication. When interacting with protected endpoints, you'll need to provide the username and password set up in the backend.

## API Endpoints

- GET /products - Fetch all products (paginated)
- GET /products/:id - Fetch a single product
- POST /products - Create a new product (protected)
- PUT /products/:id - Update a product (protected)
- DELETE /products/:id - Delete a product (protected)

## Troubleshooting

If you encounter any "permission denied" errors when accessing the database:

1. Ensure that the user has the correct permissions.
2. Check that the database connection details in `database.config.ts` are correct.
3. Verify that PostgreSQL is configured to allow connections from your application (check `pg_hba.conf`).

For any other issues, please check the application logs or open an issue in the project repository.
