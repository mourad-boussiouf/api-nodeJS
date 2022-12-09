exports.allAccess = (req, res) => {
  res.status(200).send("OUVERT A TOUS.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("OUVERTS UTILISATEURS CONNECTES.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("OUVERTS UNIQUEMENT AUX ADMINS.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("OUVERTS UNIQUEMENTS AUX MODOS");
};

exports.saladesBoard = (req, res) => {
  res.status(200).send("OUVERTS UNIQUEMENTS AUX MODOS");
};

exports.tomatesBoard = (req, res) => {
  res.status(200).send("OUVERTS UNIQUEMENTS AUX MODOS");
};

exports.oignonsBoard = (req, res) => {
  res.status(200).send("OUVERTS UNIQUEMENTS AUX MODOS");
};