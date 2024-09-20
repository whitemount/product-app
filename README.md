# Getting Started with Product App

Backend with Nest.js Framework
Frontend with Create React App.

## <span style="color: LightGoldenRodYellow;">Database configuration</span>

### Configuration file for PostgreSQL
    /product-app/backend/src/config/database.config.ts

### Roles:
- You only need admin to test
- **Admin**: Full access (CRUD, user management).
- **Editor**: Create, read, update records (no delete).
- **Viewer**: Read-only access.

### SQL Commands:
1. **Create Roles**:
   ```sql
   CREATE ROLE admin_user WITH LOGIN PASSWORD 'password';
   CREATE ROLE editor_user WITH LOGIN PASSWORD 'password';
   CREATE ROLE viewer_user WITH LOGIN PASSWORD 'password';

2. **Assign Permissions**:
    ```sql
    GRANT ALL PRIVILEGES ON DATABASE your_db TO admin_user;
    GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO editor_user;
    GRANT SELECT ON ALL TABLES IN SCHEMA public TO viewer_user;

## Available Scripts

You can start both apps ->
In the root directory [/product-app]

### 1. `npm run install:all`

### 2. `npm run start`

### 3. Open [http://localhost:3001](http://localhost:3001) (Frontend).


---
Backend can be started separated:

### 1. in /product-app/backend  `npm run start`

## 2. [http://localhost:3000](http://localhost:3000)

### Example of curl:
    ```bash curl -u admin:admin -X POST http://localhost:3000/products \
    -H "Content-Type: application/json" \
    -d '{"name": "Laptop", "description": "Top", "price": 1500, "inStock": true}';
   

