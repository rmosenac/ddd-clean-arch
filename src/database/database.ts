import { Pool } from "pg";

export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "dca",
    password: "BemVindo!",
    port: 5432,
});
