import { Document } from 'mongoose';

export enum UserRole {
    Admin = 'admin',
    User = 'user',
    Teacher = 'teacher',
}

export interface User extends Document {
    fullName: string;
    passportId: string; // מספר דרכון כ- string
    password: string;
    grades?: Grades[]; // שדה אופציונלי אם אין עדיין ציונים
    role: UserRole;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Grades {
    subject: string;
    grade: number; // ציונים בין 0 ל-100
}
