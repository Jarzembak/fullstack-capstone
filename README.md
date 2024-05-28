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

4. Add a `.env` file with your secret value for auth, and your database URL
```
JWT_SECRET='somesecretvalue'
DATABASE_URL="postgresql://your-user-name@localhost:5432/your-database-name"
```

5. Create the database

```bash
createdb your-database-name
```

6. Seed the database using prisma
```bash
npx prisma migrate dev
```

7. Start the server
```bash
npm run dev
```

8. Open your browser at `http://localhost:3000`