const ApiError = require('../error/ApiError');
const { Users } = require('../models/models')

class UserController {

  async getUsers(req, res) {
    try {
      const users = await Users.findAll()
      if (users.length === 0) {
        return res.json([]);
      }
      return res.json(users)
    } catch (e) {
      console.error(e)
      return res.status(500).json({ error: e.message });

    }
  }

  async getOneUser(req, res) {

    try {
      const { userId } = req.params
      if (!userId) {
        return res.status(400).json({ error: `ID not specified req.params: ${JSON.stringify(req.params)}` })
      }
      const user = await Users.findByPk(userId)
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }
      return res.json(user)
    } catch (e) {
      console.error(e)
      return res.status(500).json({ error: e.message });


    }
  }

  async createUser(req, res) {
    try {
      const { email, password, name, surname } = req.body
      const user = await Users.create({ email, password, name, surname })
      return res.json(user)
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: e.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { userId } = req.params
      if (!userId) {
        return res.status(400).json({ error: 'ID not specified' })
      }
      const user = await Users.findByPk(userId)
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }
      const email = req.body.email
      const password = req.body.password
      const name = req.body.name
      const surname = req.body.surname
      return res.json(user.update(
        {
          email: email, password: password,
          name: name, surname: surname
        },
        { where: { id: userId } }))
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: e.message });

    }
  }

  async deleteUser(req, res) {
    try {
      const { userId } = req.params
      console.log('REQ PARAMS');
      console.log(req.params);
      console.log(typeof userId);
      if (!userId) {
        return res.status(400).json({ error: 'ID not specified' })
      }
      const user = await Users.findByPk(userId)
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }
      await user.destroy()
      return res.json({ message: 'User deleted' })
    } catch (e) {
      console.error(e)
      return res.status(500).json({ error: e.message });
    }
  }

  async test(req, res) {
    return res.json('HIII IM BORNING!!!')
  }

}

module.exports = new UserController()