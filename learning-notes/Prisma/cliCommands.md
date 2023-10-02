## [CLI Commands](https://www.prisma.io/docs/reference/api-reference/command-reference)

### version

The version command outputs information about your current prisma version, platform, and engine
binaries.

```shell
prisma version
```

### init

Bootstraps a fresh Prisma project within the current directory.

It creates a prisma directory containing a bare-bones schema.prisma file within your current
directory.

```shell
prisma init
```

### generate

The generate command is most often used to generate Prisma Client with the `prisma-client-js`
generator.

```shell
prisma generate
```

### validate

Validates the Prisma Schema Language of the Prisma schema file.

```shell
prisma validate
```

### format

Formats the Prisma schema file, which includes validating, formatting, and persisting the schema.

```shell
prisma format
```

### db pull

The db pull command connects to your database and adds Prisma models to your Prisma schema that
reflect the current database schema.

> Warning: The command will overwrite the current schema.prisma file with the new schema.

```shell
prisma db pull
```

### db push

The db push command pushes the state of your Prisma schema file to the database without using
migrations. It creates the database if the database does not exist.

This command is a good choice when you do not need to version schema changes, such as during
prototyping and local development.

```shell
prisma db push
```

### [db seed](https://www.prisma.io/docs/guides/migrate/seed-database)

Seeding allows you to consistently re-create the same data in your database and can be used to:

- Populate your database with data that is required for your application to start - for example,
  a default language or a default currency.
- Provide basic data for validating and using your application in a development environment. This
  is particularly useful if you are using Prisma Migrate, which sometimes requires resetting
  your development database.

```shell
prisma db seed
```

### db execute

This command applies a SQL script to the database without interacting with the Prisma
migrations table.

ake the content of a SQL file located at `./script.sql` and execute it on the database
specified by the URL in the datasource block of your `schema.prisma` file:

```shell
prisma db execute --file ./script.sql --schema schema.prisma
```

### migrate dev

For use in development environments only, requires shadow database

The `migrate dev` command:

1. Reruns the existing migration history in the shadow database in order to detect schema drift
   (edited or deleted migration file, or a manual changes to the database schema)
2. Applies pending migrations to the shadow database (for example, new migrations created by
   colleagues)
3. Generates a new migration from any changes you made to the Prisma schema before running
   migrate dev
4. Applies all unapplied migrations to the development database and updates the \_prisma_migrations
   table
5. Triggers the generation of artifacts (for example, Prisma Client)

```shell
prisma migrate dev
```

### migrate reset

1. Drops the database/schema if possible, or performs a soft reset if the environment does not
   allow deleting databases/schemas
2. Creates a new database/schema with the same name if the database/schema was dropped
3. Applies all migrations
4. Runs seed scripts

```shell
prisma migrate reset
```

### migrate deploy

The `migrate deploy` command applies all pending migrations, and creates the database if it
does not exist. Primarily used in non-development environments. This command:

- Does not look for drift in the database or changes in the Prisma schema
- Does not reset the database or generate artifacts
- Does not rely on a shadow database

```shell
prisma migrate deploy
```

### migrate resolve

The `migrate resolve` command allows you to solve migration history issues in production by
marking a failed migration as already applied (supports baselining) or rolled back.

Note that this command can only be used with a failed migration. If you try to use it with a
successful migration you will receive an error.

```shell
prisma migrate resolve --applied 20201231000000_add_users_table
prisma migrate resolve --rolled-back 20201231000000_add_users_table
```

### migrate status

The `prisma migrate status` command looks up the migrations in `./prisma/migrations/*` folder and
the entries in the `_prisma_migrations` table and compiles information about the state of the
migrations in your database.

```shell
prisma migrate status
```

### migrate diff

This command compares two database schema sources and outputs a description of a migration
taking the first to the state of the second.

The output can be given either as a human-readable summary (the default) or an executable script.

```shell
prisma migrate diff --from-... <source1> --to-... <source2>
```

### studio

The `studio` command allows you to interact with and manage your data interactively. It does this
by starting a local web server with a web app configured with your project's data schema and
records.

```shell
prisma studio
```

### package.json entry options

```json lines
// package.json
{
  "name": "my-project",
  "version": "1.0.0",
  "prisma": {
    "schema": "./custom-path-to-schema/schema.prisma",
    "seed": "node ./prisma/seed.js"
  }
}
```

###### schema

The path to the desired `schema.prisma` file can be specified with the `prisma.schema`
entry in the `package.json` file.

###### seed

The command used to populate the datasource is specified in the `prisma.seed` entry in the
`package.json` file. It is used when prisma db seed is invoked or triggered.
