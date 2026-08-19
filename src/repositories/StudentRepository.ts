import pool from "../config/Db.js";
import type { Student, CreateStudentInput, UpdateStudentInput } from '../models/StudentModel.js';

export async function insertStudent(data: CreateStudentInput): Promise<Student>{
    const { first_name , last_name , email , age } = data;
    const result = await pool.query<Student> (
        `INSERT INTO students (first_name, last_name, email , age) VALUES ($1, $2, $3, $4) RETURNING*`,
        [first_name, last_name , email , age] 
    );
    return result.rows[0];
}

export async function findAllStudents(): Promise<Student[]> {
    const result = await pool.query<Student>(`SELECT * FROM students ORDER BY id ASC`);
    return result.rows;
}

export async function findStudentById(id: number): Promise<Student | undefined> {
    const result = await pool.query<Student>(`SELECT * FROM students WHERE id =$1` , [id]);
    return result.rows[0];
} 

export async function findStudentByEmail(email: string): Promise<Student | undefined> {
    const result = await pool.query<Student>(`SELECT * FROM students WHERE email = $1`, [email]);
    return result.rows[0];
}


export async function updateStudentById(
    id: number,
    data: UpdateStudentInput
): Promise<Student | undefined> {
    const {first_name , last_name , email , age } = data;
    const result = await pool.query<Student>(
        `UPDATE students SET first_name = $1, last_name = $2 , email = $3 , age = $4 WHERE id = $5 RETURNING *` , [first_name, last_name , email , age , id ]
    );
    return result.rows[0];
}

export async function deleteStudentById(id: number): Promise<Student | undefined> {
    const result = await pool.query<Student>(`DELETE FROM students WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0];
}
