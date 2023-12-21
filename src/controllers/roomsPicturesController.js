const { RoomsPictures } = require('../models/models');
const fs = require('fs');
const path = require('path');

class RoomsPicturesController {

  async getAllPictures(req, res){
    const allPictures = await RoomsPictures.findAll()
    return res.json(allPictures)
  }

  async getPictures(req, res) {
    const { roomId } = req.params;
    try {
      const pictures = await RoomsPictures.findAll({
        where: { roomId: roomId }
      });
      if (pictures.length === 0) {
        return res.json([]);
      }

      return res.json(pictures);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getOnePicture(req, res) {
    const { roomId, imageId } = req.params;
    try {
      const picture = await RoomsPictures.findOne({
        where: {
          id: imageId,
          roomId: roomId
        }
      });
      if (!picture) {
        return res.status(404).json({ error: 'Picture not found' });
      }
      return res.json(picture);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async uploadPictures(req, res) {
    try {
      const { roomId } = req.params;
      if (!roomId) {
        return res.status(400).json({ error: 'Room ID is required' });
      }

      const pictureUrls = [];
      for (const file of req.files) {
        const tempUrl = '/public/uploads/roomsPictures/' + file.filename;
        const picture = await RoomsPictures.create({ url: tempUrl, roomId: roomId });
        pictureUrls.push(picture.url);
      }

      return res.json(pictureUrls);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deletePicture(req, res) {
    try {
      const { roomId, imageId } = req.params;
      if (!imageId) {
        return res.status(400).json({ error: 'ID not specified' })
      }
      const picture = await RoomsPictures.findByPk(imageId);
      if (!picture || picture.roomId !== parseInt(roomId, 10)) {
        return res.status(404).json({ error: 'Picture not found' });
      }

      const filePath = path.join(__dirname, '..', '..', picture.url);
      await picture.destroy();

      await fs.promises.unlink(filePath);
      res.json({ message: 'Picture deleted successfully' });
    } catch (e) {
      console.error("Error deleting file:", e);
      res.status(500).json({ error: 'Failed to delete the file' });
    }
  }

}

module.exports = new RoomsPicturesController();
