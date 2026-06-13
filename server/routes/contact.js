const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email and message are required' });
    }

    const contact = await Contact.create({ name, email, phone, subject, message });
    
    // Mock email notification
    console.log(`📧 New contact form submission from: ${name} (${email})`);
    console.log(`📋 Subject: ${subject || 'General Inquiry'}`);
    console.log(`💬 Message: ${message}`);

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you within 24 hours.',
      id: contact._id
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
