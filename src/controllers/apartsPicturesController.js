const { ApartsPictures } = require('../models/models');
const fs = require('fs');
const path = require('path');

class ApartsPicturesController {

  async getAllPictures(req, res) {
    const allPictures = await ApartsPictures.findAll()
    return res.json(allPictures)
  }

  async getPictures(req, res) {
    const { apartId } = req.params;
    try {
      const pictures = await ApartsPictures.findAll({
        where: { apartId: apartId }
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
    const { apartId, imageId } = req.params;
    try {
      const picture = await ApartsPictures.findOne({
        where: {
          id: imageId,
          apartId: apartId
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
    const { apartId } = req.params;

    if (!apartId) {
      return res.status(400).json({ error: 'Apartment ID is required' });
    }

    if (!req.processedFiles || req.processedFiles.length === 0) {
      return res.status(400).json({ error: 'No processed files found' });
    }

    try {
      const pictureUrls = await Promise.all(req.processedFiles.map(async ({ filename, path }) => {
        const picture = await ApartsPictures.create({
          url: path,
          apartId: apartId
        });
        return picture.url
      }))

      return res.json(pictureUrls);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deletePicture(req, res) {
    try {
      const { apartId, imageId } = req.params;
      if (!imageId) {
        return res.status(400).json({ error: 'ID not specified' })
      }
      const picture = await ApartsPictures.findByPk(imageId);
      if (!picture || picture.apartId !== parseInt(apartId, 10)) {
        return res.status(404).json({ error: 'Picture not found' });
      }

      const filePath = path.join(__dirname, '..', '..', picture.url);
      await picture.destroy();

      await fs.promises.unlink(filePath);
      res.json({ message: 'Picture deleted successfully' });
    } catch (e) {
      console.error(e);
      console.error("Error deleting file:", e);
      res.status(500).json({ error: 'Failed to delete the file' });
    }
  }
}

module.exports = new ApartsPicturesController();
