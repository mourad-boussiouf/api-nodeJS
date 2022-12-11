const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  //route GET renvoi nom et prenom de tous les users de la table users
  app.get("/api/test/all/listeNoms", controller.listeNoms);

  //route GET renvoi les noms de tous les groupes de la table groupes
  app.get("/api/test/all/listeGroupes", controller.listeGroupes);

  app.get("/api/test/all/listeGroupesEtNoms", controller.listeGroupesEtNoms); 

  //update groupe de l'utilisateur connecté, param en body
  app.put(
    "/api/test/user/changeMyGroupe",
    [authJwt.verifyToken],
    controller.userConnectedChangeGroupe
  );

  //update infos de l'utilisateur connecté, param en body
  app.put(
    "/api/test/user/changeMyInfos",
    [authJwt.verifyToken],
    controller.userConnectedChangeInfos
  );

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    '/api/test/user/:id',
    [authJwt.verifyToken],
    controller.userBoardFind
  )

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

    //update infos de l'utilisateur dont on précise l'id dans le body, delete si le param ToDelete est configuré à true, false par défault.
    app.put(
      "/api/test/admin/manageUser",
      [authJwt.verifyToken, authJwt.isAdmin],
      controller.adminManageUserById
    );

    app.delete(
      "/api/test/admin/deleteOneGroupeById",
      [authJwt.verifyToken, authJwt.isAdmin],
      controller.adminDeleteOneGroupeById 
    );

    app.post(
      "/api/test/admin/addOneGroupeByName",
      [authJwt.verifyToken, authJwt.isAdmin],
      controller.adminAddOneGroupeByName
    );

    app.put(
      "/api/test/admin/modifyOneGroupeById",
      [authJwt.verifyToken, authJwt.isAdmin],
      controller.adminModifyOneGroupeById
    );

    app.put(
      "/api/test/admin/modifyGroupeBelongingByUsername",
      [authJwt.verifyToken, authJwt.isAdmin],
      controller.adminModifyOneGroupeById
    );

};