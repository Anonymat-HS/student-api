import pool from '../config/db.js';

export async function createStudent({first_name , last_name , email , age }){
    const result = await pool.query(`INSERT INTO students (first_name , last_name , email , age) VALUES ($1 , $2 , $3 , $4) RETURNING *;`, [first_name , last_name , email , age]);
    return result.rows[0];
}

export async function getAllStudents(){
    const result = await pool.query(`SELECT * FROM students ORDER BY id ASC;`);
    return result.rows;
}

export async function getStudentById(id){
    const result = await pool.query(`SELECT * FROM students WHERE id = $1 ORDER BY id ASC;`, [id]);
    return result.rows[0];
}

export async function updateStudent(id , {first_name , last_name , email , age}){
    const result = await pool.query(`UPDATE students SET first_name = $1 , last_name = $2 , email = $3 , age = $4 WHERE id = $5 RETURNING *;`, [first_name , last_name , email , age , id]);
    return result.rows[0];
}

export async function deleteStudent(id){
    const result = await pool.query(`DELETE FROM students WHERE id = $1 RETURNING *;`, [id]);
    return result.rows[0];
}