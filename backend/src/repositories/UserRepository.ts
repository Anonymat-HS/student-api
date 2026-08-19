import pool from "../config/Db.js";
import type { User, CreateUserInput } from '../models/UserModel.js';

export async function insertUser(data: CreateUserInput): Promise<User> {
    const { username, password, role = 'user' } = data;
    const result = await pool.query<User>(
        `INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *`,
        [username, password, role]
    );
    return result.rows[0];
}

export async function findUserByUsername(username: string): Promise<User | undefined> {
    const result = await pool.query<User>(`SELECT * FROM users WHERE username = $1`, [username]);
    return result.rows[0];
}
