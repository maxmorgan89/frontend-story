## [Seeding your database](https://www.prisma.io/docs/guides/migrate/seed-database)

Seeding allows you to consistently re-create the same data in your database and can be used to:

- Populate your database with data that is required for your application to start - for example,
  a default language or a default currency.
- Provide basic data for validating and using your application in a development environment. This
  is particularly useful if you are using Prisma Migrate, which sometimes requires resetting
  your development database.

### How to seed your database in Prisma

Prisma's integrated seeding functionality expects a command in the `"seed"` key in the `"prisma"` 
key of your `package.json` file.

```json lines
// package.json
"prisma": {
  "seed": "ts-node prisma/seed.ts" // path to seed file.
},
```

Some projects may require you to add compile options. When using `Next.js` for example, you would 
setup your seed script like so:

```json lines
// package.json
"prisma": {
  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
},
```

### Integrated seeding with Prisma Migrate

Database seeding happens in two ways with Prisma: manually with `prisma db seed` and automatically
in `prisma migrate dev` and `prisma migrate reset`.

With prisma db seed, you decide when to invoke the seed command. It can be useful for a test 
setup or to prepare a new development environment, for example.

### User-defined arguments

`prisma db seed` allows you to define custom arguments in your seed file that you can pass to
the `prisma db seed` command. For example, you could define your own arguments to seed different
data for different environments or partially seeding data in some tables.

```shell
npx prisma db seed -- --environment development
```

### Example seed scripts

Create a new file named seed.ts. This can be placed anywhere within your projects folder structure.

In the seed.ts file, import Prisma Client, initialize it and create some records.

```
// schema.prisma
model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String
  published Boolean
  user      User    @relation(fields: [userId], references: [id])
  userId    Int
}
```

```typescript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      posts: {
        create: {
          title: 'Check out Prisma with Next.js',
          content: 'https://www.prisma.io/nextjs',
          published: true,
        },
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      posts: {
        create: [
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma',
            published: true,
          },
          {
            title: 'Follow Nexus on Twitter',
            content: 'https://twitter.com/nexusgql',
            published: true,
          },
        ],
      },
    },
  })
  console.log({ alice, bob })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```

Add the `prisma.seed` field to your package.json file:

```json lines
{
  "name": "my-project",
  "version": "1.0.0",
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  },
  "devDependencies": {
    "@types/node": "^14.14.21",
    "ts-node": "^9.1.1",
    "typescript": "^4.1.3"
  }
}
```

To seed the database, run the db seed CLI command:

```shell
npx prisma db seed
```
