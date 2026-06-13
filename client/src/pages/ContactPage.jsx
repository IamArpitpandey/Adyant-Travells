import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiCheck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill name, email and message');
      return;
    }
    setLoading(true);
    try {
      await axios.post('/api/contact', form);
      setSubmitted(true);
      toast.success('Message sent successfully!');
    } catch {
      // Demo mode
      setSubmitted(true);
      toast.success('Message sent! (Demo mode)');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: <FiPhone size={22} />, title: 'Phone', lines: ['+91 98765 43210', '+91 87654 32109'], color: '#27AE8F', action: 'tel:+919876543210' },
    { icon: <FiMail size={22} />, title: 'Email', lines: ['info@adyanttravells.com', 'bookings@adyanttravells.com'], color: '#C9A84C', action: 'mailto:info@adyanttravells.com' },
    { icon: <FiMapPin size={22} />, title: 'Office', lines: ['123 Wedding Palace Road,', 'Lucknow, UP 226001'], color: '#E74C8B', action: '#map' },
    { icon: <FiClock size={22} />, title: 'Hours', lines: ['Mon–Sat: 9AM – 8PM', 'Sun: 10AM – 5PM'], color: '#9B59B6' },
  ];

  return (
    <div className="pt-20 min-h-screen bg-cream dark:bg-royal-DEFAULT">
      {/* Hero */}
      <div className="bg-royal-gradient py-20 text-center px-6">
        <div className="section-tag !text-gold-light mb-3">Get In Touch</div>
        <h1 className="font-display text-4xl md:text-5xl text-white font-semibold mb-4">Contact Us</h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto">Have a question or ready to start planning? We'd love to hear from you.</p>
      </div>

      {/* Contact Cards */}
      <div className="max-w-7xl mx-auto px-6 -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactInfo.map((info, i) => (
            <a key={i} href={info.action || '#'} className="card-elegant p-6 text-center group hover:no-underline">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform" style={{ backgroundColor: info.color + '15', color: info.color }}>
                {info.icon}
              </div>
              <div className="font-semibold text-text-dark dark:text-white mb-2">{info.title}</div>
              {info.lines.map((line, j) => (
                <div key={j} className="text-text-medium dark:text-white/50 text-sm">{line}</div>
              ))}
            </a>
          ))}
        </div>
      </div>

      {/* Form + Map */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <div className="section-tag mb-3">Send a Message</div>
            <h2 className="section-title mb-8">Let's Talk</h2>

            {submitted ? (
              <div className="card-elegant p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <FiCheck className="text-green-500" size={32} />
                </div>
                <h3 className="font-display text-2xl font-semibold text-text-dark dark:text-white mb-2">Message Sent!</h3>
                <p className="text-text-medium dark:text-white/60 mb-6">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name:'', email:'', phone:'', subject:'', message:'' }); }} className="btn-outline-gold">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card-elegant p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-text-medium dark:text-white/60 text-sm mb-1.5 block">Full Name *</label>
                    <input type="text" className="form-input" placeholder="Your name" value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} />
                  </div>
                  <div>
                    <label className="text-text-medium dark:text-white/60 text-sm mb-1.5 block">Email Address *</label>
                    <input type="email" className="form-input" placeholder="your@email.com" value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} />
                  </div>
                  <div>
                    <label className="text-text-medium dark:text-white/60 text-sm mb-1.5 block">Phone Number</label>
                    <input type="tel" className="form-input" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm(p => ({...p, phone: e.target.value}))} />
                  </div>
                  <div>
                    <label className="text-text-medium dark:text-white/60 text-sm mb-1.5 block">Subject</label>
                    <select className="form-input" value={form.subject} onChange={e => setForm(p => ({...p, subject: e.target.value}))}>
                      <option value="">Select a subject</option>
                      <option>Travel Inquiry</option>
                      <option>Wedding Planning</option>
                      <option>Package Information</option>
                      <option>Pricing Query</option>
                      <option>Complaint / Feedback</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-text-medium dark:text-white/60 text-sm mb-1.5 block">Message *</label>
                  <textarea className="form-input resize-none" rows={5} placeholder="Tell us about your requirements, questions, or feedback..." value={form.message} onChange={e => setForm(p => ({...p, message: e.target.value}))} />
                </div>
                <button type="submit" disabled={loading} className="btn-gold w-full py-3.5 text-base flex items-center justify-center gap-2">
                  {loading ? (
                    <><div className="w-5 h-5 border-2 border-royal/30 border-t-royal rounded-full animate-spin" /> Sending...</>
                  ) : (
                    <><FiSend size={16} /> Send Message</>
                  )}
                </button>
              </form>
            )}

            {/* WhatsApp CTA */}
            <div className="mt-6 flex items-center gap-4 p-4 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <FaWhatsapp size={24} color="white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-text-dark dark:text-white text-sm">Prefer WhatsApp?</div>
                <div className="text-text-medium dark:text-white/50 text-xs">Chat with us instantly for quick responses</div>
              </div>
              <a href="https://wa.me/919876543210?text=Hello! I need information about your services." target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-green-600 transition-colors whitespace-nowrap">
                Chat Now
              </a>
            </div>
          </div>

          {/* Map + Office Info */}
          <div>
            <div className="section-tag mb-3">Find Us</div>
            <h2 className="section-title mb-8">Our Office</h2>

            {/* Google Maps Embed */}
            <div id="map" className="rounded-2xl overflow-hidden mb-6 border border-gold-DEFAULT/20" style={{ height: '320px' }}>
              <iframe
                title="Adyant Travells Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.563388765843!2d80.94678731504297!3d26.84628138315743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfda9dacd683b%3A0x7c97b1a3f7c8f8f8!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Office Details Card */}
            <div className="card-elegant p-6">
              <h3 className="font-display text-xl font-semibold text-text-dark dark:text-white mb-4">Adyant Travells & Marriage Planner</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FiMapPin className="text-gold-DEFAULT mt-0.5 flex-shrink-0" size={18} />
                  <span className="text-text-medium dark:text-white/60 text-sm">123 Wedding Palace Road, Hazratganj, Lucknow, Uttar Pradesh 226001, India</span>
                </div>
                <div className="flex items-center gap-3">
                  <FiPhone className="text-gold-DEFAULT flex-shrink-0" size={18} />
                  <a href="tel:+919876543210" className="text-text-medium dark:text-white/60 text-sm hover:text-gold-DEFAULT transition-colors">+91 98765 43210</a>
                </div>
                <div className="flex items-center gap-3">
                  <FiMail className="text-gold-DEFAULT flex-shrink-0" size={18} />
                  <a href="mailto:info@adyanttravells.com" className="text-text-medium dark:text-white/60 text-sm hover:text-gold-DEFAULT transition-colors">info@adyanttravells.com</a>
                </div>
                <div className="flex items-start gap-3">
                  <FiClock className="text-gold-DEFAULT mt-0.5 flex-shrink-0" size={18} />
                  <div className="text-text-medium dark:text-white/60 text-sm">
                    <div>Monday – Saturday: 9:00 AM – 8:00 PM</div>
                    <div>Sunday: 10:00 AM – 5:00 PM</div>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-5 border-t border-gold-DEFAULT/10">
                <div className="text-xs text-text-light dark:text-white/30 mb-2">Follow us on social media</div>
                <div className="flex gap-3">
                  {['Facebook', 'Instagram', 'YouTube', 'Twitter'].map(s => (
                    <a key={s} href="#" className="text-xs bg-gray-100 dark:bg-white/10 text-text-medium dark:text-white/50 px-3 py-1.5 rounded-full hover:bg-gold-DEFAULT hover:text-royal transition-all">{s}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
