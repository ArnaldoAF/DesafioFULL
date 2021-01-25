import express, { Router } from 'express';

import TitleController from './controllers/titleController';

const routes = express.Router();

const titleController = new TitleController();

routes.get('/test', (request, response) => {
    console.log('Acessou a rota');

    return response.json({"response": "ok"});
});

routes.post('/title', titleController.create);
routes.get('/title/:id', titleController.title);
routes.get('/titles', titleController.index);


export default routes;