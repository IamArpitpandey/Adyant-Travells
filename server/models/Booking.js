const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true
  },
  serviceType: {
    type: String,
    required: [true, 'Service type is required'],
    enum: ['travel', 'wedding', 'hotel', 'flight', 'tour-package', 'venue', 'decoration', 'catering', 'photography', 'makeup']
  },
  serviceCategory: {
    type: String,
    enum: ['travel', 'wedding'],
    required: true
  },
  details: {
    // Travel specific
    destination: String,
    origin: String,
    travelers: Number,
    flightClass: String,
    hotelStars: Number,
    packageName: String,
    // Wedding specific
    venueName: String,
    guestCount: Number,
    weddingPackage: String,
    theme: String,
    // Common
    specialRequirements: String
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  endDate: {
    type: Date
  },
  budget: {
    type: Number,
    required: [true, 'Budget is required']
  },
  currency: {
    type: String,
    default: 'INR'
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  adminNotes: {
    type: String,
    default: ''
  },
  bookingId: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Generate booking ID before saving
bookingSchema.pre('save', function(next) {
  if (!this.bookingId) {
    const prefix = this.serviceCategory === 'travel' ? 'TRV' : 'WED';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    this.bookingId = `${prefix}-${timestamp}-${random}`;
  }
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
