const ApiError = require('../error/ApiError');
const { Rooms, RoomsPictures } = require('../models/models')
class RoomController {
  async getAllRooms(req, res) {
    try {
      const allRooms = await Rooms.findAll()
      return res.json(allRooms)
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: e.message });
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
      return res.status(500).json({ error: e.message });
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
      const { houseId } = req.body
      if (!houseId) {
        return res.status(400).json({ error: 'House ID is required.' });
      }
      const room = await Rooms.create({ ...req.body })
      return res.json(room)
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
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

      const updatedRoom = await Rooms.findByPk(roomId)
      return res.json(updatedRoom)
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
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

      const pictures = await RoomsPictures.findAll({ where: { roomId: roomId } });
      if(pictures){
        await Promise.all(pictures.map(async (picture) => {
          const filePath = path.join(__dirname, '..', '..', 'public/uploads/roomsPictures', picture.url.split('/').pop());
          await fs.promises.unlink(filePath).catch(e => console.error("Error deleting file:", e));
          await picture.destroy();
        }));
      }

      await room.destroy()
      return res.json({ message: 'Room deleted' })
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
    }
  }

}

module.exports = new RoomController()