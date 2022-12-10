const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const express = require("express");
const cors = require("cors");
const db = require("./models");
const { user } = require("./models");
const Role = db.role;
const Groupe = db.groupe;
const User = db.user;
const app = express();
const config = require("./config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

var corsOptions = {
  origin: "http://localhost:3010"
};

app.use(cors(corsOptions));


app.use(express.json());


app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "GET api root OK" });
});


const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`port du serveur : ${PORT}.`);
});


db.sequelize.sync({force: true}).then(() => {
  console.log('DROP et creation Db via sequelize ORM');
  initial1();
  setTimeout(initial2, 400)
  setTimeout(initialRealsUsers, 800)
});

function  initial1()  {

  Groupe.create({
    id: 1,
    name: "salades"
  });
  Groupe.create({
    id: 2,
    name: "tomates"
  });
  Groupe.create({
    id: 3,
    name: "oignons"
  });

}
function initial2() {
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

async function initialRealsUsers()  {
  for (let i = 1; i < 11; i++) {
  let iString =  i.toString();
  let random = Math.random()
  let groupeParam = "salades";
  if (random >= 0.3){groupeParam = "tomates"}
  if (random >= 0.6){groupeParam = "oignons"}
  const body = {"username": "user"+iString,
  "email":"user"+iString+"@user.fr",
  "password": "12345689",
  "firstname" : "prenom"+iString,
  "lastname" : "nom"+iString,
  "groupeId" : groupeParam,
  "roles": ["user", "moderator", "admin"]};

  const response = await fetch('http://localhost:3010/api/auth/signup', {
	method: 'post',
	body: JSON.stringify(body),
	headers: {'Content-Type': 'application/json'}
});
const data = await response.json();

console.log(data);
}
}

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);