import passport from 'passport';
import passportJwt from 'passport-jwt';
import config from './config';
import User from './models/User';

const JwtStrategy = passportJwt.Strategy;
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
            return done(null, false);
        }
        
        // otherwise, return the user
        done(null, user);
    }catch(err){
        done(err, false);
    }
}));

export default passport;