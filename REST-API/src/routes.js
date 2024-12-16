import { Router } from 'express';
import userController from './controllers/userController.js';
import courseController from './controllers/courseController.js';

const routes = Router();

routes.use(userController);
routes.use(courseController);

routes.get('/', (req, res) => {
    res.send('It works!');
})

export default routes;