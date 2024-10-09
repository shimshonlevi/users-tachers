import { Request, Response, NextFunction } from 'express';
import { userLogin, userGrades, userGradesAverage } from "../services/userService.js";
import { Grades, User } from '../models/userModel.js';

// פונקציית כניסה
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
      const studentId: string = req.params.id;

      // בדיקה שהמזהה תקין (תלוי בדרישות שלך)
      if (!studentId) {
        res.status(400).json({ error: "Missing student ID" });
        return;
      }

      const user = await userLogin(studentId);
      if (!user) {
          res.status(404).json({ error: "User not found." });
          return;
      }

      res.status(200).json({ user });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error while logging in." });
  }
};


export const grades = async (req: Request, res: Response): Promise<void> => {
  try {
      const studentId: string = req.params.id;

      if (!studentId) {
        res.status(400).json({ error: "Missing student ID" });
        return;
      }

      const usersGrades: Grades[] | null = await userGrades(studentId);

      // בדיקה אם אין ציונים
      if (!usersGrades || usersGrades.length === 0) {
          res.status(404).json({ error: "No grades found for this user." });
          return;
      }

      res.status(200).json({ usersGrades });
  }
  catch (error) {
      console.error("Error retrieving grades for user:", error);
      res.status(500).json({ error: "Internal server error while retrieving grades." });
  }   
};

// פונקציית חישוב ממוצע ציונים
export const gradeAverage = async (req: Request, res: Response): Promise<void> => {
  try {
      const studentId: string = req.params.id;

      if (!studentId) {
        res.status(400).json({ error: "Missing student ID" });
        return;
      }

      const usersGradesAverage: number | null = await userGradesAverage(studentId);

      // בדיקה אם אין ממוצע
      if (usersGradesAverage === null) {
          res.status(404).json({ error: "No grades found for this user to calculate average." });
          return;
      }

      res.status(200).json({ usersGradesAverage });
  }
  catch (error) {
      console.error("Error calculating grades average for user:", error);
      res.status(500).json({ error: "Internal server error while calculating grades average." });
  }   
};
