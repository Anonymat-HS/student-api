import type { RequestHandler, Response } from 'express';
import { register as registerUser, login as loginUser, ConflictError, UnauthorizedError } from '../services/auth.service.js';

export const register: RequestHandler = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ error: 'username et password sont requis' });
            return;
        }

        await registerUser(username, password);
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (err) {
        handleError(err, res, 'Erreur serveur lors de l\'inscription');
    }
};

export const login: RequestHandler = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ error: 'username et password sont requis' });
            return;
        }

        const token = await loginUser(username, password);
        res.status(200).json({ token });
    } catch (err) {
        handleError(err, res, 'Erreur serveur lors de la connexion');
    }
};

function handleError(err: unknown, res: Response, fallbackMessage: string): void {
    if (err instanceof ConflictError) {
        res.status(409).json({ error: err.message });
        return;
    }

    if (err instanceof UnauthorizedError) {
        res.status(401).json({ error: err.message });
        return;
    }

    console.error(err);
    res.status(500).json({ error: fallbackMessage });
}
