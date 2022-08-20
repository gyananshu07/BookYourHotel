const jwt = require("jsonwebtoken");
const createError = require("./errorHandler");

module.exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(createError(403, "Not Valid Token!"));
    req.user = user;
    next();
  });
};

module.exports.verifyUser = (req, res, next) => {
  this.verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized as an user!"));
    }
  });
};

module.exports.verifyAdmin = (req, res, next) => {
  this.verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized as an admin!"));
    }
  });
};
