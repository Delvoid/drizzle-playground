# Drizzle ORM CLI Example

This project serves as a simple demonstration of using Drizzle ORM, a modern TypeScript ORM (Object-Relational Mapping), to perform basic CRUD (Create, Read, Update, Delete) operations on a user database. It is a command-line interface (CLI) application built with Node.js and TypeScript.

### Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- Node.js
- TypeScript
- A compatible database for Drizzle ORM

### Installing
   1. Clone the repository to your local machine.
   2. Install the dependencies using npm install.
   3. Set up your database and modify the db configuration in db/db.ts to match your database settings.

### Usage
This CLI supports the following commands:

- create: Create a new user.
- list: List all users.
- update: Update an existing user.
- delete: Delete an existing user.

Here are some examples on how to use these commands:

```bash
# Create a new user
node app.js create "John Doe"

# List all users
node app.js list

# Update a user
node app.js update 1 "Jane Doe"

# Delete a user
node app.js delete 1

```


[Drizzle ORM](https://orm.drizzle.team/)