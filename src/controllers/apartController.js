const ApiError = require('../error/ApiError');
const path = require('path');
const fs = require('fs');
const { Aparts, ApartsPictures } = require('../models/models')

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
      return res.status(500).json({ error: e.message });
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
      return res.status(500).json({ error: e.message });
    }
  }

  async createApart(req, res) {
    try {
      const apart = await Aparts.create({ ...req.body })
      return res.json(apart)
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: 'Internal Server Error' })
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
      return res.status(500).json({ error: e.message });
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

      // Находим и удаляем все связанные картинки
      const pictures = await ApartsPictures.findAll({ where: { apartId: apartId } });
      await Promise.all(pictures.map(async (picture) => {
        const filePath = path.join(__dirname, '..', '..', 'public/uploads/apartsPictures', picture.url.split('/').pop());
        await fs.promises.unlink(filePath).catch(e => console.error("Error deleting file:", e));
        await picture.destroy();
      }));

      await apart.destroy()
      return res.json({ message: 'Apart deleted' })
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
    }
  }

}

module.exports = new ApartController()