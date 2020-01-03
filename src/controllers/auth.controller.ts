import { Request, Response } from "express";
import { ValidationError, ValidationErrorItem, BaseError } from 'sequelize';

import * as JWT from 'jsonwebtoken';

import User from '../models/User';
import config from '../config';


export const signIn = async (req: Request, res: Response): Promise<Response> => {
    console.log('sign in');
    return res.send('sign in');        
}

export const signUp = async (req: Request, res: Response): Promise<Response> => {
    // find user exists
    try{
        // try save the user,
        // On User model, into sequelize def, we handle validations and it errors message.
        const { name, email, password } = req.body;
        const newUser = await User.create({ name, email, password });
        const token = signInToken(newUser);
        return res.status(200).json({
            msg: 'User created successfully!',
            token
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
            console.log(errors);
            return res.status(400).json(errors);
        } 

        return res.status(500).json('Internal server error');
    }
}

export const profile = async (req: Request, res:Response): Promise<Response> => {
    return res.send('profile');
}

const signInToken = (user: User) => {
    return JWT.sign({
        iss: "naapi",
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, config.JWT_SECRET);
}