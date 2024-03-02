
const { Bookings } = require('../models/models');
const { sendToTelegramBot } = require('./tgBotController');

class BookingController {
  async getBookings(req, res) {
    try {
      const bookings = await Bookings.findAll()
      if (bookings.length === 0) {
        return res.json([])
      }
      return res.json(bookings)
    } catch (e) {
      console.error(e)
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
    }
  }

  async createBooking(req, res) {
    try {
      const booking = await Bookings.create({ ...req.body })
      await sendToTelegramBot(req.body)
      return res.json(booking)
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Internal Server Error' })

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
    }
  }

}

module.exports = new BookingController()