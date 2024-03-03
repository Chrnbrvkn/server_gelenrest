const { Houses, HousesPictures } = require('../models/models')

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
      return res.status(500).json({ error: e.message });
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
      return res.status(500).json({ error: e.message });
    }
  }

  async createHouse(req, res) {
    try {
      const house = await Houses.create({ ...req.body });
      return res.json(house)
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: e.message });
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
      const updatedHouse = await Houses.findByPk(houseId);
      return res.json(updatedHouse)
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
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

      // Находим и удаляем все связанные картинки
      const pictures = await HousesPictures.findAll({ where: { houseId: houseId } });
      await Promise.all(pictures.map(async (picture) => {
        const filePath = path.join(__dirname, '..', '..', 'public/uploads/housesPictures', picture.url.split('/').pop());
        await fs.promises.unlink(filePath).catch(e => console.error("Error deleting file:", e));
        await picture.destroy();
      }));

      await house.destroy()
      return res.json({ message: 'House deleted' })
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
    }
  }

}

module.exports = new HouseController()