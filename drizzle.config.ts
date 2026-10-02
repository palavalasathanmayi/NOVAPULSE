import { defineConfig } from "drizzle-kit";

// `drizzle-kit generate` only diffs the schema and needs no connection, so
// credentials are optional here. Commands that talk to the database
// (migrate, push) still require DATABASE_URL to be set.
const connectionString = process.env.DATABASE_URL;

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  ...(connectionString ? { dbCredentials: { url: connectionString } } : {}),
});
