const { HousesPictures } = require('../models/models')
const fs = require('fs');
const path = require('path');

class HousesPicturesController {
  
  async getAllPictures(req, res){
    const allPictures = await HousesPictures.findAll()
    return res.json(allPictures)
  }

  async getPictures(req, res) {
    const { houseId } = req.params
    try {
      const pictures = await HousesPictures.findAll({
        where: { houseId: houseId }
      })
      if (pictures.length === 0) {
        return res.json([]);
      }

      return res.json(pictures)
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getOnePicture(req, res) {
    const { houseId, imageId } = req.params;
    try {
      const picture = await HousesPictures.findOne({
        where: {
          id: imageId,
          houseId: houseId
        }
      })
      if (!picture) {
        return res.status(404).json({ error: 'Picture not found' })
      }
      return res.json(picture);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async uploadPictures(req, res) {
    try {
      const { houseId } = req.params
      if (!houseId) {
        return res.status(400).json({ error: 'House ID is required' });
      }

      const pictureUrls = [];
      for (const file of req.files) {
        const tempUrl = '/public/uploads/housesPictures/' + file.filename;
        const picture = await HousesPictures.create({ url: tempUrl, houseId: houseId });
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
      const { houseId, imageId } = req.params;
      if (!imageId) {
        return res.status(400).json({ error: 'ID not specified' })
      }
      const picture = await HousesPictures.findByPk(imageId)
      if (!picture || picture.houseId !== parseInt(houseId, 10)) {
        return res.status(404).json({ error: 'Picture not found' })
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

module.exports = new HousesPicturesController()