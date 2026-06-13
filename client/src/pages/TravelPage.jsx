import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiStar, FiArrowRight, FiSearch, FiFilter } from 'react-icons/fi';
import { MdFlight, MdHotel } from 'react-icons/md';

const TravelPage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('packages');
  const [filters, setFilters] = useState({ category: 'all', search: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPackages();
  }, []);

  useEffect(() => {
    fetchPackages();
  }, [filters]);

  const fetchPackages = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.category !== 'all') params.set('category', filters.category);
      if (filters.search) params.set('search', filters.search);
      const res = await axios.get(`/api/services/travel-packages?${params}`);
      setPackages(res.data.packages || []);
    } catch {
      // Demo data if API unavailable
      setPackages([
        { id:1, name:"Kerala Backwaters Bliss", destination:"Kerala, India", duration:"5 Days / 4 Nights", price:28999, originalPrice:35000, rating:4.8, reviews:234, category:"domestic", highlights:["Houseboat Stay","Ayurveda Spa","Tea Gardens"], image:"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80", badge:"Best Seller" },
        { id:2, name:"Rajasthan Royal Heritage", destination:"Rajasthan, India", duration:"7 Days / 6 Nights", price:42999, originalPrice:55000, rating:4.9, reviews:189, category:"domestic", highlights:["Palace Hotels","Desert Safari","Camel Ride"], image:"https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80", badge:"Premium" },
        { id:3, name:"Bali Tropical Paradise", destination:"Bali, Indonesia", duration:"6 Days / 5 Nights", price:65999, originalPrice:80000, rating:4.7, reviews:312, category:"international", highlights:["Villa Stay","Temple Tours","Seafood Dinner"], image:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80", badge:"Popular" },
        { id:4, name:"Switzerland Alps Adventure", destination:"Switzerland, Europe", duration:"8 Days / 7 Nights", price:145999, originalPrice:175000, rating:4.9, reviews:156, category:"international", highlights:["Jungfraujoch","Lake Geneva","Chocolate Tour"], image:"https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&q=80", badge:"Luxury" },
        { id:5, name:"Goa Beach Getaway", destination:"Goa, India", duration:"4 Days / 3 Nights", price:18999, originalPrice:24000, rating:4.6, reviews:445, category:"domestic", highlights:["Beach Resort","Water Sports","Night Markets"], image:"https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80", badge:"Budget Friendly" },
        { id:6, name:"Dubai Luxury Experience", destination:"Dubai, UAE", duration:"5 Days / 4 Nights", price:89999, originalPrice:110000, rating:4.8, reviews:267, category:"international", highlights:["Burj Khalifa","Desert Safari","Dhow Cruise"], image:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", badge:"Trending" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const hotels = [
    { name:"Taj Lake Palace", location:"Udaipur, India", stars:5, price:18000, night:true, image:"https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80", amenities:["Pool","Spa","Fine Dining","Lake View"] },
    { name:"Anantara Bali", location:"Seminyak, Bali", stars:5, price:12500, night:true, image:"https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80", amenities:["Infinity Pool","Beach","Butler","Yoga"] },
    { name:"The Leela Palace", location:"New Delhi, India", stars:5, price:22000, night:true, image:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80", amenities:["Pool","Spa","Multiple Restaurants","Gym"] },
  ];

  return (
    <div className="pt-20 min-h-screen bg-cream dark:bg-royal-DEFAULT">
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-royal-DEFAULT/75" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="section-tag !text-gold-light mb-3">✈️ Travel Services</div>
          <h1 className="font-display text-4xl md:text-6xl text-white font-semibold mb-4">Discover the World with Us</h1>
          <p className="text-white/70 text-lg max-w-2xl">Handcrafted travel experiences for every kind of adventurer</p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white dark:bg-royal-purple/30 rounded-2xl p-6 shadow-lg border border-gold-DEFAULT/10">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-60 relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" size={18} />
              <input
                type="text"
                placeholder="Search destinations..."
                className="form-input pl-10"
                value={filters.search}
                onChange={e => setFilters(p => ({ ...p, search: e.target.value }))}
              />
            </div>
            <div className="flex gap-2">
              {['all', 'domestic', 'international'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilters(p => ({ ...p, category: cat }))}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize
                    ${filters.category === cat ? 'bg-gold-DEFAULT text-royal font-semibold' : 'bg-gray-100 dark:bg-white/10 text-text-medium dark:text-white/60 hover:bg-gold-DEFAULT/20'}`}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mt-8 mb-6 border-b border-gold-DEFAULT/20">
          {[{ id: 'packages', label: 'Tour Packages' }, { id: 'hotels', label: 'Hotels' }, { id: 'flights', label: 'Flights' }].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-2 text-sm font-semibold transition-all border-b-2 -mb-px
                ${activeTab === tab.id ? 'border-gold-DEFAULT text-gold-DEFAULT' : 'border-transparent text-text-medium dark:text-white/50 hover:text-gold-DEFAULT'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* PACKAGES TAB */}
        {activeTab === 'packages' && (
          <div>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1,2,3].map(i => (
                  <div key={i} className="card-elegant overflow-hidden animate-pulse">
                    <div className="h-52 bg-gray-200 dark:bg-white/10" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg, i) => (
                  <div key={pkg.id || i} className="card-elegant overflow-hidden group">
                    <div className="relative h-52 overflow-hidden">
                      <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {pkg.badge && <span className="absolute top-3 left-3 badge-gold">{pkg.badge}</span>}
                      <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">{pkg.duration}</span>
                    </div>
                    <div className="p-5">
                      <div className="text-text-medium dark:text-white/50 text-xs mb-1">📍 {pkg.destination}</div>
                      <h3 className="font-display text-xl font-semibold text-text-dark dark:text-white mb-2">{pkg.name}</h3>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {(pkg.highlights || []).slice(0,3).map((h, j) => (
                          <span key={j} className="text-xs bg-gold-DEFAULT/10 text-gold-dark dark:text-gold-light rounded-full px-2 py-0.5">{h}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 mb-4">
                        <FiStar className="text-gold-DEFAULT fill-gold-DEFAULT" size={13} />
                        <span className="text-sm font-semibold text-text-dark dark:text-white">{pkg.rating}</span>
                        <span className="text-text-medium dark:text-white/40 text-xs">({pkg.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="price-tag text-2xl">₹{Number(pkg.price).toLocaleString()}</div>
                          <div className="text-text-medium dark:text-white/40 text-xs line-through">₹{Number(pkg.originalPrice).toLocaleString()}</div>
                        </div>
                        <Link to="/booking" state={{ service: 'travel', package: pkg.name }} className="btn-gold text-sm px-4 py-2">Book Now</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* HOTELS TAB */}
        {activeTab === 'hotels' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hotels.map((hotel, i) => (
              <div key={i} className="card-elegant overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-3 right-3 bg-gold-DEFAULT text-royal text-xs font-bold px-2 py-1 rounded">
                    {'⭐'.repeat(hotel.stars)}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-semibold text-text-dark dark:text-white mb-1">{hotel.name}</h3>
                  <p className="text-text-medium dark:text-white/50 text-sm mb-3">📍 {hotel.location}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {hotel.amenities.map((a, j) => <span key={j} className="text-xs bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 rounded-full px-2 py-0.5">{a}</span>)}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="price-tag text-2xl">₹{hotel.price.toLocaleString()}</div>
                      <div className="text-text-medium dark:text-white/40 text-xs">per night</div>
                    </div>
                    <Link to="/booking" className="btn-gold text-sm px-4 py-2">Book Room</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FLIGHTS TAB */}
        {activeTab === 'flights' && (
          <div className="max-w-2xl mx-auto">
            <div className="card-elegant p-8">
              <div className="flex items-center gap-3 mb-6">
                <MdFlight className="text-gold-DEFAULT" size={28} />
                <h3 className="font-display text-2xl font-semibold text-text-dark dark:text-white">Search Flights</h3>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-text-medium dark:text-white/60 text-sm mb-1 block">From</label>
                    <input type="text" placeholder="Departure city" className="form-input" defaultValue="Delhi (DEL)" />
                  </div>
                  <div>
                    <label className="text-text-medium dark:text-white/60 text-sm mb-1 block">To</label>
                    <input type="text" placeholder="Arrival city" className="form-input" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-text-medium dark:text-white/60 text-sm mb-1 block">Departure Date</label>
                    <input type="date" className="form-input" />
                  </div>
                  <div>
                    <label className="text-text-medium dark:text-white/60 text-sm mb-1 block">Return Date</label>
                    <input type="date" className="form-input" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-text-medium dark:text-white/60 text-sm mb-1 block">Passengers</label>
                    <select className="form-input">
                      {[1,2,3,4,5,6].map(n => <option key={n}>{n} Passenger{n > 1 ? 's' : ''}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-text-medium dark:text-white/60 text-sm mb-1 block">Class</label>
                    <select className="form-input">
                      <option>Economy</option>
                      <option>Business</option>
                      <option>First Class</option>
                    </select>
                  </div>
                </div>
                <Link to="/booking" className="btn-gold w-full text-center block py-3 text-base">
                  Search Flights →
                </Link>
                <p className="text-text-light dark:text-white/30 text-xs text-center">Our team will find the best rates and confirm within 2 hours</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <div className="bg-royal-gradient rounded-2xl p-10">
          <h3 className="font-display text-3xl text-white font-semibold mb-3">Can't Find What You're Looking For?</h3>
          <p className="text-white/60 mb-6">Tell us your dream destination and we'll craft a custom package just for you</p>
          <Link to="/contact" className="btn-gold text-base px-8 py-3">Request Custom Package</Link>
        </div>
      </div>
    </div>
  );
};

export default TravelPage;
