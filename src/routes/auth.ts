import {Request, Response, NextFunction} from 'express';
import Router from "express-promise-router";
import { signIn, signUp, profile } from "../controllers/auth.controller";
import passport from "../passportConfig";
import { validateBody } from '../helpers/routeHelpers';
import { signInSchema } from '../routeValidations/auth';

const router = Router();


const passportLocal = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err) { return next(err) }
        
        if (!user) {
        // *** Display message using Express 3 locals
        console.log(info);
        return res.status(400).json(info);
        }
        req.user = user;
        next();
    })(req, res, next);
};

const passportJwt = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) { return next(err) }
        
        if (!user) {
        // *** Display message using Express 3 locals
        console.log(info);
        return res.status(400).json(info);
        }
        req.user = user;
        next();
    })(req, res, next);
}

// router.route('/sign-in').post(validateBody(signInSchema), passport.authenticate('local', { session: false}), signIn);
router.route('/sign-up').post(signUp);
router.route('/profile').get(passportJwt, profile);
router.route('/sign-in').post(validateBody(signInSchema), passportLocal, signIn);




export default router;