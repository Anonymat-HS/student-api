import { createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent } from '../models/student.model.js';

export async function create(req, res) { 
    try {
        const { first_name, last_name, email, age } = req.body;
        if (!first_name || !last_name || !email || !age) {
            return res.status(400).json({ message: 'First name, last name, email and age are required' });
        }
        const student = await createStudent({ first_name, last_name, email, age });
        return res.status(201).json(student);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while creating the student' });
    }
}

export async function getAll(req, res) {
    try {
        const students = await getAllStudents();
        return res.status(200).json(students);
    }catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while retrieving all students' });
    }
}

export async function getOne(req, res) {
    try {
        const { id } = req.params;
        const student = await getStudentById(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        return res.status(200).json(student);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while retrieving the student' });
    }
}

export async function update(req, res) {
    try {
        const { id } = req.params;
        const { first_name, last_name, email, age } = req.body;
        const student = await updateStudent(id, { first_name, last_name, email, age });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        return res.status(200).json(student);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while updating the student' });
    }
}

export async function remove(req, res) {
    try {
        const { id } = req.params;
        const student = await deleteStudent(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        return res.status(200).json(student);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while deleting the student' });
    }
}