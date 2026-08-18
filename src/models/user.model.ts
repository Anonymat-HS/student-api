export interface User {
    id: number;
    username: string;
    password: string;
    created_at: Date;
}

export interface CreateUserInput {
    username: string;
    password: string;
}
