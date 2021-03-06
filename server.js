const express = require('express');
const next = require('next');
const morgan = require('morgan');
const dotenv = require('dotenv');
const passport = require('passport');

const google = require('./components/google');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();
dotenv.config();

app.prepare().then(() => {
  const server = express();

  server.use(passport.initialize());

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  google();

  server.get(
    '/auth/google', 
      passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login', 'email'],
      })
  );

  server.get(
    '/auth/google/callback', 
      passport.authenticate('google', { failureRedirect: '/health' }),
      function(req, res) {
        console.log(req.user);
        res.redirect('/privacy');
    }
  );

  server.get('/health', (req,res) => {
    res.status(200).send('health');
  })

  server.get('/privacy', (req,res) => {
    res.status(200).send('privacy');
  })

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, () => {
    console.log('next+express running on port 3000');
  });
});
