const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/index.js');
const { WHITELIST } = process.env;
require('./db.js');
//cambio para aprobar bloqueo de main
const server = express();
//hola aca estoy
// segunda vuelta
server.name = 'API';

server.use(cors());
const corsOptions = {
  origin: function (origin, callback){
    if(WHITELIST.indexOf(origin) !== -1){
      callback(null, true);
    } else {
      callback(new Error('Not alllowed by CORS'))
    }
  }
}
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'iberahotelsfront-production.up.railway.app'); // update to match the domain you will make the request from
  //res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', cors(corsOptions), routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});
// test of branch of developer
// test of branch of developer doublecheck

module.exports = server;
