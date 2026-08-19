import type { RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '../services/AuthService.js';

interface JwtPayload {
    id: number;
    username: string;
    role: string;
}

export interface AuthenticatedRequest extends Express.Request {
    user?: JwtPayload;
}

export const authenticate: RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Token manquant. Ajoutez "Authorization: Bearer <token>"' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, getJwtSecret()) as JwtPayload;
        (req as AuthenticatedRequest).user = payload;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token invalide ou expiré' });
    }
};
