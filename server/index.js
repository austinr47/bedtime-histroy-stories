const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const controller = require('./controller.js');
const session = require('express-session');
const bcrypt =  require('bcrypt');
const mailCtrl = require('./mailCtrl')

// using for bcrypt
const saltRounds = 12

require('dotenv').config();

const app = express();

app.use(express.static(__dirname + '/static'));

app.use(bodyParser.json());

// connection to heroku db
massive(process.env.DATABASE_URL).then(db => {
  app.set('db', db)
}).catch(error => {
  console.log('error', error);
});

// setting session with a timeout age
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 600000 },
}));

app.get('/episodes', controller.getEpisodes);
app.get('/episode/:id', controller.getOneEpisode);
app.get('/featured', controller.getFeatured);
app.patch('/set-featured', controller.setFeatured);
app.post('/add-episode', controller.addEpisodes);
app.patch('/edit-episode', controller.editEpisode);
app.delete('/delete-episode/:id', controller.deleteEpisode);
app.post( '/signout', controller.signout );

app.post('/api/send', mailCtrl.mail)

// login
app.post('/login', (req, res) => {
  const db = app.get('db');
  const { username, password } = req.body;
  db.login([username]).then(users => {
    if (users.length) {
      bcrypt.compare(password, users[0].password).then(passwordsMatch => {
        if (passwordsMatch) {
          req.session.user = { username: users[0].username };
          // req.session.maxAge = new Date()
          res.json({ user: req.session.user });
        } else {
          res.status(403).json({ message: 'Wrong password' })
        }
      })
    } else {
      res.status(403).json({ message: "That user is not registered" })
    }
  })
});

// registering -- this is not being used in the site since there shouldnt be any more registered users
app.post('/register', (req, res) => {
  const db = app.get('db');
  const { username, password } = req.body;
  bcrypt.hash(password, saltRounds).then(hashPassword => {
    db.create_user([username, hashPassword]).then(() => {
      req.session.user = { username: username };
      res.json({ user: req.session.user})
    }).catch(error => {
      res.status(500).json({ message: 'Something bad happened! '})
    })
  })
});

// using to keep a persistant login
app.get('/user-data', (req, res) => {
  res.json({ user: req.session.user })
});

const PORT = process.env.SERVER_PORT || 3036;
app.listen(PORT, () => {
    console.log(`Am I on?? Yup, on ${PORT}. `); 
} );

