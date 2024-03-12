const { Roles, Users } = require("../models/models");




const checkRole = (requiredRoles) => {

  const roleAccessLevels = {
    'user': 1,
    'admin': 2,
    'main_admin': 3,
    'developer': 4
  };

  console.log('CHECK ROLES ' + JSON.stringify(requiredRoles));
  return async (req, res, next) => {
    const userId = req.user.userId;
    try {
      const userWithRoles = await Users.findOne({
        where: { id: userId },
        include: [{ model: Roles }]
      });
      
      console.log(`CHECK ROLES userWithRoles: ${JSON.stringify(userWithRoles, null, 2)}`);
      if (!userWithRoles || !Array.isArray(userWithRoles.roles)) {
        return res.status(404)
        .json({ message: `Пользователь не найден. ${JSON.stringify(userWithRoles)}` });
      }

      const userMaxAccessLevel = Math.max(...userWithRoles.roles.map(role => roleAccessLevels[role.value] || 0));
      const requiredMaxAccessLevel = Math.max(...requiredRoles.map(role => roleAccessLevels[role] || 0));

      console.log('CHECK ROLES userMaxAccessLevel' + userMaxAccessLevel);
      console.log('CHECK ROLES requiredMaxAccessLevel' + requiredMaxAccessLevel);
      if (userMaxAccessLevel >= requiredMaxAccessLevel) {
        next();
      } else {
        return res.status(403).json({ message: 'Недостаточно прав для доступа к этому ресурсу.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Произошла ошибка при проверке ролей пользователя.  userWithRoles ${userWithRoles} requiredMaxAccessLevel ${requiredMaxAccessLevel} userMaxAccessLevel ${userMaxAccessLevel}' });
    }
  };
};


module.exports = { checkRole }
