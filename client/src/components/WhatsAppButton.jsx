import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/919876543210?text=Hello! I'm interested in your travel/wedding services."
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} color="white" />
    </a>
  );
};

export default WhatsAppButton;
