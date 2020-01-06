import { Request, Response, NextFunction } from 'express';
import Joi from '@hapi/joi';
import { BaseError } from 'sequelize/types';


export const validateBody = (schema: Joi.ObjectSchema<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try{            
            const {error, value} = schema.validate(req.body);
            if(error){
                let errors: Array<BaseError> = [];
                error.details.forEach( (err)=> {
                    errors.push({name: <string> err.path[0], message: err.message });
                });
                return res.status(400).json({errors});
            }
            next();
        }catch(err){
            console.log(err, err.error);
            return res.status(500).json({msg: 'Internal server error'});
        }
    }
}