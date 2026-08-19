import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
}); 

pool.on('connect', () => {
    console.log(' ✅ Connected to the database');
});

pool.on('error', (err) => {
    console.error(' ❌ Unexpected error on idle client', err);
    process.exit(-1);
});

export default pool;