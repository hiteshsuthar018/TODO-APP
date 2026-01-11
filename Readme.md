# Todo Board – Full Stack Application

This project is a full stack Todo Board application.

## I have deployed the app you can also see on the on 

[todo.hitesh.live](https://todo.hitesh.live)

The repository contains two main folders:

- `server` – Backend (Node.js, Express, Prisma, PostgreSQL)
- `client` – Frontend (React, TypeScript, Vite)

---

## Project Setup

### 1. Backend Setup (Server)

Go to the server folder:

```bash
cd server
npm install
````

Create a `.env` file inside the `server` folder and add the following:

```env
DATABASE_URL=postgresql://neondb_owner:npg_E8tqZ2DkGdzA@ep-solitary-darkness-ahhw5x00-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
JWT_SECRET=32h423204203j4344jk334b34
PORT=3000
```

Run Prisma commands:

```bash
npx prisma migrate
npx prisma generate
```

Start the backend server:

```bash
npm run dev
```

---

### 2. Database Notes

If the Neon database URL fails due to remote connectivity issues, you have two options:

#### Option 1: Use another Neon database URL

Create a new database in Neon and replace the `DATABASE_URL` in `.env`.

#### Option 2: Use Docker (Local PostgreSQL)

Make sure Docker is running, then execute:

```bash
docker compose up -d
```

Update your `.env` file with the local database URL:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
JWT_SECRET=32h423204203j4344jk334b34
PORT=3000
```

Run Prisma again:

```bash
npx prisma migrate
npx prisma generate
```

Then start the server:

```bash
npm run dev
```

---

## Frontend Setup (Client)

Go to the client folder:

```bash
cd client
```
Create a `.env` file inside the `client` folder and add the following:

```env
VITE_BACKEND_URL=http://localhost:3000/api
```

```bash
npm install
npm run dev
```

---

## Access the Application

Open your browser and visit:

```text
http://localhost:5173
```

---

## the architecture of project added in Docs.md file

## Notes for Reviewers

* Backend and frontend are separated into `server` and `client`
* Prisma is used for database schema and migrations
* JWT is used for authentication
* Zustand is used for global state management
* Dark mode and authentication state are persisted


