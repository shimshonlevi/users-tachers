"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gradeAverage = exports.grades = exports.login = void 0;
const userService_js_1 = require("../services/userService.js");
// פונקציית כניסה
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.params.id;
        // בדיקה שהמזהה תקין (תלוי בדרישות שלך)
        if (!studentId) {
            res.status(400).json({ error: "Missing student ID" });
            return;
        }
        const user = yield (0, userService_js_1.userLogin)(studentId);
        if (!user) {
            res.status(404).json({ error: "User not found." });
            return;
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Internal server error while logging in." });
    }
});
exports.login = login;
// פונקציית שליפת ציונים
const grades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.params.id;
        if (!studentId) {
            res.status(400).json({ error: "Missing student ID" });
            return;
        }
        const usersGrades = yield (0, userService_js_1.userGrades)(studentId);
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
});
exports.grades = grades;
// פונקציית חישוב ממוצע ציונים
const gradeAverage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.params.id;
        if (!studentId) {
            res.status(400).json({ error: "Missing student ID" });
            return;
        }
        const usersGradesAverage = yield (0, userService_js_1.userGradesAverage)(studentId);
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
});
exports.gradeAverage = gradeAverage;
