import {Request, Response} from 'express';
import db from '../database/connections';

function daysBetween(data: string) {
    var dateParts = data.split("/");
    var date1 = new Date(
        +dateParts[2], 
        +dateParts[1] - 1, 
        +dateParts[0]).getTime(); 

    var date2 = new Date().getTime();

    var days = Math.floor(Math.abs(date2 - date1)/(1000*60*60*24));

    return date2 - date1 > 0 ? days : 0;

}

async function formatTitle(title: any) {
    console.log("-------------------------------------");
    console.log("formatTitle");
    const parcels = await db('parcels').where('title_id','=',title.id).select('*');

    const delayed_days  = (parcels && parcels.length!=0) ?  daysBetween(parcels[0].due_date) : 0;
    
    let total = 0;

    if(parcels && parcels.length!=0) {
        const originalValue = parcels.reduce((total:number, parcel:any) => 
            total+ parcel.value
        ,0);

        const penalty = originalValue * (title.penalty/100);

        const interest = parcels.reduce((total:number, parcel:any) => {
            let currentValue = ((title.interest/100)/30) * parcel.value * daysBetween(parcel.due_date);
            console.log("currentValue",currentValue);
            return total + currentValue;
        }
        ,0);

        console.log("originalValue",originalValue);
        console.log("penalty",penalty);
        console.log("interest",interest);

        total = (delayed_days == 0 ) ? originalValue : originalValue + penalty + interest;
    }

    const titleFinal = {
        ...title,
        delayed_days,
        total, 
        parcels
    }
    console.log("title",titleFinal);

    return titleFinal;
}

export default class TitleController {
    async create(request: Request, response: Response) {
        console.log("---------------------------------------------------");
        console.log("TitleController - Create");
        const { number, name, cpf, interest, penalty, parcels } = request.body;
        console.log(request.body);

        const titleObj = {
            number, 
            name,
            cpf,
            interest,
            penalty
        }

        
        const trx = await db.transaction();
        
        try {
            console.log("titleObj", titleObj);

            const insertedTitle = await trx('titles').insert(titleObj);
            const title_id = insertedTitle[0];

            console.log("title_id", title_id);
            const parcelsList = parcels.map((x:any)=> {
                return {
                    title_id,
                    ...x
                }
            })

            console.log("parcelsList",parcelsList);


            await trx('parcels').insert(parcelsList);

            await trx.commit();

            return response.status(201).json({
                "message": "´Título inserido com sucesso",
                "body": {titleObj, parcels: parcelsList},
                "id": title_id
                })
        } catch(err) {
            console.log(err);
            await trx.rollback();
            return response.status(400).json({
                "message": "Erro ao inserir Titulo",
                "body": err
            })
        } 
    }
    

    async title(request: Request, response: Response) {
        console.log("---------------------------------------------------");
        console.log("TitleController - Title");

        var {id} = request.params;
        
        console.log("id", id);

        try {
            const [selectedTitle] = await db('titles').where('id','=',id).select('*');
            
            console.log("selectedTitle",selectedTitle);
            
            
            if(!selectedTitle) return response.status(400).json({message: "Title not fouded"});

            

            const title = await formatTitle(selectedTitle);
            console.log("title",title);

            return response.status(200).json(title);
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
        try {
            const titleList = await db('titles').select('*');

            const titleFormatedList = [];
            
            for(let i=0;i<titleList.length;i++){
                const title = await formatTitle(titleList[i]);
                console.log("title",title);
                titleFormatedList.push(title);
            }
            console.log("titleFormatedList",titleFormatedList);

            return response.status(201).json(titleFormatedList);
        } catch(err) {
            console.log(err);
            return response.status(400).json({
                "message": "Erro ao buscar Título",
                "body": err
            })
        }
        
    }
}