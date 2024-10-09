"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const teacherRoutes_js_1 = __importDefault(require("./routes/teacherRoutes.js"));
const adminRoutes_js_1 = __importDefault(require("./routes/adminRoutes.js"));
const db_js_1 = __importDefault(require("./config/db.js"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not defined in the environment variables');
    process.exit(1);
}
const app = (0, express_1.default)();
(0, db_js_1.default)();
app.use(express_1.default.json());
app.use('/teachers', teacherRoutes_js_1.default);
app.use('/users', userRoutes_js_1.default);
app.use('/admin', adminRoutes_js_1.default);
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
