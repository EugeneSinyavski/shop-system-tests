// TODO: Refactor this entire DTO package to use Zod instead of manual interfaces and classes.

export interface IUserLoginDto {
    email: string;
    password: string;
}

export interface ICreateUserDto {
    firstname: string;
    lastname: string;
    phoneNumber: string;
    email: string;
    username: string;
    password: string;
    role: 'USER' | 'ADMIN'; // TODO: Import from enums.ts
}

export interface IUser {
    id: number;
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    role: 'USER' | 'ADMIN'; // TODO: Import from enums.ts
    createdAt: string;
    updatedAt: string;
}

export interface IUpdateUserDto {
    firstname?: string;
    lastname?: string;
    phoneNumber?: string;
    email?: string;
    username?: string;
}
