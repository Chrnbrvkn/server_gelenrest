const { Houses } = require('../models/models')

class HouseController {

  async getHouses(req, res) {
    try {
      const houses = await Houses.findAll()
      if (houses.length === 0) {
        return res.json('No data');
      }
      return res.json(houses)
    } catch (e) {
      console.error(e);
    }
  }

  async getOneHouse(req, res) {
    try {
      const { houseId } = req.params
      if (!houseId) {
        return res.status(400).json({ error: 'ID not specified' })
      }
      const house = await Houses.findByPk(houseId)
      if (!house) {
        return res.status(404).json({ error: 'House not found' })
      }
      return res.json(house)
    } catch (e) {
      console.error(e);
    }
  }

  async createHouse(req, res) {
    try {
      const { name, address, description_1,
        description_2, description_3, description_4, roomCount, roomCategories, meal, bookingConditions, checkoutTime, timeToSea, timeToMarket, timeToCafe, timeToBusStop, timeToBusCityCenter } = req.body;
      const house = await Houses.create({
        name,
        address,
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
        timeToBusCityCenter,
      });
      return res.json(house)
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async updateHouse(req, res) {
    try {
      const { houseId } = req.params
      console.log(`UPDATE HOUSE REQUEST: ${JSON.stringify(req.body)}`);
      if (!houseId) {
        return res.status(400).json({ error: 'houseId not specified' })
      }
      const house = await Houses.findByPk(houseId)
      if (!house) {
        return res.status(404).json({ error: 'House not found' })
      }
      await house.update(req.body)
      // await house.update({
      //   name: req.body.name,
      //   address: req.body.address,
      //   description_1: req.body.description_1,
      //   description_2: req.body.description_2,
      //   description_3: req.body.description_3,
      //   description_4: req.body.description_4,
      //   roomCount: req.body.roomCount,
      //   roomCategories: req.body.roomCategories,
      //   meal: req.body.meal,
      //   bookingConditions: req.body.bookingConditions,
      //   checkoutTime: req.body.checkoutTime,
      //   timeToSea: req.body.timeToSea,
      //   timeToMarket: req.body.timeToMarket,
      //   timeToCafe: req.body.timeToCafe,
      //   timeToBusStop: req.body.timeToBusStop,
      //   timeToBusCityCenter: req.body.timeToBusCityCenter,
      // }, { where: { id: houseId } })
      const updatedHouse = await Houses.findByPk(houseId);
      return res.json(updatedHouse)
    } catch (e) {
      console.error(e);
    }
  }

  async deleteHouse(req, res) {
    try {
      const { houseId } = req.params
      if (!houseId) {
        return res.status(400).json({ error: 'ID not specified' })
      }
      const house = await Houses.findByPk(houseId)
      if (!house) {
        return res.status(404).json({ error: 'House not found' })
      }
      await house.destroy()
      return res.json({ message: 'House deleted' })
    } catch (e) {
      console.error(e);
    }
  }

}

module.exports = new HouseController()