Created with Next.js, Chakra, Prisma and PostgreSQL.

Credit: DLParkin [bookStore-stock-manager](https://github.com/DLParkin/bookStore-stock-manager)

## Features

- Books:
  - Activate (Books Active in-store)
  - Auto Remove 
  - Search

  - Park Add
  - Park Manual Add
  - Oldest Books

- Sales
  - Book Stock Movement Stats
  - Book Removal Report

TODO:

- Customer Requests
  - Add
  - Remove
  - Search

## Getting Started

First, install [PostgreSQL](https://www.postgresql.org/) and initialise PostgreSQL.

Secondly, you need to install dependencies:

```bash
npm install
```

Thirdly, edit the .env configuration file, there is an example env provided:

```
DATABASE_URL="postgresql://username:password@localhost:5432/books"
```

Then run [Prisma DB Push](https://www.prisma.io/docs/reference/api-reference/command-reference#db-push) to push schema to the database:

```bash
npx prisma db push
```

Now you can run the following command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Further Schema edits

Also if not working with database this is another fix.

```bash
npx prisma migrate dev --name <editname, just like commits.>
```
