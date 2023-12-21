const ApiError = require('../error/ApiError');
const { Rooms } = require('../models/models')
class RoomController {
  async getAllRooms(req, res) {
    try {
      const allRooms = await Rooms.findAll()
      return res.json(allRooms)
    } catch (e) {
      console.log(e);
    }
  }
  async getRooms(req, res) {
    try {
      const houseId = req.params.houseId
      if (!houseId) {
        return res.status(400).json({ error: 'houseId is required' });
      }
      const rooms = await Rooms.findAll({
        where: {
          houseId: houseId
        }
      })
      if (rooms.length === 0) {
        return res.json([]);
      }
      return res.json(rooms)
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Internal Server Error ' })
    }
  }

  async getOneRoom(req, res) {
    const { houseId, roomId } = req.params
    if (!roomId) {
      return res.status(400).json({ error: 'ID not specified' })
    }
    const room = await Rooms.findOne({
      where: {
        id: roomId,
        houseId: houseId
      }
    })
    if (!room) {
      return res.status(404).json({ error: 'Room not found' })
    }
    return res.json(room)
  }

  async createRoom(req, res) {
    try {
      const { name, address, price, roomCount, bedroom, bathroom, meal, facilities, houseId } = req.body
      if (!houseId) {
        return res.status(400).json({ error: 'House ID is required.' });
      }
      const room = await Rooms.create({
        name,
        address,
        price,
        roomCount,
        bedroom,
        bathroom,
        meal,
        facilities,
        houseId
      })
      return res.json(room)
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async updateRoom(req, res) {
    try {
      const { houseId, roomId } = req.params
      if (!roomId || !houseId) {
        throw new ApiError(400, 'Room ID and House ID are required');
      }

      const room = await Rooms.findOne({
        where: {
          id: roomId,
          houseId: houseId
        }
      })
      if (!room) {
        return res.status(404).json({ error: 'Room not found' })
      }
      await room.update(req.body)

      // await room.update({
      //   name: req.body.name,
      //   address: req.body.address,
      //   price: req.body.price,
      //   roomCount: req.body.roomCount,
      //   bedroom: req.body.bedroom,
      //   bathroom: req.body.bathroom,
      //   meal: req.body.meal,
      //   facilities: req.body.facilities,
      //   houseId: req.body.houseId,
      // }, { where: { id: roomId } })
      const updatedRoom = await Rooms.findByPk(roomId)
      return res.json(updatedRoom)
    } catch (e) {
      console.error(e);
    }
  }

  async deleteRoom(req, res) {
    try {
      const { roomId, houseId } = req.params
      if (!roomId) {
        return res.status(400).json({ error: 'ID not specified' })
      }
      const room = await Rooms.findOne({
        where: {
          id: roomId,
          houseId: houseId
        }
      })
      if (!room) {
        return res.status(404).json({ error: 'Room not found' })
      }
      await room.destroy()
      return res.json({ message: 'Room deleted' })
    } catch (e) {
      console.error(e);
    }
  }

}

module.exports = new RoomController()