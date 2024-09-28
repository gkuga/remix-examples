// npm install zx glob @iarra/toml -D
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { globSync } from "glob";
import { parse } from "@iarna/toml";

const opts = parseArgs({
  options: {
    wrangler: {
      type: "string",
      short: 'w',
      default: "./wrangler.toml",
    },
    "database-name": {
      type: "string",
      short: 'n'
    },
    prisma: {
      type: "string",
      default: "./prisma/migrations",
    },
    production: {
      type: "boolean",
      short: 'p'
    },
  },
  allowPositionals: true,
});

const cwd = process.cwd();
const wrangler = loadWranglerConfig(opts.values.wrangler);
const envString = opts.values.production ? 'production' : 'development'
console.log(wrangler)
const database = wrangler.env[envString].d1_databases.find(
  (d1_database) => d1_database.database_name === opts.values["database-name"]) ?? wrangler.env[envString].d1_databases[0];
console.log(database)
if (!database) {
  console.error("No database found");
  process.exit(1);
} else {
  console.log("[d1 database detected]", database);
}

const prismaDir = opts.values.prisma ?? './prisma/migrations';
const migrationDir = database.migrations_dir ?? '.wrangler/migrations';
await $`rm -rf ${migrationDir} && mkdir -p ${migrationDir}`;

for (const prismaPath of globSync(`${prismaDir}/*/migration.sql`, { cwd })) {
  const migrationName = prismaPath.split("/")[2]; // prisma/migrations/<here>/migration.sql
  const migrationPath = `${migrationDir}/${migrationName}.sql`
  await $`cp ${prismaPath} ${migrationPath}`
}

if (opts.values.production) {
  await $`npx wrangler d1 migrations apply ${database.database_name} --remote`;
} else {
  await $`npx wrangler d1 migrations apply ${database.database_name} --local`;
}

/**
 * @param wranglerPath {string | undefined}
 * @return {{
 *  d1_databases: Array<{
 *   database_name: string,
 *   binding: string,
 *   database_id: string,
 *   migrations_dir?: string,
 * }>
 * }}
 */
function loadWranglerConfig(wranglerPath) {
  const wranglerTomlPath = path.join(cwd, wranglerPath);
  const raw = fs.readFileSync(wranglerTomlPath, "utf-8");
  return parse(raw);
}
