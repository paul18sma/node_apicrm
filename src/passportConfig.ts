import passport from 'passport';
import passportJwt from 'passport-jwt';
import passportLocal from 'passport-local';
import config from './config';
import User from './models/User';

const JwtStrategy = passportJwt.Strategy;
const LocalStrategy = passportLocal.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.JWT_SECRET
}, async (payload, done) => {
    try{
        // find the user specified in token
        const user = await User.findOne({
            where: { id: payload.sub }
        });

        // if user doesn't exists, handle it
        if(!user){
            return done(null, false, {message: 'Unauthorized.'});
        }
        
        // otherwise, return the user
        done(null, user);
    }catch(err){
        done(err, false);
    }
}));

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'    
}, async (email, password, done) => {
    try{
        // find the user given the email
        const user: User|null = await User.findOne({
            where: { email }
        });
        
        // if not, handle it
        if(!user){
            return done(null, false, {message: 'Invalid credentials.'});
        }
        
        // check if the password is correct
        const isMatch = await user.isValidPassword(password);
        
        // if not, handle it
        if(!isMatch){
            return done(null, false, {message: 'Invalid credentials.'});
        }
        // otherwise, return the user
        done(null, user);
    }catch(err){
        done(err, false);
    }
}));

export default passport;