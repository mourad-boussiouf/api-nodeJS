exports.allAccess = (req, res) => {
  res.status(200).send("Public GET.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User GET.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin GET.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator GET.");
};