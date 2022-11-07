const boom = require('@hapi/boom');

function checkApiKey(req, res, next) {
  const { api } = req.headers;

  if (api !== '123') return next(boom.unauthorized());

  next();
}

function checkAdminRole(req, res, next) {
  const user = req.user;

  if (user.role !== 'admin') return next(boom.unauthorized());

  next();
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;

    console.log(roles);

    if (!roles.includes(user.role)) return next(boom.unauthorized());

    next();
  };
}

module.exports = { checkApiKey, checkAdminRole, checkRoles };
