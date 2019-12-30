import { Request, Response } from "express";
import { ValidationError, ValidationErrorItem, BaseError } from 'sequelize';

import User from '../models/User';


export const signIn = async (req: Request, res: Response): Promise<Response> => {
    console.log('signIn');
    return res.send('sign in');
}

export const signUp = async (req: Request, res: Response): Promise<Response> => {
    // find user exists
    try{
        // try save the user,
        // On User model, into sequelize def, we handle validations and it errors message.
        const { name, email, password } = req.body;
        const newUser = await User.create({ name, email, password });
       
        return res.status(200).json({
            msg: 'User created successfully!',
            user: newUser
        });
    }catch(err){
        // catch any error
        // Handle errors type of ValidationError
        if( err instanceof ValidationError){
            let errors: Array<BaseError> = [];
            err.errors.forEach( (e)  => {
                if( e instanceof ValidationErrorItem){
                    errors.push({name: e.path, message: e.message});
                }
            });
            // return errors with code 400
            console.log(errors);
            return res.status(400).json(errors);
        } 

        return res.status(500).json('Internal server error');
    }
}
