const express = require("express");
const cors = require("cors");
const db = require("./models");
const Role = db.role;
const Groupe = db.groupe;
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
}

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);