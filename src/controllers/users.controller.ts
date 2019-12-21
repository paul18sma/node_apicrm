import { Request, Response } from "express";
import User from '../models/User';
import { ValidationError, ValidationErrorItem, BaseError } from 'sequelize';


export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try{
        const users = await User.findAll();
        return res.status(200).json(users);
    }catch(e){
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    try{
        const { id } = req.params;
        const user = await User.findOne({
            where: { id }
        });
        if(user){
            return res.status(200).json(user);
        }else{
            return res.status(400).json({
                msg: 'User not found'
            });
        }
    }catch(e){
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try{
        // try save the user
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

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try{
        const { id } = req.params;
        const { name, email, password } = req.body;
        
        // find the user
        const user = await User.findOne({
            where: { id }
        });
        
        // user found, update it, or throw errors
        if(user){
            await user.update({
                name,
                email,
                password
            });

            return res.status(200).json({
                message: 'User updated successfully!',
                user
            });
        }else{            
            return res.status(400).json('User not found');           
        }
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

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try{
        const { id } = req.params;
        const deleteRowCount = await User.destroy({
            where: { id }
        });
        return res.status(200).json({
            message: 'User deleted successfully',
            count: deleteRowCount
        });
    }catch(e){
        console.log(e);
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}