## [Migrations](https://www.prisma.io/docs/concepts/components/prisma-migrate)

### What are database migrations?

Database migrations are a controlled set of changes that modify and evolve the structure of
your database schema. Migrations help you transition your database schema from one state to
another. For example, within a migration you can create or remove tables and columns, split
fields in a table, or add types and constraints to your database.

### Get started with Prisma Migrate

Create migration:

```shell
prisma migrate dev --name my_migration_name
```

Your Prisma schema is now in sync with your database schema, and you have initialized a
migration history:

```shell
migrations/
  └─ 20210313140442_my_migration_name/
    └─ migration.sql
```

A `_prisma_migrations` table is added in the database, which is used to check:

- If a migration was run against the database
- If an applied migration was deleted
- If an applied migration was changed

> **Do not edit** or delete migrations that have been applied!

You must commit the entire prisma/migrations folder to source control. This includes the
`prisma/migrations/migration_lock.toml` file, which is used to detect if you have attempted to
change providers.

### Development environments

In a development environment, use the `migrate dev` command to generate and apply migrations:

```shell
npx prisma migrate dev
```

> `migrate dev` is a development command and should never be used in a production environment.

This command:

1. Reruns the existing migration history in the shadow database in order to detect schema drift
   (edited or deleted migration file, or a manual changes to the database schema)
2. Applies pending migrations to the shadow database (for example, new migrations created by
   colleagues)
3. Generates a new migration from any changes you made to the Prisma schema before running
   migrate dev
4. Applies all unapplied migrations to the development database and updates the \_prisma_migrations
   table
5. Triggers the generation of artifacts (for example, Prisma Client)

The `migrate dev` command will prompt you to reset the database in the following scenarios:

- Migration history conflicts caused by modified or missing migrations
- The database schema has drifted away from the end-state of the migration history

##### Reset the development database:

```shell
npx prisma migrate reset
```

1. Drops the database/schema if possible, or performs a soft reset if the environment does not
   allow deleting databases/schemas
2. Creates a new database/schema¹ with the same name if the database/schema¹ was dropped
3. Applies all migrations
4. Runs seed scripts

##### Customizing migrations

Sometimes, you need to modify a migration before applying it. For example:

- You want to introduce a significant refactor, such as changing blog post tags from a String[]
  to a Tag[]
- You want to rename a field (by default, Prisma Migrate will drop the existing field)
- You want to change the direction of a 1-1 relationship

The `--create-only` command allows you to create a migration without applying it:

```shell
npx prisma migrate dev --create-only
```

To apply the edited migration, run `prisma migrate dev` again.

### Production and testing environments

In production and testing environments, use the `migrate deploy` command to apply migrations:

```shell
npx prisma migrate deploy
```

> Note: migrate deploy should generally be part of an automated CI/CD pipeline, and we do not
> recommend running this command locally to deploy changes to a production database.

This command:

1. Compares applied migrations against the migration history and warns if any migrations have been
   modified.
2. Applies pending migrations

The `migrate deploy` command:

- Does not issue a warning if an already applied migration is missing from migration history
- Does not detect drift (production database schema differs from migration history end state -
  for example, due to a hotfix
- Does not reset the database or generate artifacts (such as Prisma Client)
- Does not rely on a shadow database
