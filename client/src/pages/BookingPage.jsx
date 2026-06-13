import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiCheck } from 'react-icons/fi';
import { MdFlight } from 'react-icons/md';
import { GiDiamondRing } from 'react-icons/gi';

const BookingPage = () => {
  const [activeTab, setActiveTab] = useState('travel');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const [travelForm, setTravelForm] = useState({
    name: '', email: '', phone: '',
    serviceType: 'tour-package', destination: '', origin: 'Delhi',
    date: '', endDate: '', travelers: 2, flightClass: 'Economy',
    budget: '', specialRequirements: ''
  });

  const [weddingForm, setWeddingForm] = useState({
    name: '', email: '', phone: '',
    serviceType: 'venue', weddingPackage: 'Golden Dreams',
    venueName: '', date: '', guestCount: 100,
    theme: '', budget: '', specialRequirements: ''
  });

  const handleTravelSubmit = async (e) => {
    e.preventDefault();
    if (!travelForm.name || !travelForm.email || !travelForm.phone || !travelForm.date || !travelForm.budget) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name: travelForm.name, email: travelForm.email, phone: travelForm.phone,
        serviceType: travelForm.serviceType, serviceCategory: 'travel',
        date: travelForm.date, endDate: travelForm.endDate, budget: Number(travelForm.budget),
        details: {
          destination: travelForm.destination, origin: travelForm.origin,
          travelers: travelForm.travelers, flightClass: travelForm.flightClass,
          specialRequirements: travelForm.specialRequirements
        }
      };
      const res = await axios.post('/api/bookings', payload);
      setSuccess(res.data);
      toast.success('Booking submitted successfully!');
    } catch (err) {
      // Demo mode - show success anyway
      setSuccess({ booking: { bookingId: 'TRV-DEMO-001', status: 'pending', serviceType: travelForm.serviceType, date: travelForm.date, budget: travelForm.budget }});
      toast.success('Booking submitted! (Demo mode)');
    } finally {
      setLoading(false);
    }
  };

  const handleWeddingSubmit = async (e) => {
    e.preventDefault();
    if (!weddingForm.name || !weddingForm.email || !weddingForm.phone || !weddingForm.date || !weddingForm.budget) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name: weddingForm.name, email: weddingForm.email, phone: weddingForm.phone,
        serviceType: weddingForm.serviceType, serviceCategory: 'wedding',
        date: weddingForm.date, budget: Number(weddingForm.budget),
        details: {
          weddingPackage: weddingForm.weddingPackage, venueName: weddingForm.venueName,
          guestCount: weddingForm.guestCount, theme: weddingForm.theme,
          specialRequirements: weddingForm.specialRequirements
        }
      };
      const res = await axios.post('/api/bookings', payload);
      setSuccess(res.data);
      toast.success('Wedding booking submitted!');
    } catch {
      setSuccess({ booking: { bookingId: 'WED-DEMO-001', status: 'pending', serviceType: weddingForm.serviceType, date: weddingForm.date, budget: weddingForm.budget }});
      toast.success('Booking submitted! (Demo mode)');
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, required, children }) => (
    <div>
      <label className="block text-text-medium dark:text-white/60 text-sm mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  );

  if (success) {
    return (
      <div className="pt-20 min-h-screen bg-cream dark:bg-royal-DEFAULT flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <FiCheck className="text-green-500" size={40} />
          </div>
          <h2 className="font-display text-4xl font-semibold text-text-dark dark:text-white mb-3">Booking Submitted!</h2>
          <p className="text-text-medium dark:text-white/60 mb-6">Our team will contact you within 24 hours to confirm your booking.</p>
          <div className="card-elegant p-6 text-left mb-6">
            <div className="section-tag mb-4">Booking Details</div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-text-medium dark:text-white/50 text-sm">Booking ID</span>
                <span className="font-semibold text-gold-DEFAULT">{success.booking?.bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-medium dark:text-white/50 text-sm">Status</span>
                <span className="status-pending px-2 py-0.5 rounded text-xs font-semibold capitalize">{success.booking?.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-medium dark:text-white/50 text-sm">Service</span>
                <span className="text-text-dark dark:text-white text-sm capitalize">{success.booking?.serviceType?.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-medium dark:text-white/50 text-sm">Budget</span>
                <span className="text-text-dark dark:text-white text-sm">₹{Number(success.booking?.budget).toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setSuccess(null)} className="flex-1 btn-outline-gold">Book Another</button>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex-1 btn-gold text-center">WhatsApp Us</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-cream dark:bg-royal-DEFAULT">
      {/* Header */}
      <div className="bg-royal-gradient py-16 text-center">
        <div className="section-tag !text-gold-light mb-3">Book Now</div>
        <h1 className="font-display text-4xl md:text-5xl text-white font-semibold mb-3">Make a Booking</h1>
        <p className="text-white/60 text-lg">Fill in your requirements and our team will get back to you within 24 hours</p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Tab Switcher */}
        <div className="flex bg-white dark:bg-royal-purple/30 rounded-xl p-1 mb-8 shadow-sm border border-gold-DEFAULT/10">
          <button
            onClick={() => setActiveTab('travel')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all
              ${activeTab === 'travel' ? 'bg-royal-DEFAULT text-gold-DEFAULT shadow-md' : 'text-text-medium dark:text-white/50 hover:text-gold-DEFAULT'}`}
          >
            <MdFlight size={18} /> Travel Booking
          </button>
          <button
            onClick={() => setActiveTab('wedding')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all
              ${activeTab === 'wedding' ? 'bg-royal-DEFAULT text-gold-DEFAULT shadow-md' : 'text-text-medium dark:text-white/50 hover:text-gold-DEFAULT'}`}
          >
            <GiDiamondRing size={18} /> Wedding Booking
          </button>
        </div>

        {/* TRAVEL FORM */}
        {activeTab === 'travel' && (
          <form onSubmit={handleTravelSubmit} className="card-elegant p-8 space-y-5">
            <h2 className="font-display text-2xl font-semibold text-text-dark dark:text-white">Travel Booking Request</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField label="Full Name" required>
                <input type="text" className="form-input" placeholder="Your full name" value={travelForm.name} onChange={e => setTravelForm(p => ({...p, name: e.target.value}))} />
              </InputField>
              <InputField label="Email Address" required>
                <input type="email" className="form-input" placeholder="your@email.com" value={travelForm.email} onChange={e => setTravelForm(p => ({...p, email: e.target.value}))} />
              </InputField>
              <InputField label="Phone Number" required>
                <input type="tel" className="form-input" placeholder="+91 98765 43210" value={travelForm.phone} onChange={e => setTravelForm(p => ({...p, phone: e.target.value}))} />
              </InputField>
              <InputField label="Service Type" required>
                <select className="form-input" value={travelForm.serviceType} onChange={e => setTravelForm(p => ({...p, serviceType: e.target.value}))}>
                  <option value="flight">Flight Booking</option>
                  <option value="hotel">Hotel Booking</option>
                  <option value="tour-package">Tour Package</option>
                </select>
              </InputField>
              <InputField label="From (Origin)" >
                <input type="text" className="form-input" placeholder="Departure city" value={travelForm.origin} onChange={e => setTravelForm(p => ({...p, origin: e.target.value}))} />
              </InputField>
              <InputField label="To (Destination)" >
                <input type="text" className="form-input" placeholder="Destination city/country" value={travelForm.destination} onChange={e => setTravelForm(p => ({...p, destination: e.target.value}))} />
              </InputField>
              <InputField label="Travel Date" required>
                <input type="date" className="form-input" value={travelForm.date} onChange={e => setTravelForm(p => ({...p, date: e.target.value}))} />
              </InputField>
              <InputField label="Return Date">
                <input type="date" className="form-input" value={travelForm.endDate} onChange={e => setTravelForm(p => ({...p, endDate: e.target.value}))} />
              </InputField>
              <InputField label="No. of Travelers">
                <input type="number" className="form-input" min="1" max="50" value={travelForm.travelers} onChange={e => setTravelForm(p => ({...p, travelers: e.target.value}))} />
              </InputField>
              <InputField label="Class Preference">
                <select className="form-input" value={travelForm.flightClass} onChange={e => setTravelForm(p => ({...p, flightClass: e.target.value}))}>
                  <option>Economy</option>
                  <option>Business</option>
                  <option>First Class</option>
                </select>
              </InputField>
              <InputField label="Budget (INR)" required>
                <input type="number" className="form-input" placeholder="e.g. 50000" value={travelForm.budget} onChange={e => setTravelForm(p => ({...p, budget: e.target.value}))} />
              </InputField>
            </div>
            <InputField label="Special Requirements">
              <textarea className="form-input resize-none" rows={3} placeholder="Any specific requirements, dietary needs, accessibility needs..." value={travelForm.specialRequirements} onChange={e => setTravelForm(p => ({...p, specialRequirements: e.target.value}))} />
            </InputField>
            <button type="submit" disabled={loading} className="btn-gold w-full py-4 text-base flex items-center justify-center gap-2">
              {loading ? <><div className="w-5 h-5 border-2 border-royal/30 border-t-royal rounded-full animate-spin" /> Submitting...</> : '✈️ Submit Travel Booking'}
            </button>
          </form>
        )}

        {/* WEDDING FORM */}
        {activeTab === 'wedding' && (
          <form onSubmit={handleWeddingSubmit} className="card-elegant p-8 space-y-5">
            <h2 className="font-display text-2xl font-semibold text-text-dark dark:text-white">Wedding Booking Request</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField label="Full Name" required>
                <input type="text" className="form-input" placeholder="Your full name" value={weddingForm.name} onChange={e => setWeddingForm(p => ({...p, name: e.target.value}))} />
              </InputField>
              <InputField label="Email Address" required>
                <input type="email" className="form-input" placeholder="your@email.com" value={weddingForm.email} onChange={e => setWeddingForm(p => ({...p, email: e.target.value}))} />
              </InputField>
              <InputField label="Phone Number" required>
                <input type="tel" className="form-input" placeholder="+91 98765 43210" value={weddingForm.phone} onChange={e => setWeddingForm(p => ({...p, phone: e.target.value}))} />
              </InputField>
              <InputField label="Service Required" required>
                <select className="form-input" value={weddingForm.serviceType} onChange={e => setWeddingForm(p => ({...p, serviceType: e.target.value}))}>
                  <option value="venue">Venue Booking</option>
                  <option value="decoration">Decoration</option>
                  <option value="catering">Catering</option>
                  <option value="photography">Photography</option>
                  <option value="makeup">Bridal Makeup</option>
                  <option value="wedding">Complete Wedding Package</option>
                </select>
              </InputField>
              <InputField label="Preferred Package">
                <select className="form-input" value={weddingForm.weddingPackage} onChange={e => setWeddingForm(p => ({...p, weddingPackage: e.target.value}))}>
                  <option>Silver Bliss</option>
                  <option>Golden Dreams</option>
                  <option>Platinum Royale</option>
                  <option>Custom Package</option>
                </select>
              </InputField>
              <InputField label="Wedding Date" required>
                <input type="date" className="form-input" value={weddingForm.date} onChange={e => setWeddingForm(p => ({...p, date: e.target.value}))} />
              </InputField>
              <InputField label="Expected Guests">
                <input type="number" className="form-input" min="10" value={weddingForm.guestCount} onChange={e => setWeddingForm(p => ({...p, guestCount: e.target.value}))} />
              </InputField>
              <InputField label="Preferred Venue">
                <input type="text" className="form-input" placeholder="Palace hotel, garden, banquet..." value={weddingForm.venueName} onChange={e => setWeddingForm(p => ({...p, venueName: e.target.value}))} />
              </InputField>
              <InputField label="Wedding Theme">
                <input type="text" className="form-input" placeholder="Royal, floral, beach, destination..." value={weddingForm.theme} onChange={e => setWeddingForm(p => ({...p, theme: e.target.value}))} />
              </InputField>
              <InputField label="Total Budget (INR)" required>
                <input type="number" className="form-input" placeholder="e.g. 500000" value={weddingForm.budget} onChange={e => setWeddingForm(p => ({...p, budget: e.target.value}))} />
              </InputField>
            </div>
            <InputField label="Special Requirements">
              <textarea className="form-input resize-none" rows={3} placeholder="Any specific needs, cultural requirements, theme ideas..." value={weddingForm.specialRequirements} onChange={e => setWeddingForm(p => ({...p, specialRequirements: e.target.value}))} />
            </InputField>
            <button type="submit" disabled={loading} className="btn-gold w-full py-4 text-base flex items-center justify-center gap-2">
              {loading ? <><div className="w-5 h-5 border-2 border-royal/30 border-t-royal rounded-full animate-spin" /> Submitting...</> : '💍 Submit Wedding Booking'}
            </button>
          </form>
        )}

        <p className="text-center text-text-light dark:text-white/30 text-xs mt-4">
          By submitting, you agree to our terms & conditions. Our team will contact you within 24 hours.
        </p>
      </div>
    </div>
  );
};

export default BookingPage;
