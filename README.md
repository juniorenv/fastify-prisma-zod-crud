[TYPESCRIPT__BADGE]: https://img.shields.io/badge/typescript-D4FAFF?style=for-the-badge&logo=typescript
[FASTIFY__BADGE]: https://img.shields.io/badge/fastify-000000?style=for-the-badge&logo=fastify
[PRISMA__BADGE]: https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma
[ZOD__BADGE]: https://img.shields.io/badge/zod-3068B7?style=for-the-badge&logo=zod
[JWT__BADGE]: https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens
[POSTGRES__BADGE]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[DOCKER__BADGE]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white

<h1 align="center" style="font-weight: bold;">Fastify Prisma Zod CRUD API 🚀</h1>

![TypeScript][TYPESCRIPT__BADGE]
![Fastify][FASTIFY__BADGE]
![Prisma][PRISMA__BADGE]
![Zod][ZOD__BADGE]
![JWT][JWT__BADGE]
![PostgreSQL][POSTGRES__BADGE]
![Docker][DOCKER__BADGE]

<p align="center">
 <a href="#started">Getting Started</a> • 
 <a href="#routes">API Endpoints</a> •
 <a href="#features">Features</a>
</p>

<p align="center">
  <b>A modern TypeScript REST API built with Fastify, Prisma, and Zod validation. This project demonstrates a complete CRUD implementation with JWT authentication, password hashing.</b>
</p>

<h2 id="features">✨ Features</h2>

- **Fast & Lightweight**: Built with Fastify for high performance
- **Type Safety**: Full TypeScript support with strict typing
- **Data Validation**: Zod schemas for request/response validation
- **Database ORM**: Prisma for type-safe database operations
- **Authentication**: JWT-based authentication system
- **Authorization**: User ownership verification for protected routes
- **Password Security**: Bcrypt password hashing
- **Clean Architecture**: Separation of concerns with repositories, use cases, and routes
- **Docker Support**: Containerized deployment with Docker Compose
- **PostgreSQL**: Production-ready database with migrations

<h2 id="started">🚀 Getting Started</h2>

<h3>Prerequisites</h3>

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v20 or higher)
- [pnpm](https://pnpm.io/) (recommended) or npm
- [Docker](https://www.docker.com/) (optional, for containerized deployment)
- [PostgreSQL](https://www.postgresql.org/) (if running without Docker)


### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/juniorenv/fastify-prisma-zod-crud.git
cd fastify-prisma-zod-crud
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Environment setup**
```bash
cp .env.example .env
```

4. **Configure environment variables**
```env
HOST="0.0.0.0"
PORT=3000
JWT_SECRET=your-super-secret-jwt-key
DATABASE_URL=postgresql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>
```

5. **Database setup**
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# (Optional) Open Prisma Studio
npx prisma studio
```

6. **Start development server**
```bash
pnpm run dev
```

### Docker Setup

**Using Docker Compose** (Recommended)

1. **Clone the repository**
```bash
git clone https://github.com/juniorenv/fastify-prisma-zod-crud.git
cd fastify-prisma-zod-crud
```

2. **Environment setup**
```bash
cp .env.example .env
```

3. **Configure environment variables**
```env
HOST="0.0.0.0"
PORT=3000
JWT_SECRET=your-super-secret-jwt-key
DATABASE_URL=postgresql://pguser:123@db:5432/testdb
```

4. **Start services**
```bash
docker compose up -d
```

The API will be available at `http://localhost:3000`


<h2 id="routes">📍 API Endpoints</h2>

### Authentication

| Route | Method | Description | Authentication |
|-------|--------|-------------|----------------|
| `/api/login` | POST | User login | No |

### Users

| Route | Method | Description | Authentication |
|-------|--------|-------------|----------------|
| `/api/users` | POST | Create new user | No |
| `/api/users` | GET | List all users | Yes |
| `/api/users/me` | GET | Get current user profile | Yes |
| `/api/users/:userId` | GET | Get user by ID | Yes |
| `/api/users/:userId` | PATCH | Update user (partial) | Yes (Owner only) |
| `/api/users/:userId` | PUT | Replace user (complete) | Yes (Owner only) |
| `/api/users/:userId` | DELETE | Delete user | Yes (Owner only) |

---

*The `/api/users/:userId?` endpoint serves dual purposes for demonstration:
- `GET /api/users` - Returns all users (for demo purposes)
- `GET /api/users/123` - Returns specific user by ID

<h3>Authentication Endpoints</h3>

<h4>POST /api/login</h4>

Authenticate user and receive JWT token.

**REQUEST**
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**RESPONSE**
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

<h3>User Management Endpoints</h3>

<h4>POST /api/users</h4>

Create a new user account.

**REQUEST**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**RESPONSE**
```json
{
  "message": "User successfully created",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "password": "$...",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

<h4>GET /api/users/me</h4>

Get current authenticated user profile.

**REQUEST**
```bash
curl -X GET http://localhost:3000/api/users/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**RESPONSE**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$...",
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

<h4>GET /api/users</h4>

List all users.

**REQUEST**
```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```
**RESPONSE**
```json
{
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "password": "$...",
    "createdAt": "2025-01-01T00:00:00.000Z"
  },
  {
    "id": "660f9511-f30c-52e5-b827-557766551111",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "password": "$...",
    "createdAt": "2025-01-02T00:00:00.000Z"
  }
}
```

<h4>GET /api/users/:userId</h4>

Get user by ID.

**REQUEST**
```bash
curl -X GET http://localhost:3000/api/users/USER_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```
**RESPONSE**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$...",
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```
<h4>PATCH /api/users/:userId</h4>

Update user account (partial update). Only the user owner can update their account.

**REQUEST**
```bash
curl -X PATCH http://localhost:3000/api/users/USER_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
  }'
```

**RESPONSE**
```json
{
  "message": "User successfully updated",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Jane Doe",
    "email": "john@example.com",
    "password": "$...",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

<h4>PUT /api/users/:userId</h4>

Update user account (complete update). Only the user owner can update their account.

**REQUEST**
```bash
curl -X PUT http://localhost:3000/api/users/USER_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe 2",
    "email": "janedoe@example.com",
    "password": "newpassword"
  }'
```
**RESPONSE**
```json
{
  "message": "User successfully replaced",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Jane Doe 2",
    "email": "janedoe@example.com",
    "password": "$...",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

<h4>DELETE /api/users/:userId</h4>

Delete user account. Only the user owner can delete their account.

**REQUEST**
```bash
curl -X DELETE http://localhost:3000/api/users/USER_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**RESPONSE**
```json
{
  "message": "User successfully removed",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Jane Doe 2",
    "email": "janedoe@example.com",
    "password": "$...",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

## 🏗️ Project Structure
```
src/
├── functions/
│   └── error.ts           # Error handling utilities
├── lib/
│   └── prisma.ts          # Prisma client configuration
├── repositories/
│   └── user.repository.ts # Data access layer
├── routes/
│   ├── login/
│   │   └── index.ts       # Authentication routes
│   └── users/
│       └── index.ts       # User CRUD routes
├── settings/
│   └── env.ts             # Environment configuration
├── types/
│   ├── jwt.d.ts           # JWT type definitions
│   ├── request.interface.ts # Request interfaces
│   └── user.interface.ts  # User type definitions
├── usecases/
│   └── user.usecase.ts    # Business logic layer
└── server.ts              # Application entry point
```

<h2 id="validation">🔍 Input Validation</h2>

The API uses Zod for comprehensive input validation:

- **Email validation**: Ensures valid email format
- **Password strength**: Minimum 3 characters (configurable)
- **Name validation**: Minimum 3 characters
- **Type safety**: All inputs are validated against TypeScript interfaces

<h2 id="security">🔒 Security Features</h2>

- **Password Hashing**: Uses bcrypt for secure password storage
- **JWT Authentication**: Stateless authentication with configurable expiration
- **Route Protection**: Middleware-based authentication checks
- **User Ownership**: Users can only modify their own accounts
- **Input Validation**: All requests validated against Zod schemas

<h2 id="database">🗄️ Database</h2>

- **PostgreSQL**: Production-ready relational database
- **Prisma ORM**: Type-safe database operations
- **Migrations**: Version-controlled database schema changes
- **UUID Primary Keys**: Secure, globally unique identifiers
