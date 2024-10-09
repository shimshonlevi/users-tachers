import express, { Router } from 'express';
import { login, grades, gradeAverage } from '../controllers/userController.js';


const router: Router = express.Router();

router.route('/login/:id').post(login);
router.route('/grades/:id').get(grades);
router.route('/gradesAverage/:id').get(gradeAverage);


export default router;