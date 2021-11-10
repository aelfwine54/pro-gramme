const jwt = require('jsonwebtoken');

class Auth {
  /**
   * Lorsqu'on doit simplement être connecté (ie le token est valide)
   * @param req
   * @param res
   * @param next
   */
  static basique(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, 'Un secret qui ne devrait pas etre ecrit directement ici');
      next();
    } catch {
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
  }

  /**
   * Lorsque le client doit être présent dans la requête :idClient. Un admin est accepté
   * @param req
   * @param res
   * @param next
   */
  static local(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, 'Un secret qui ne devrait pas etre ecrit directement ici');
      const userId = decodedToken.idClient;
      const role = decodedToken.role;
      if ((req.params.idClient && req.params.idClient !== userId) || role !== 'admin') {
        throw new Error('Invalid user ID');
      } else {
        next();
      }
    } catch {
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
  }

  /**
   * Lorsque seulement un administrateur doit pouvoir le faire
   * @param req
   * @param res
   * @param next
   */
  static admin(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, 'Un secret qui ne devrait pas etre ecrit directement ici');
      const role = decodedToken.role;
      if (role !== 'admin') {
        throw new Error('Vous n\'être pas administrateur');
      } else {
        next();
      }
    } catch {
      res.status(401).send('Vous devez être administrateur pour effectuer cette tâche');
    }
  }
}

module.exports = Auth;
