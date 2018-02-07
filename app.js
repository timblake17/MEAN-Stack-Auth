///bring in all dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database')

//connect to database
mongoose.connect(config.database);

///on connection
mongoose.connection.on('connected', () => {
  console.log('Conected to database' + config.database);
});

///on error
mongoose.connection.on('error', (err) => {
  console.log('DataBase Error:' +err);
});


const app = express();

const users = require('./routes/users')

const port= process.env.PORT;

///cors middleware
app.use(cors());

///set static folder
app.use(express.static(path.join(__dirname, 'public')));

///body parser middleware
app.use(bodyParser.json());

app.use('/users', users);

//Index Route
app.get('/', (req, res) => {
  res.send('Nope')
});

app.get('/',(req, res) => {
  res.send('Invalid Endpoint');
})

///passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
///start server
app.listen(port, () =>{
  console.log('server started on port '+port);
})
