const GoogleStrategy = require("passport-google-oauth2");

/**
 * Send a passport authentication from google and verify the google user
 * @param {*} passport 
 */
// module.exports = (passport) => {
//     passport.use(new GoogleStrategy({
//         clientId: process.env.GOOGLE_ID,
//         clientSecret: process.env.GOOGLE_SECRET,
//         callbackURL: process.env.BASE_URL + '/auth/google/callback',
//         passReqToCallback: true
//     },
//     async (request, accessToken, refreshToken, profile, done) => {
//         try {
//             //let existingUser = await User.findOne({ 'google.id': profile.id });
//             //if (existingUser) {
//             //     return done(null, existingUser);
//             // }
//             // if user does not exist create a new user 
//             // console.log('Creating new user...');
//             // const newUser = new User({
//             //     method: 'google',
//             //     google: {
//             //         id: profile.id,
//             //         name: profile.displayName,
//             //         email: profile.emails[0].value
//             //     }
//             // });
//             // await newUser.save();
//             // return done(null, newUser);
//         } catch (ex) {
//             return done(error, false);
//         }
//     }));
// }