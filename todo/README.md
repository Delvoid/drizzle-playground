# Drizzle ORM Next.js Todo App

This project serves as a simple demonstration of using Drizzle ORM, a modern TypeScript ORM (Object-Relational Mapping) with turso database in an Next.js app. It is a todo app, with basic crud operations and filtering.

### Live Demo
[demo](https://drizzle-todo-nu.vercel.app/)


### Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- TypeScript
- [Turso](https://docs.turso.tech/tutorials/get-started-turso-cli/)

### Installing

1.  Clone the repository to your local machine.
2.  Install the dependencies using npm install.
3.  Set up your database and modify the db configuration in db/db.ts to match your database settings.
4.  setup .env file
    Set the environment variables: Create a .env file in the root directory and add the variables from the local .env.example file


```bash
cp .env.example .env

```

Ensure you have your turso `auth` token for the env variables

```bash
turso db tokens create [db-name] -e none

```

5. Generate types
```bash
pnpm genereate
```

6. push to database
```bash
pnpm db:push
```

TODO: I tried using migrations here, but kept getting errors. Look into a fix


### Running locally

```bash
pnpm dev
```


[Drizzle ORM](https://orm.drizzle.team/) 

[express.js](https://expressjs.com/)

[Turso](https://turso.tech/)

[Shadcn ui](https://ui.shadcn.com/)
