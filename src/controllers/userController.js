const ApiError = require('../error/ApiError');
const { Users } = require('../models/models')

class UserController {

  async createUser(req, res) {
    try {
      const { email, password, name, surname, role } = req.body
      const user = await Users.create({ email, password, name, surname, role })
      return res.json(user)
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async getOneUser(req, res) {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ error: 'ID not specified' })
    }
    const user = await Users.findByPk(id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    return res.json(user)
  }

  async getUsers(req, res) {
    const users = await Users.findAll()
    if (users.length === 0) {
      return res.json([]);
    }
    return res.json(users)
  }

  async updateUser(req, res) {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ error: 'ID not specified' })
    }
    const user = await Users.findByPk(id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name
    const surname = req.body.surname
    return res.json(user.update({ email: email, password: password, name: name, surname: surname }, { where: { id: id } }))
  }

  async deleteUser(req, res) {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ error: 'ID not specified' })
    }
    const user = await Users.findByPk(id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    await user.destroy()
    return res.json({ message: 'User deleted' })
  }

  async registration(req, res) {

  }

  async login(req, res) {

  }

}

module.exports = new UserController()