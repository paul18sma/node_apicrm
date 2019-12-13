import { Pool } from "pg";

export const pool = new Pool({
    user: 'node_user',
    host: 'localhost',
    password: 'node.uaa_1',
    database: 'node_api_auth_db'
})

