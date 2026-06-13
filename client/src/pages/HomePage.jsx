import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { MdFlight, MdHotel, MdBeachAccess } from 'react-icons/md';
import { GiDiamondRing, GiFlowers } from 'react-icons/gi';
import { BsCameraVideo, BsPeopleFill } from 'react-icons/bs';
import { FaUtensils, FaTrophy, FaHeart } from 'react-icons/fa';

// Scroll reveal hook
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

// ===== HERO SECTION =====
const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      title: "Your Dream Journey Awaits",
      subtitle: "Explore the world's most breathtaking destinations with our curated travel packages",
      cta: "Explore Packages",
      ctaLink: "/travel",
      bg: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
      tag: "✈️ Travel Experiences"
    },
    {
      title: "Love Stories, Perfectly Told",
      subtitle: "Transform your wedding day into an unforgettable celebration of love and elegance",
      cta: "Plan Your Wedding",
      ctaLink: "/wedding",
      bg: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80",
      tag: "💍 Wedding Planning"
    },
    {
      title: "Honeymoon in Paradise",
      subtitle: "Begin your forever with the most romantic getaways handpicked for newlyweds",
      cta: "See Honeymoon Packages",
      ctaLink: "/travel",
      bg: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1600&q=80",
      tag: "🌺 Honeymoon Specials"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => setActiveSlide(prev => (prev + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-all duration-1000"
          style={{
            opacity: i === activeSlide ? 1 : 0,
            transform: i === activeSlide ? 'scale(1)' : 'scale(1.05)',
          }}
        >
          <img src={slide.bg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-royal-DEFAULT/90 via-royal-DEFAULT/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-royal-DEFAULT/50 via-transparent to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <div className="inline-block bg-gold-DEFAULT/20 border border-gold-DEFAULT/30 rounded-full px-4 py-1.5 text-gold-light text-sm mb-6 backdrop-blur-sm animate-fade-in">
              {slides[activeSlide].tag}
            </div>
            <h1 className="font-display text-5xl md:text-7xl text-white font-semibold leading-tight mb-6 animate-fade-in">
              {slides[activeSlide].title.split(' ').slice(0, -2).join(' ')}{' '}
              <span className="hero-text-gradient">{slides[activeSlide].title.split(' ').slice(-2).join(' ')}</span>
            </h1>
            <p className="font-body text-white/70 text-lg md:text-xl leading-relaxed mb-8 animate-fade-in">
              {slides[activeSlide].subtitle}
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in">
              <Link to={slides[activeSlide].ctaLink} className="btn-gold flex items-center gap-2 text-base">
                {slides[activeSlide].cta} <FiArrowRight />
              </Link>
              <Link to="/contact" className="btn-outline-gold flex items-center gap-2 text-base">
                Get Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`rounded-full transition-all duration-300 ${i === activeSlide ? 'w-8 h-2 bg-gold-DEFAULT' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`}
          />
        ))}
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-t-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: '5000+', label: 'Happy Travelers' },
              { num: '800+', label: 'Weddings Planned' },
              { num: '50+', label: 'Destinations' },
              { num: '9+', label: 'Years Experience' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-2xl md:text-3xl text-gold-DEFAULT font-bold">{stat.num}</div>
                <div className="text-white/60 text-xs md:text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ===== SERVICES OVERVIEW =====
const ServicesSection = () => {
  const services = [
    { icon: <MdFlight size={28} />, title: 'Flight Booking', desc: 'Best fares for domestic & international flights with instant confirmation', color: '#4A90D9', link: '/travel' },
    { icon: <MdHotel size={28} />, title: 'Hotel Booking', desc: 'Handpicked luxury resorts and boutique hotels worldwide', color: '#E74C8B', link: '/travel' },
    { icon: <MdBeachAccess size={28} />, title: 'Tour Packages', desc: 'All-inclusive packages with curated itineraries and expert guides', color: '#27AE8F', link: '/travel' },
    { icon: <GiDiamondRing size={28} />, title: 'Wedding Planning', desc: 'Complete wedding management from concept to perfect celebration', color: '#C9A84C', link: '/wedding' },
    { icon: <GiFlowers size={28} />, title: 'Decoration', desc: 'Stunning floral and theme decorations that set the perfect ambiance', color: '#9B59B6', link: '/wedding' },
    { icon: <FaUtensils size={28} />, title: 'Catering', desc: 'Exquisite culinary experiences with diverse menus for every taste', color: '#E67E22', link: '/wedding' },
    { icon: <BsCameraVideo size={28} />, title: 'Photography', desc: 'Professional photographers to capture every precious moment forever', color: '#E74C3C', link: '/wedding' },
    { icon: <FaHeart size={28} />, title: 'Honeymoon', desc: 'Romantic honeymoon packages to paradise destinations worldwide', color: '#FF6B8A', link: '/travel' },
  ];

  return (
    <section className="py-24 bg-cream dark:bg-royal-DEFAULT">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 scroll-reveal">
          <div className="section-tag mb-3">What We Offer</div>
          <h2 className="section-title">Complete Services for Every Occasion</h2>
          <p className="text-text-medium dark:text-white/60 mt-4 max-w-2xl mx-auto">
            From breathtaking travel experiences to the perfect wedding celebration — we handle every detail with expertise and passion.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <Link
              to={s.link}
              key={i}
              className="card-elegant p-6 group scroll-reveal"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: s.color + '20', color: s.color }}
              >
                {s.icon}
              </div>
              <h3 className="font-display text-xl font-semibold text-text-dark dark:text-white mb-2">{s.title}</h3>
              <p className="text-text-medium dark:text-white/60 text-sm leading-relaxed">{s.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-gold-DEFAULT text-sm font-medium group-hover:gap-2 transition-all">
                Learn more <FiArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// ===== FEATURED PACKAGES =====
const FeaturedPackages = () => {
  const packages = [
    {
      name: "Kerala Backwaters Bliss",
      destination: "Kerala, India",
      duration: "5D/4N",
      price: 28999,
      originalPrice: 35000,
      rating: 4.8,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80",
      badge: "Best Seller",
      highlights: ["Houseboat Stay", "Ayurveda Spa", "Tea Gardens"]
    },
    {
      name: "Bali Tropical Paradise",
      destination: "Bali, Indonesia",
      duration: "6D/5N",
      price: 65999,
      originalPrice: 80000,
      rating: 4.7,
      reviews: 312,
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
      badge: "Popular",
      highlights: ["Villa Stay", "Temple Tours", "Seafood Dinner"]
    },
    {
      name: "Rajasthan Royal Heritage",
      destination: "Rajasthan, India",
      duration: "7D/6N",
      price: 42999,
      originalPrice: 55000,
      rating: 4.9,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80",
      badge: "Premium",
      highlights: ["Palace Hotels", "Desert Safari", "Camel Ride"]
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-royal-purple/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12 scroll-reveal">
          <div>
            <div className="section-tag mb-3">Featured Packages</div>
            <h2 className="section-title">Top Travel Experiences</h2>
          </div>
          <Link to="/travel" className="hidden md:flex items-center gap-2 text-gold-DEFAULT hover:gap-3 transition-all text-sm font-medium">
            View all packages <FiArrowRight />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <div key={i} className="card-elegant overflow-hidden group scroll-reveal" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="relative h-52 overflow-hidden">
                <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="badge-gold">{pkg.badge}</span>
                </div>
                <div className="absolute bottom-3 left-3 text-white text-sm bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
                  ⏱ {pkg.duration}
                </div>
              </div>
              <div className="p-5">
                <div className="text-text-medium dark:text-white/50 text-xs mb-1">📍 {pkg.destination}</div>
                <h3 className="font-display text-xl font-semibold text-text-dark dark:text-white mb-2">{pkg.name}</h3>
                <div className="flex flex-wrap gap-1 mb-3">
                  {pkg.highlights.map((h, j) => (
                    <span key={j} className="text-xs bg-gold-DEFAULT/10 text-gold-dark dark:text-gold-light rounded-full px-2 py-0.5">{h}</span>
                  ))}
                </div>
                <div className="flex items-center gap-1 mb-4">
                  <FiStar className="text-gold-DEFAULT fill-gold-DEFAULT" size={14} />
                  <span className="text-sm font-semibold text-text-dark dark:text-white">{pkg.rating}</span>
                  <span className="text-text-medium dark:text-white/40 text-xs">({pkg.reviews} reviews)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="price-tag">₹{pkg.price.toLocaleString()}</div>
                    <div className="text-text-medium dark:text-white/40 text-xs line-through">₹{pkg.originalPrice.toLocaleString()}</div>
                  </div>
                  <Link to="/booking" className="btn-gold text-sm px-4 py-2">Book Now</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8 md:hidden">
          <Link to="/travel" className="btn-outline-gold">View All Packages</Link>
        </div>
      </div>
    </section>
  );
};

// ===== GALLERY PREVIEW =====
const GalleryPreview = () => {
  const [modalImg, setModalImg] = useState(null);
  const images = [
    { url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80", cat: "Wedding" },
    { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", cat: "Travel" },
    { url: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=80", cat: "Honeymoon" },
    { url: "https://images.unsplash.com/photo-1583939411023-14783179e581?w=600&q=80", cat: "Wedding" },
    { url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", cat: "Travel" },
    { url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80", cat: "Kerala" },
  ];

  return (
    <section className="py-24 bg-cream dark:bg-royal-DEFAULT">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 scroll-reveal">
          <div className="section-tag mb-3">Our Gallery</div>
          <h2 className="section-title">Moments We've Crafted</h2>
          <p className="text-text-medium dark:text-white/60 mt-4">Click on any image to view in full</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className={`gallery-item scroll-reveal ${i === 0 || i === 3 ? 'md:row-span-2' : ''}`}
              style={{ height: i === 0 || i === 3 ? 'auto' : '200px', animationDelay: `${i * 0.1}s` }}
              onClick={() => setModalImg(img)}
            >
              <div className="relative h-full min-h-[200px] rounded-xl overflow-hidden group">
                <img src={img.url} alt={img.cat} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" style={{ minHeight: '200px' }} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all">
                  <span className="badge-gold text-xs">{img.cat}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalImg && (
        <div className="modal-overlay" onClick={() => setModalImg(null)}>
          <div className="relative max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>
            <img src={modalImg.url} alt="" className="w-full rounded-xl" />
            <button
              onClick={() => setModalImg(null)}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-white/30"
            >
              ✕
            </button>
            <div className="absolute bottom-4 left-4">
              <span className="badge-gold">{modalImg.cat}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// ===== TESTIMONIALS =====
const Testimonials = () => {
  const [active, setActive] = useState(0);
  const testimonials = [
    {
      name: "Priya & Rahul Sharma",
      role: "Honeymooners — Bali",
      text: "Adyant Travells made our honeymoon absolutely magical! Every detail was perfect — from the villa booking to the sunset dinner arrangements. We couldn't have asked for more.",
      rating: 5,
      avatar: "PR"
    },
    {
      name: "Anjali & Vikram Singh",
      role: "Wedding Clients — Jaipur",
      text: "Our wedding was beyond our dreams! The decoration team was phenomenal and the catering was top-notch. Every guest was amazed by the arrangements. Thank you Adyant!",
      rating: 5,
      avatar: "AV"
    },
    {
      name: "Rohit Gupta",
      role: "Solo Traveler — Kerala",
      text: "The Kerala package was worth every penny. Seamless arrangements, the houseboat experience was surreal, and the Adyant team was always available for any assistance.",
      rating: 5,
      avatar: "RG"
    },
    {
      name: "Meera & Suresh Patel",
      role: "Family Trip — Rajasthan",
      text: "Traveled with family of 8. Adyant handled everything perfectly — hotel bookings, transport, guided tours. The team's attention to detail made it stress-free and memorable!",
      rating: 5,
      avatar: "MP"
    }
  ];

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % testimonials.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-24" style={{ background: 'var(--gradient-royal)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 scroll-reveal">
          <div className="section-tag mb-3 !text-gold-light">Happy Clients</div>
          <h2 className="section-title !text-white">What Our Clients Say</h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="testimonial-card scroll-reveal">
            <div className="flex mb-4">
              {[...Array(testimonials[active].rating)].map((_, i) => (
                <FiStar key={i} className="text-gold-DEFAULT fill-gold-DEFAULT" size={18} />
              ))}
            </div>
            <p className="font-display text-xl md:text-2xl text-text-dark dark:text-white leading-relaxed mb-6 italic">
              "{testimonials[active].text}"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center text-royal font-bold font-body">
                {testimonials[active].avatar}
              </div>
              <div>
                <div className="font-semibold text-text-dark dark:text-white">{testimonials[active].name}</div>
                <div className="text-gold-DEFAULT text-sm">{testimonials[active].role}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${i === active ? 'w-8 h-2 bg-gold-DEFAULT' : 'w-2 h-2 bg-white/30 hover:bg-white/60'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ===== FAQ SECTION =====
const FAQ = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const faqs = [
    { q: "How do I book a tour package?", a: "Simply visit our Booking page, select your preferred service type (Travel/Wedding), fill in your details and requirements, and submit. Our team will contact you within 24 hours to confirm and finalize your booking." },
    { q: "Are the prices per person or per package?", a: "Tour package prices are typically per person unless stated otherwise. Wedding packages are priced for the entire event. We offer customized quotes based on your specific requirements and group size." },
    { q: "What payment methods do you accept?", a: "We accept all major payment methods including UPI, net banking, credit/debit cards, and bank transfers. A 30% advance is required to confirm any booking." },
    { q: "Can I customize my travel or wedding package?", a: "Absolutely! All our packages are fully customizable. Share your preferences, budget, and special requirements, and our team will create a tailor-made plan just for you." },
    { q: "What is your cancellation policy?", a: "Cancellations made 30+ days before the event get a full refund minus processing fees. 15-30 days: 50% refund. Under 15 days: no refund. Special circumstances are handled case-by-case." },
    { q: "Do you handle destination weddings?", a: "Yes! We specialize in destination weddings across India and international locations including Bali, Thailand, Maldives, and Europe. Our team coordinates all logistics seamlessly." }
  ];

  return (
    <section className="py-24 bg-white dark:bg-royal-purple/20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12 scroll-reveal">
          <div className="section-tag mb-3">FAQ</div>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="card-elegant overflow-hidden scroll-reveal" style={{ animationDelay: `${i * 0.08}s` }}>
              <button
                className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-semibold text-text-dark dark:text-white text-sm md:text-base">{faq.q}</span>
                <span className={`text-gold-DEFAULT text-xl flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4 text-text-medium dark:text-white/60 text-sm leading-relaxed border-t border-gold-DEFAULT/10 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ===== CTA SECTION =====
const CTASection = () => (
  <section className="py-20 bg-gold-gradient">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <div className="font-script text-royal/70 text-2xl mb-2">Begin Your Story</div>
      <h2 className="font-display text-4xl md:text-5xl text-royal font-semibold mb-4">
        Let's Create Memories Together
      </h2>
      <p className="text-royal/70 text-lg mb-8 max-w-2xl mx-auto">
        Whether it's your dream vacation or the perfect wedding — we're here to make every moment extraordinary.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/booking" className="bg-royal-DEFAULT text-gold-DEFAULT px-8 py-4 rounded-xl font-semibold hover:bg-royal-purple transition-all">
          Book Free Consultation
        </Link>
        <a href="tel:+919876543210" className="bg-white/30 text-royal px-8 py-4 rounded-xl font-semibold hover:bg-white/50 transition-all">
          📞 Call Us Now
        </a>
      </div>
    </div>
  </section>
);

// ===== MAIN COMPONENT =====
const HomePage = () => {
  useScrollReveal();

  return (
    <>
      <Hero />
      <ServicesSection />
      <FeaturedPackages />
      <GalleryPreview />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  );
};

export default HomePage;
