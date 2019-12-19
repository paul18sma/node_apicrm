import { Request, Response } from "express";
import User from '../models/User';


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
        return res.status(200).json(user);
    }catch(e){
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try{
        const { name, email, password } = req.body;
        const newUser = await User.create({ name, email, password });
        return res.status(200).json({
            user: newUser
        });
    }catch(e){
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try{
        const { id } = req.params;
        const { name, email, password } = req.body;
        const user = await User.findOne({
            where: { id }
        });

        await user?.update({
            name,
            email,
            password
        });

        return res.status(200).json({
            message: 'User updated successfully!',
            user
        });
    }catch(e){
        console.log(e);
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try{
        const { id } = req.params;
        const deleteRowCount = await User.destroy({
            where: { id }
        })
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