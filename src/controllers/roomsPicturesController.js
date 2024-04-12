const { RoomsPictures } = require('../models/models');
const fs = require('fs');
const path = require('path');

class RoomsPicturesController {

  async getAllPictures(req, res) {
    try {
      const allPictures = await RoomsPictures.findAll()
      return res.json(allPictures)
    } catch (e) {
      console.error(e)
      return res.status(500).json({ error: e.message });

    }
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
      return res.status(500).json({ error: e.message });
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
      return res.status(500).json({ error: e.message });
    }
  }

  async uploadPictures(req, res) {
    try {
      const { roomId } = req.params;
      if (!roomId) {
        return res.status(400).json({ error: 'Room ID is required' });
      }
      if (!req.processedFiles || req.processedFiles.length === 0) {
        return res.status(400).json({ error: 'No processed files found' });
      }
      const pictureUrls = await Promise.all(req.processedFiles.map(async ({ filename, path }) => {
        const picture = await RoomsPictures.create({
          url: path,
          roomId: roomId
        });
        return picture.url
      }))

      return res.json(pictureUrls);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
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
      return res.status(500).json({ error: e.message });
    }
  }

}

module.exports = new RoomsPicturesController();
