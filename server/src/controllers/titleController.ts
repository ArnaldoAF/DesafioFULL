import {Request, Response} from 'express';
import db from '../database/connections';


export default class TitleController {
    async create(request: Request, response: Response) {
        console.log("---------------------------------------------------");
        console.log("TitleController - Create")
        const { number, name, cpf, interest, penalty } = request.body;

        const titleObj = {
            number, 
            name,
            cpf,
            interest,
            penalty
        }

        try {
            console.log("titleObj", titleObj);

            const insertedTitle = await db('titles').insert(titleObj);

            console.log("insertedTitle", insertedTitle);

            return response.status(201).json({
                "message": "´Título inserido com sucesso",
                "body": titleObj,
                "id": insertedTitle
                })
        } catch(err) {
            console.log(err);
            return response.status(400).json({
                "message": "Erro ao inserir Titulo",
                "body": err
            })
        }
    }
    

    async title(request: Request, response: Response) {
        console.log("---------------------------------------------------");
        console.log("TitleController - Title");

        var titleId = request.params;
        
        console.log("titleId", titleId);
        try {
            
        } catch(err) {
            console.log(err);
            return response.status(400).json({
                "message": "Erro ao buscar Título",
                "body": err
            })
        }
        
    }

    async index(request: Request, response: Response) {
        console.log("---------------------------------------------------");
        console.log("TitleController - Index");

        const titleList = await db('connections').select('*');

        return response.status(201).json(titleList);
        
    }
}