import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/user.repository.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const TOKEN_EXPIRATION = '1h';

export class ConflictError extends Error {}
export class UnauthorizedError extends Error {}

export async function register(username: string, password: string): Promise<void> {
    const existing = await userRepository.findUserByUsername(username);
    if (existing) {
        throw new ConflictError(`Username ${username} already exists`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userRepository.insertUser({ username, password: hashedPassword });
}

export async function login(username: string, password: string): Promise<string> {
    const user = await userRepository.findUserByUsername(username);
    if (!user) {
        throw new UnauthorizedError('Invalid username or password');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
        throw new UnauthorizedError('Invalid username or password');
    }

    return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
        expiresIn: TOKEN_EXPIRATION,
    });
}

export function getJwtSecret(): string {
    return JWT_SECRET;
}
