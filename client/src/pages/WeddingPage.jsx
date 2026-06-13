import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiX, FiStar } from 'react-icons/fi';
import { GiDiamondRing, GiFlowers } from 'react-icons/gi';
import { BsCameraVideo } from 'react-icons/bs';
import { FaUtensils, FaPaintBrush, FaMapMarkedAlt } from 'react-icons/fa';

const WeddingPage = () => {
  const [modalImg, setModalImg] = useState(null);

  const services = [
    { icon: <FaMapMarkedAlt size={30} />, title: 'Venue Booking', desc: 'From grand palace hotels to intimate garden settings — we have venues for every style and budget.', color: '#C9A84C', features: ['5-star hotels', 'Heritage venues', 'Beach & garden', 'Banquet halls'] },
    { icon: <GiFlowers size={30} />, title: 'Decoration', desc: 'Transform any space into a breathtaking wedding wonderland with our award-winning decoration team.', color: '#E74C8B', features: ['Floral arrangements', 'LED setups', 'Theme decoration', 'Mandap design'] },
    { icon: <FaUtensils size={30} />, title: 'Catering', desc: 'Delight your guests with an extraordinary culinary experience featuring diverse cuisines.', color: '#27AE8F', features: ['Multi-cuisine menu', 'Live counters', '5-star chefs', 'Custom menu'] },
    { icon: <BsCameraVideo size={30} />, title: 'Photography', desc: 'Capture every precious moment with our professional photographers and cinematographers.', color: '#9B59B6', features: ['HD photography', 'Cinematic video', 'Drone shots', 'Same-day edit'] },
    { icon: <FaPaintBrush size={30} />, title: 'Bridal Makeup', desc: 'Look absolutely stunning with our expert bridal makeup artists and hairstylists.', color: '#E67E22', features: ['Bridal makeup', 'Hair styling', 'Pre-bridal care', 'Groom grooming'] },
    { icon: <GiDiamondRing size={30} />, title: 'Complete Planning', desc: 'Sit back and relax as our dedicated wedding planners handle every single detail for you.', color: '#C9A84C', features: ['Event coordination', 'Vendor management', 'Guest management', 'Day-of coordination'] },
  ];

  const packages = [
    {
      name: 'Silver Bliss',
      price: 250000,
      priceDisplay: '₹2.5 Lakh',
      subtitle: 'Perfect start for intimate weddings',
      color: '#C0C0C0',
      popular: false,
      features: ['Venue for 200 guests', 'Basic floral decoration', 'Photography (8 hrs)', 'Vegetarian catering', 'Bridal makeup', 'Wedding coordination', 'Basic sound system'],
      excluded: ['Videography', 'Pre-wedding shoot', 'DJ & Entertainment', 'Honeymoon package']
    },
    {
      name: 'Golden Dreams',
      price: 550000,
      priceDisplay: '₹5.5 Lakh',
      subtitle: 'Our most popular complete package',
      color: '#FFD700',
      popular: true,
      features: ['Venue for 500 guests', 'Premium theme decoration', 'Photography + Videography', 'Veg & non-veg catering', 'Celebrity-style makeup', 'Groom grooming', 'DJ & Entertainment', 'Mehendi ceremony', 'Pre-wedding photoshoot', 'Dedicated wedding planner', 'Luxury car rental'],
      excluded: ['Honeymoon package', 'Destination venue']
    },
    {
      name: 'Platinum Royale',
      price: 1200000,
      priceDisplay: '₹12 Lakh',
      subtitle: 'The ultimate luxury wedding experience',
      color: '#E5E4E2',
      popular: false,
      features: ['Venue for 1000+ guests', 'Grand luxury decoration', 'Cinematic photography & video', '5-star catering + live stations', 'Celebrity-grade bridal makeup', 'Complete groom styling', 'Live band + DJ', 'All ceremonies covered', 'Luxury car fleet', 'Drone photography', 'Honeymoon package', '24/7 planner team'],
      excluded: []
    }
  ];

  const portfolio = [
    { url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80", cap: "Royal Palace Wedding" },
    { url: "https://images.unsplash.com/photo-1583939411023-14783179e581?w=600&q=80", cap: "Garden Ceremony" },
    { url: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80", cap: "Floral Decoration" },
    { url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80", cap: "Destination Wedding" },
    { url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80", cap: "Reception Night" },
    { url: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&q=80", cap: "Mehendi Ceremony" },
  ];

  return (
    <div className="pt-20 min-h-screen bg-cream dark:bg-royal-DEFAULT">
      {/* Hero */}
      <div className="relative h-80 md:h-[28rem] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-royal-DEFAULT/90 to-royal-DEFAULT/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <div className="font-script text-gold-light text-2xl mb-2">Your Perfect Day</div>
          <h1 className="font-display text-4xl md:text-6xl text-white font-semibold mb-4">Wedding Planning Excellence</h1>
          <p className="text-white/70 text-lg max-w-2xl mb-8">We turn your wedding dreams into breathtaking reality with meticulous attention to every detail</p>
          <Link to="/booking" className="btn-gold text-base px-8 py-3">Plan My Wedding →</Link>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gold-gradient py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: '800+', label: 'Weddings Planned' },
              { num: '50+', label: 'Expert Team Members' },
              { num: '4.9★', label: 'Average Rating' },
              { num: '9+', label: 'Years of Excellence' }
            ].map((s, i) => (
              <div key={i}>
                <div className="font-display text-3xl font-bold text-royal">{s.num}</div>
                <div className="text-royal/70 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <div className="section-tag mb-3">Our Services</div>
          <h2 className="section-title">Complete Wedding Solutions</h2>
          <p className="text-text-medium dark:text-white/60 mt-4 max-w-2xl mx-auto">
            Every service you need for your dream wedding, delivered by experienced professionals
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="card-elegant p-6 group">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ backgroundColor: s.color + '15', color: s.color }}>
                {s.icon}
              </div>
              <h3 className="font-display text-2xl font-semibold text-text-dark dark:text-white mb-2">{s.title}</h3>
              <p className="text-text-medium dark:text-white/60 text-sm mb-4">{s.desc}</p>
              <ul className="space-y-1">
                {s.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-text-medium dark:text-white/60">
                    <FiCheck className="text-gold-DEFAULT flex-shrink-0" size={13} /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/booking" className="mt-5 inline-flex items-center gap-1 text-gold-DEFAULT text-sm font-medium hover:gap-2 transition-all">
                Book Service →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Packages */}
      <div className="py-20 bg-royal-gradient">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="section-tag !text-gold-light mb-3">Pricing</div>
            <h2 className="section-title !text-white">Wedding Packages</h2>
            <p className="text-white/60 mt-4">Transparent pricing for every dream and budget</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {packages.map((pkg, i) => (
              <div key={i} className={`rounded-2xl overflow-hidden bg-white/5 backdrop-blur border ${pkg.popular ? 'border-gold-DEFAULT scale-105' : 'border-white/10'} relative`}>
                {pkg.popular && (
                  <div className="bg-gold-gradient text-royal text-xs font-bold text-center py-2 tracking-wider">
                    ⭐ MOST POPULAR
                  </div>
                )}
                <div className="p-8">
                  <div className="font-script text-3xl mb-1" style={{ color: pkg.color }}>{pkg.name}</div>
                  <p className="text-white/50 text-sm mb-4">{pkg.subtitle}</p>
                  <div className="mb-6">
                    <div className="font-display text-4xl font-bold text-white">{pkg.priceDisplay}</div>
                    <div className="text-white/40 text-sm">starting price</div>
                  </div>
                  <div className="space-y-2 mb-6">
                    {pkg.features.map((f, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm text-white/70">
                        <FiCheck className="text-green-400 mt-0.5 flex-shrink-0" size={13} /> {f}
                      </div>
                    ))}
                    {pkg.excluded.map((f, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm text-white/30">
                        <FiX className="text-red-400/50 mt-0.5 flex-shrink-0" size={13} /> {f}
                      </div>
                    ))}
                  </div>
                  <Link to="/booking" state={{ service: 'wedding', package: pkg.name }} className={`w-full block text-center py-3 rounded-lg font-semibold transition-all ${pkg.popular ? 'bg-gold-gradient text-royal hover:opacity-90' : 'border border-white/20 text-white hover:border-gold-DEFAULT hover:text-gold-DEFAULT'}`}>
                    Choose {pkg.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-white/40 text-sm mt-8">* All packages are customizable. Contact us for a personalized quote.</p>
        </div>
      </div>

      {/* Portfolio Gallery */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="section-tag mb-3">Portfolio</div>
          <h2 className="section-title">Wedding Gallery</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {portfolio.map((img, i) => (
            <div key={i} className="gallery-item group relative rounded-xl overflow-hidden h-48 md:h-64 cursor-pointer" onClick={() => setModalImg(img)}>
              <img src={img.url} alt={img.cap} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-end p-4">
                <span className="opacity-0 group-hover:opacity-100 transition-all badge-gold">{img.cap}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-gold-gradient rounded-2xl p-12 text-center">
          <div className="font-script text-3xl text-royal/70 mb-2">Begin Your Journey Together</div>
          <h3 className="font-display text-4xl text-royal font-semibold mb-4">Ready to Plan Your Dream Wedding?</h3>
          <p className="text-royal/70 text-lg mb-8 max-w-2xl mx-auto">Schedule a free consultation with our wedding expert and let's start creating magic</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/booking" className="bg-royal-DEFAULT text-gold-DEFAULT px-8 py-4 rounded-xl font-semibold hover:bg-royal-purple transition-all">
              Book Free Consultation
            </Link>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="bg-white/30 text-royal px-8 py-4 rounded-xl font-semibold hover:bg-white/50 transition-all">
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalImg && (
        <div className="modal-overlay" onClick={() => setModalImg(null)}>
          <div className="relative max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>
            <img src={modalImg.url} alt="" className="w-full rounded-xl" />
            <button onClick={() => setModalImg(null)} className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-white/30">✕</button>
            <div className="absolute bottom-4 left-4 badge-gold">{modalImg.cap}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeddingPage;
