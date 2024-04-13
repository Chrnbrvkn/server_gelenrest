
const { Bookings } = require('../models/models');
const { sendToTelegramBot } = require('./tgBotController');

class BookingController {
  async getReservedDates(req, res) {
    try {
      const bookings = await Bookings.findAll({
        attributes: ['houseId', 'roomId', 'apartId', 'checkInDate', 'checkOutDate'],
        where: {
          status: 'Подтверждён'
        }
      });
      return res.json(bookings);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
    }
  }


  async getBookings(req, res) {
    try {
      const bookings = await Bookings.findAll()
      if (bookings.length === 0) {
        return res.json([])
      }
      return res.json(bookings)
    } catch (e) {
      console.error(e)
      return res.status(500).json({ error: e.message });

    }
  }

  async getOneBooking(req, res) {
    try {
      const { bookingId } = req.params
      if (!bookingId) {
        return res.status(400).json({ error: 'ID not specified' })
      }
      const booking = await Bookings.findByPk(bookingId)
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' })
      }
      return res.json(booking)
    } catch (e) {
      console.error(e)
      return res.status(500).json({ error: e.message });

    }
  }

  async createBooking(req, res) {
    try {
      const booking = await Bookings.create({ ...req.body })

      const bookingInfo = `Новая бронь ${booking.id}:
      \nИмя: ${req.body.guestName}
      \nНомер: ${req.body.houseName === '' ? req.body.itemName : req.body.houseName + ' ' + req.body.itemName}
      \nАдрес: ${req.body.address}
      \nТелефон: ${req.body.guestContact}
      \nДата: ${req.body.checkInDate.slice(0, 10)} - ${req.body.checkOutDate.slice(0, 10)}`;

      await sendToTelegramBot(bookingInfo);
      return res.json(booking)
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });

    }
  }

  async updateBooking(req, res) {
    try {
      const { bookingId } = req.params
      if (!bookingId) {
        return res.status(400).json({ error: 'ID not specified' })
      }
      const booking = await Bookings.findByPk(bookingId)
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' })
      }
      await booking.update(req.body)
      const updatedBooking = await Bookings.findByPk(bookingId)
      return res.json(updatedBooking)
    } catch (e) {
      console.error(e)
      return res.status(500).json({ error: e.message });
    }
  }

  async deleteBooking(req, res) {
    try {
      const { bookingId } = req.params
      if (!bookingId) {
        return res.status(400).json({ error: 'ID not specified' })
      }
      const booking = await Bookings.findByPk(bookingId)
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' })
      }
      await booking.destroy()
      return res.json({ message: 'Booking deleted' })
    } catch (e) {
      console.error(e)
      return res.status(500).json({ error: e.message });

    }
  }

}

module.exports = new BookingController()