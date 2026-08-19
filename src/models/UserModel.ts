export interface User {
    id: number;
    username: string;
    password: string;
    role: string;
    created_at: Date;
}

export interface CreateUserInput {
    username: string;
    password: string;
    role?: string;
}
