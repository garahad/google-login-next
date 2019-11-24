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

  if (process.env.NODE_ENV === 'production') {
    server.use(morgan('dev'));
  } else {
    server.use(morgan('conbined'));
  }
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  google();

  server.get(
    '/auth/google', 
      passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login'],
      })
  );

  server.get(
    '/auth/google/callback', 
      passport.authenticate('google', { failureRedirect: '/' }),
      () => {console.log('hihi')}
  );

  server.get('/health', (req,res) => {
    res.status(200).send('hello world');
  })

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, () => {
    console.log('next+express running on port 3000');
  });
});
