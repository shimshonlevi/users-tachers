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
exports.userGradesAverage = exports.userGrades = exports.userLogin = void 0;
const data_js_1 = require("../DAL/data.js");
// פונקציית התחברות משתמש
const userLogin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, data_js_1.findUserById)(id);
    return user;
});
exports.userLogin = userLogin;
// שליפת ציוני משתמש
const userGrades = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, data_js_1.findUserById)(id);
    if (!user || !user.grades || user.grades.length === 0) {
        return null;
    }
    return user.grades;
});
exports.userGrades = userGrades;
// חישוב ממוצע ציוני משתמש
const userGradesAverage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const grades = yield (0, exports.userGrades)(id);
    // בדיקה אם אין ציונים
    if (!grades || grades.length === 0) {
        return null;
    }
    // חישוב ממוצע הציונים
    const gradesAverage = grades.reduce((sum, grade) => sum + grade.grade, 0) / grades.length;
    return gradesAverage;
});
exports.userGradesAverage = userGradesAverage;
