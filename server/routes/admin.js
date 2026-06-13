const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Contact = require('../models/Contact');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');

// All admin routes require authentication + admin role
router.use(protect, adminOnly);

// @GET /api/admin/dashboard - Dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const [
      totalBookings,
      pendingBookings,
      confirmedBookings,
      totalContacts,
      newContacts,
      totalUsers,
      recentBookings
    ] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ status: 'pending' }),
      Booking.countDocuments({ status: 'confirmed' }),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'new' }),
      User.countDocuments({ role: 'user' }),
      Booking.find().sort({ createdAt: -1 }).limit(5)
    ]);

    // Revenue calculation (mock)
    const bookings = await Booking.find({ status: { $in: ['confirmed', 'completed'] } });
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.budget || 0), 0);

    res.json({
      success: true,
      stats: {
        totalBookings,
        pendingBookings,
        confirmedBookings,
        totalContacts,
        newContacts,
        totalUsers,
        totalRevenue,
        recentBookings
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @GET /api/admin/bookings - All bookings
router.get('/bookings', async (req, res) => {
  try {
    const { status, serviceCategory, page = 1, limit = 10 } = req.query;
    const query = {};
    if (status) query.status = status;
    if (serviceCategory) query.serviceCategory = serviceCategory;

    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await Booking.countDocuments(query);

    res.json({
      success: true,
      count: bookings.length,
      total,
      pages: Math.ceil(total / limit),
      bookings
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @PUT /api/admin/bookings/:id - Update booking status
router.put('/bookings/:id', async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    console.log(`📧 Status update email sent to: ${booking.email} - New status: ${status}`);
    res.json({ success: true, message: 'Booking updated successfully', booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @GET /api/admin/contacts - All contact queries
router.get('/contacts', async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = {};
    if (status) query.status = status;

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await Contact.countDocuments(query);

    res.json({ success: true, count: contacts.length, total, contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @PUT /api/admin/contacts/:id - Update contact status
router.put('/contacts/:id', async (req, res) => {
  try {
    const { status, reply } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, reply },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.json({ success: true, message: 'Contact updated', contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @GET /api/admin/users - All users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @POST /api/admin/seed - Seed admin user
router.post('/seed', async (req, res) => {
  try {
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return res.json({ success: true, message: 'Admin already exists' });
    }
    await User.create({
      name: 'Admin',
      email: 'admin@adyanttravells.com',
      password: 'Admin@123',
      role: 'admin'
    });
    res.json({ success: true, message: 'Admin created: admin@adyanttravells.com / Admin@123' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
