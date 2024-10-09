// errorHandler.ts
import { constants } from '../contsants.js'; // ודא שהנתיב נכון

const errorHandler = (err: any, req: any, res: any, next: any) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.status(constants.VALIDATION_ERROR).json({
                title: "Validation Failed",
                message: err.message,
                stack: err.stack,
            });
            break;

        case constants.NOT_FOUND:
            res.status(constants.NOT_FOUND).json({
                title: "Not Found",
                message: err.message,
                stack: err.stack,
            });
            break;

        case constants.UNAUTHORIZED:
            res.status(constants.UNAUTHORIZED).json({
                title: "Unauthorized",
                message: err.message,
                stack: err.stack,
            });
            break;

        case constants.FORBIDDEN:
            res.status(constants.FORBIDDEN).json({
                title: "Forbidden",
                message: err.message,
                stack: err.stack,
            });
            break;

        case constants.SERVER_ERROR:
            res.status(constants.SERVER_ERROR).json({
                title: "Server Error",
                message: err.message,
                stack: err.stack,
            });
            break;

        default:
            console.error("Unexpected error:", err);
            res.status(500).json({
                title: "Unknown Error",
                message: "An unknown error occurred.",
                stack: err.stack,
            });
            break;
    }
};

export default errorHandler; // הוספת ייצוא ברירת המחדל של errorHandler
