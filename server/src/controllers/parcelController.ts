import {Request, Response} from 'express';
import db from '../database/connections';


export default class ParcelController {
    async index(request: Request, response: Response) {
        console.log("---------------------------------------------------");
        console.log("ParcelController - Index");

        const titleList = await db('parcels').select('*');

        return response.status(201).json(titleList);
        
    }

    async create(request: Request, response: Response) {
        console.log("---------------------------------------------------");
        console.log("ParcelController - Create")
        
    }
    

}