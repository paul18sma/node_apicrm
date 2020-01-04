import Router from "express-promise-router";
import { signIn, signUp, profile } from "../controllers/auth.controller";
import passport from "../passportConfig";

const router = Router();

router.route('/sign-in').post(passport.authenticate('local', { session: false}), signIn);
router.route('/sign-up').post(signUp);
router.route('/profile').get(passport.authenticate('jwt', { session: false}), profile);


export default router;