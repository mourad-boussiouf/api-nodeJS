//initialisation modules et variables
const mysql = require('mysql2'); 
const express = require('express');
const cookieSession = require('cookie-session')
const cookieParse = require('cookie-parser');
const bcryptjs = require('bcryptjs')
const cors = require('cors');
const sequelize = require('sequelize');
const app = express();

var corsOptions = {
  origin: "http://localhost:3010"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const port = 3010;

//definitions routes
app.get("/", (req, res) => {
    res.json({ message:"Ma route GET node wow"});
  });

app.listen(port, () => {
  console.log('Ecoute démarrée sur le port : ' + port);
});
//ancien
/* const db = require("./models");

const Role = db.role;
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});
*/
  //ancien

//new
const db = require("./models");
const Role = db.role;
const controller = require("./controllers/groupe.controller.js");
const { groupe } = require('./models');
const run = async () => {
};

// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  initialGroupes();
  initialRoles();
  run();
});

function initialGroupes() {
  groupe.create({
    id: 1,
    name: "user"
  });
 
  groupe.create({
    id: 2,
    name: "moderator"
  });
 
  groupe.create({
    id: 3,
    name: "admin"
  });
}

function initialRoles() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
} 
//new