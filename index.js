//initialisation modules et variables
const express = require('express');
const app = express();
const port = 3010;

//definitions routes
app.get('/', (req, res) => res.send('Ma route GET node wow'));

app.listen(port, () => {
  console.log('Ecoute démarrée sur le port : ' + port);
});