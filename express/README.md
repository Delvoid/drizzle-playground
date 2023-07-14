# Drizzle ORM Express API Example

This project serves as a simple demonstration of using Drizzle ORM, a modern TypeScript ORM (Object-Relational Mapping), in an Express.js API to perform basic CRUD (Create, Read, Update, Delete) operations on a user database. It is a command-line interface (CLI) application built with Node.js and TypeScript.

### Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- TypeScript
- A compatible database for Drizzle ORM

### Installing

1.  Clone the repository to your local machine.
2.  Install the dependencies using npm install.
3.  Set up your database and modify the db configuration in db/db.ts to match your database settings.
4. setup .env file
Set the environment variables: Create a .env file in the root directory and add the variables from the local .env.example file


```bash
cp .env.example .env

```

### Usage

This API supports the following endpoints:

- `POST` /api/user to create a new user. The `fullName` is received in the request body as JSON.
- `GET` /api/user to list all users.
- `PATCH` /api/user/:id to update a user. The new `fullName` is received in the request body as JSON, and the ID is received as a URL parameter.
- `DELETE` /api/user/:id to delete a user. The ID is received as a URL parameter.




### Tests

To run the tests, use the following command:

```bash

npm run test

```

These are a set of basic tests.




[Drizzle ORM](https://orm.drizzle.team/)

[express.js](https://expressjs.com/)
