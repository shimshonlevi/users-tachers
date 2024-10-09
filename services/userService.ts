import { Grades, User } from "../models/userModel.js";
import { findUserById } from "../DAL/data.js";

// פונקציית התחברות משתמש
export const userLogin = async (id: string): Promise<User | null> => {
    const user: User | null = await findUserById(id);  
    return user;
};

// שליפת ציוני משתמש
export const userGrades = async (id: string): Promise<Grades[] | null> => {
    const user: User | null = await findUserById(id);
    if (!user || !user.grades || user.grades.length === 0) {
        return null;
    }
    return user.grades;
};

// חישוב ממוצע ציוני משתמש
export const userGradesAverage = async (id: string): Promise<number | null> => {
    const grades: Grades[] | null = await userGrades(id);
    
    // בדיקה אם אין ציונים
    if (!grades || grades.length === 0) {
        return null;
    }

    // חישוב ממוצע הציונים
    const gradesAverage: number = grades.reduce((sum, grade) => sum + grade.grade, 0) / grades.length;
    return gradesAverage;
};
