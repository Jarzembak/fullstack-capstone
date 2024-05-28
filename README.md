#  2311-FSA-ET-WEB-PT-SF Capstone Project
Option 2: E-Commerce App

Group 5: James Boyd, Trent Snare, David Martin

A PERN (PostgreSQL, Express.js, React, Node.js) stack application. 

##  Getting Started

Refer to package.json for scripts and dependencies used.

1. Copy or clone the GitHub repository to your local machine.
( git clone git@github.com:Jarzembak/fullstack-capstone.git )

3. Install packages

```bash
npm i
```

4. Add a `.env` file with your secret value for auth
```
JWT_SECRET='somesecretvalue'
```

5. Create the database

```bash
createdb your-database-name
```

6. Update `src/server/db/client.js` to reflect the name of your database

```js
const connectionString = process.env.DATABASE_URL || 'https://localhost:5432/your-database-name';
```

7. Seed the database using prisma
```bash
npx prisma migrate dev
```

8. Start the server
```bash
npm run dev
```

9. Open your browser at `http://localhost:3000`