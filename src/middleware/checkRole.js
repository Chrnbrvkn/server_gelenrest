const { UserRoles, Roles } = require("../models/models");

const checkRole = (roles) => {
  return async (req, res, next) => {
    const userId = req.user.userId;
    try {
      const userRoles = await UserRoles.findAll({
        where: { userId },
        include: [{ model: Roles }]
      });
      
      const userRolesValues = userRoles.map(ur => ur.Role.value);
      const hasRole = roles.every(role => userRolesValues.includes(role));
      if (!hasRole) {
        return res.status(403).json({ message: 'Недостаточно прав для доступа к этому ресурсу.' });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: 'Произошла ошибка при проверке ролей пользователя.' });
    }
  };
};

module.exports = { checkRole }
