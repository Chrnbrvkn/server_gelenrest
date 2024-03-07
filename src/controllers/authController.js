const users = require('./userController')

class AuthController {

  async registration(req, res) {
    try {

    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: e })
    }
  }
  async login(req, res) {
    try {

    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: e })
    }
  }
}

module.exports = new AuthController()