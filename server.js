const express = require("express");
const cors = require("cors");
const db = require("./models");
const { user } = require("./models");
const Role = db.role;
const Groupe = db.groupe;
const User = db.user;
const app = express();

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
  initial();
});

function initial() {
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

  User.create({
  id : 1,
  username: "user1",
  email:"user1@user1.fr",
  password: "$2a$08$2dxd4tVsPnSDAgjYVyR7SepN12qMcfKkwAPyQFY/s6tl34ii5aB4u",
  firstname : "prenom1",
  lastname : "nom1",
  groupeId : 3,
  roles:  ["admin", "user"]})

  User.create({
  id : 2,
  username: "user2",
  email:"user2@user1.fr",
  password: "$2a$08$2dxd4tVsPnSDAgjYVyR7SepN12qMcfKkwAPyQFY/s6tl34ii5aB4u",
  firstname : "prenom2",
  lastname : "nom2",
  groupeId : 2,
  roles:  ["moderator", "user"]})

  User.create({
  id: 3,
  username: "user3",
  email:"user3@user1.fr",
  password: "$2a$08$2dxd4tVsPnSDAgjYVyR7SepN12qMcfKkwAPyQFY/s6tl34ii5aB4u",
  firstname : "prenom3",
  lastname : "nom3",
  groupeId : 1,
  roles:  ["user"]})
}

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);