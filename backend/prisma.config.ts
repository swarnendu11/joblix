import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // @ts-ignore - process is globally available in Node.js but might not be visible here without full TS setup for root files
    url: process.env["DATABASE_URL"],
  },
});
