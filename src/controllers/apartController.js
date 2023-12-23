const ApiError = require('../error/ApiError');
const { Aparts } = require('../models/models')

class ApartController {

  async getAparts(req, res) {
    try {
      const aparts = await Aparts.findAll()
      if (aparts.length === 0) {
        return res.json([]);
      }
      return res.json(aparts)
    } catch (e) {
      console.error(e);
    }
  }

  async getOneApart(req, res) {
    try {
      const { apartId } = req.params
      if (!apartId) {
        return res.status(400).json({ error: 'ID not specified' })
      }
      const apart = await Aparts.findByPk(apartId)
      if (!apart) {
        return res.status(404).json({ error: 'Apart not found' })
      }
      return res.json(apart)
    } catch (e) {
      console.error(e);
    }
  }

  async createApart(req, res) {
    try {
      const { name, address, price, description_1,
        description_2, description_3, description_4, roomCount, roomCategories, meal, bookingConditions, checkoutTime, timeToSea, timeToMarket, timeToCafe, timeToBusStop, timeToBusCityCenter } = req.body
      const apart = await Aparts.create({
        name,
        address,
        price,
        description_1,
        description_2,
        description_3,
        description_4,
        roomCount,
        roomCategories,
        meal,
        bookingConditions,
        checkoutTime,
        timeToSea,
        timeToMarket,
        timeToCafe,
        timeToBusStop,
        timeToBusCityCenter
      })
      return res.json(apart)
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async updateApart(req, res) {
    try {
      const { apartId } = req.params
      if (!apartId) {
        return res.status(400).json({ error: 'ID not specified' })
      }
      const apart = await Aparts.findByPk(apartId)
      if (!apart) {
        return res.status(404).json({ error: 'Apart not found' })
      }
      await apart.update(req.body)
      const updatedApart = await Aparts.findByPk(apartId)
      return res.json(updatedApart)
    } catch (e) {
      console.error(e);
    }
  }

  async deleteApart(req, res) {
    try {
      const { apartId } = req.params
      if (!apartId) {
        return res.status(400).json({ error: 'ID not specified' })
      }
      const apart = await Aparts.findByPk(apartId)
      if (!apart) {
        return res.status(404).json({ error: 'Apart not found' })
      }
      await apart.destroy()
      return res.json({ message: 'Apart deleted' })
    } catch (e) {
      console.error(e);
    }
  }

}

module.exports = new ApartController()