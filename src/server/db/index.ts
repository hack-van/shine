import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import { env } from "@/env.mjs";
import * as data from "./schema/data";
import * as users from "./schema/users";


neonConfig.fetchConnectionCache = true;

const sql = neon(env.DATABASE_URL);

export const db = drizzle(sql, {
  schema: {
    ...data,
    ...users,
  }
});
