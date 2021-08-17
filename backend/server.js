const path = require('path');
require('dotenv').config({ path: 'variables.env' });
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const missionRoutes = require('./routes/missionRoutes')
const bodyParser = require('body-parser');
const Mongoose = require('mongoose');
require('./passport/setup');
const app = express();
const PORT = 5000;
const MONGO_URI = process.env.MONGO_URI

Mongoose
  .connect(MONGO_URI, {useNewUrlParser: true})
  .then(console.log(`MongoDB connected ${MONGO_URI}`))
  .catch(err => console.log(err));

  app.use(cors({
    origin: process.env.FRONTEND,
    credentials: true
  }));
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
// Express Session
app.use(
  session({
    secret: 'very secret this is',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: MONGO_URI})
  })
)

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Static files
app.use('/public', express.static(path.join(__dirname, 'public')));


//Routes
app.use('/api/auth', authRoutes)
app.use('/api/missions', missionRoutes)
app.listen(5000); // start Node + Express server on port 5000
