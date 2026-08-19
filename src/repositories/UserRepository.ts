import pool from "../config/Db.js";
import type { User, CreateUserInput } from '../models/UserModel.js';

export async function insertUser(data: CreateUserInput): Promise<User> {
    const { username, password } = data;
    const result = await pool.query<User>(
        `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
        [username, password]
    );
    return result.rows[0];
}

export async function findUserByUsername(username: string): Promise<User | undefined> {
    const result = await pool.query<User>(`SELECT * FROM users WHERE username = $1`, [username]);
    return result.rows[0];
}
