import Router from "express-promise-router";
import { signIn, signUp, profile } from "../controllers/auth.controller";
import { passportMiddlewareLocal, passportMiddlewareJwt } from "../passportConfig";
import { validateBody } from '../helpers/routeHelpers';
import { signInSchema } from '../routeValidations/auth';

const router = Router();

router.route('/sign-up').post(signUp);
router.route('/profile').get(passportMiddlewareJwt, profile);
router.route('/sign-in').post(validateBody(signInSchema), passportMiddlewareLocal, signIn);

export default router;