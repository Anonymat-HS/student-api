import type { RequestHandler, Response } from 'express';
import * as studentService from '../services/StudentService.js';
import { NotFoundError, ConflictError } from '../services/StudentService.js';

export const create: RequestHandler = async (req, res) => {
  try {
    const { first_name, last_name, email, age } = req.body;

    if (!first_name || !last_name || !email) {
      res.status(400).json({ error: 'first_name, last_name et email sont requis' });
      return;
    }

    const student = await studentService.createStudent({ first_name, last_name, email, age });
    res.status(201).json(student);
  } catch (err) {
    handleError(err, res, 'Erreur serveur lors de la création');
  }
};

export const getAll: RequestHandler = async (req, res) => {
  try {
    const students = await studentService.getAllStudents();
    res.status(200).json(students);
  } catch (err) {
    handleError(err, res, 'Erreur serveur lors de la récupération');
  }
};

export const getOne: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const student = await studentService.getStudentById(id);
    res.status(200).json(student);
  } catch (err) {
    handleError(err, res, 'Erreur serveur');
  }
};

export const update: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { first_name, last_name, email, age } = req.body;

    const student = await studentService.updateStudent(id, { first_name, last_name, email, age });
    res.status(200).json(student);
  } catch (err) {
    handleError(err, res, 'Erreur serveur lors de la mise à jour');
  }
};

export const remove: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const student = await studentService.deleteStudent(id);
    res.status(200).json({ message: 'Étudiant supprimé', student });
  } catch (err) {
    handleError(err, res, 'Erreur serveur lors de la suppression');
  }
};

function handleError(err: unknown, res: Response, fallbackMessage: string): void {
  if (err instanceof NotFoundError) {
    res.status(404).json({ error: err.message });
    return;
  }

  if (err instanceof ConflictError) {
    res.status(409).json({ error: err.message });
    return;
  }

  console.error(err);
  res.status(500).json({ error: fallbackMessage });
}