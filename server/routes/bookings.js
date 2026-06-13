const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');

// @POST /api/bookings - Create booking (public or authenticated)
router.post('/', async (req, res) => {
  try {
    const bookingData = { ...req.body };
    
    // Attach userId if logged in (optional via token check)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET || 'fallback_secret');
        bookingData.userId = decoded.id;
      } catch (e) { /* no user attached */ }
    }

    const booking = await Booking.create(bookingData);

    // Mock email notification
    console.log(`📧 Booking confirmation email sent to: ${booking.email}`);
    console.log(`📋 Booking ID: ${booking.bookingId}`);

    res.status(201).json({
      success: true,
      message: 'Booking submitted successfully! We will contact you within 24 hours.',
      booking: {
        bookingId: booking.bookingId,
        status: booking.status,
        serviceType: booking.serviceType,
        date: booking.date,
        budget: booking.budget
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @GET /api/bookings/my - Get current user's bookings
router.get('/my', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    res.json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @GET /api/bookings/:id - Get single booking by bookingId
router.get('/:bookingId', async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.bookingId });
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @PUT /api/bookings/:id/cancel - Cancel a booking
router.put('/:bookingId/cancel', protect, async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.bookingId });
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    if (booking.userId && booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    if (booking.status === 'completed') {
      return res.status(400).json({ success: false, message: 'Cannot cancel completed booking' });
    }
    booking.status = 'cancelled';
    await booking.save();
    res.json({ success: true, message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
