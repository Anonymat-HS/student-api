import * as studentRepository from '../repositories/student.repository.js';
import type { Student, CreateStudentInput, UpdateStudentInput } from '../models/student.model.js';

export class NotFoundError extends Error {}
export class ConflictError extends Error {}

export async function createStudent(data: CreateStudentInput): Promise<Student> {
    const existing = await studentRepository.findStudentByEmail(data.email);
    if (existing) {
        throw new ConflictError(`Student with email ${data.email} already exists`);
    }
    return studentRepository.insertStudent(data);
}

export async function getAllStudents(): Promise<Student[]> {
    return studentRepository.findAllStudents();
}



export async function getStudentById(id: number): Promise<Student | undefined> {
    const student = await studentRepository.findStudentById(id);
    if (!student) {
        throw new NotFoundError(`Student with id ${id} not found`);
    }
    return student;
}

export async function updateStudent(id: number, data: UpdateStudentInput): Promise<Student> {
    const student = await studentRepository.updateStudentById(id, data);
    if (!student) {
        throw new NotFoundError(`Student with id ${id} not found`);
    }
    return student;
}


export async function deleteStudent(id: number): Promise<Student> {
    const student = await studentRepository.deleteStudentById(id);
    if (!student) {
        throw new NotFoundError(`Student with id ${id} not found`);
    }
    return student;
}