export interface Student{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    age: number | null;
    created_at: Date;
}

export interface CreateStudentInput{
    first_name: string;
    last_name: string;
    email: string;
    age?: number ;
}

export interface UpdateStudentInput{
    first_name: string;
    last_name: string;
    email: string;
    age?: number ;
}