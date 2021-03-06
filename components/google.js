module.exports = () => {
  var passport = require('passport');
  const axios = require('axios');
  var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  // Use the GoogleStrategy within Passport.
  //   Strategies in Passport require a `verify` function, which accept
  //   credentials (in this case, an accessToken, refreshToken, and Google
  //   profile), and invoke a callback with a user object.
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:
          process.env.NODE_ENV === 'production'
            ? 'https://www.mygraphr.com/auth/google/callback'
            : 'http://localhost:3000/auth/google/callback',
      },
      async function(accessToken, refreshToken, profile, done) {
        // console.log('accessToken', accessToken);
        // console.log('refreshToken', refreshToken);
        // console.log('profile', profile);
        done (null, {email: profile.emails[0].value, nickname: profile.displayName, provider: 'google', snsId: profile.id})

        // try {
        //   const data = await axios.get('https://api.mygraphr.com/hello');
          
        //   // console.log('i"m data', data.data.data)
        //   if (data) {
        //     // console.log('data', data);
        //     return done(null, { googleId: profile.id, nickname: data });
        //   } else {
        //     console.log('there is no user... signup will start')
        //   }
        // } catch(e) {
        //   console.log("i'm error====================");
        //   console.log(e);
        // }

        

        // return done(null, {googleId: profile.id, name: 'yonggyu'})

        // User.findOrCreate({ googleId: profile.id }, function(err, user) {
        //   return done(err, user);
        // });
      },
    ),
  );
};
