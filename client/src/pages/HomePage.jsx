import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiArrowRight, FiChevronLeft, FiChevronRight, FiMapPin, FiClock, FiUsers } from 'react-icons/fi';
import { MdFlight, MdHotel, MdBeachAccess } from 'react-icons/md';
import { GiDiamondRing, GiFlowers } from 'react-icons/gi';
import { BsCameraVideo, BsPeopleFill } from 'react-icons/bs';
import { FaUtensils, FaTrophy, FaHeart, FaQuoteLeft } from 'react-icons/fa';

// ── Scroll reveal ──────────────────────────────────────────
const useScrollReveal = () => {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.sr').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
};

// ── Inline styles (design tokens) ─────────────────────────
const T = {
  indigo:     '#1A1060',
  indigoDeep: '#0D0830',
  indigoMid:  '#2D2080',
  cyan:       '#00C6C2',
  cyanLight:  '#4DEFF0',
  cyanDim:    'rgba(0,198,194,0.15)',
  rose:       '#C8956B',
  roseLight:  '#E8B890',
  roseDim:    'rgba(200,149,107,0.15)',
  roseGold:   'linear-gradient(135deg,#E8B890 0%,#C8956B 50%,#A0714A 100%)',
  white:      '#FFFFFF',
  offWhite:   '#F8F6FF',
  card:       'rgba(255,255,255,0.05)',
  cardBorder: 'rgba(255,255,255,0.10)',
  textDim:    'rgba(255,255,255,0.55)',
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');

  .sr { opacity:0; transform:translateY(28px); transition:opacity 0.65s ease, transform 0.65s ease; }
  .sr.visible { opacity:1; transform:translateY(0); }

  .slide-fade { transition:opacity 0.9s ease, transform 0.9s ease; }

  .pkg-card:hover .pkg-img { transform:scale(1.07); }
  .pkg-card:hover { box-shadow:0 20px 60px rgba(0,198,194,0.18); border-color:rgba(0,198,194,0.35) !important; }

  .svc-card:hover { border-color:rgba(0,198,194,0.4) !important; background:rgba(0,198,194,0.06) !important; }
  .svc-card:hover .svc-icon { transform:scale(1.12); }

  .btn-cyan {
    background:linear-gradient(135deg,#00C6C2,#009E9B);
    color:#0D0830; font-weight:600; padding:13px 28px;
    border-radius:12px; border:none; cursor:pointer;
    font-family:'Inter',sans-serif; font-size:15px;
    transition:transform 0.2s, box-shadow 0.2s;
    display:inline-flex; align-items:center; gap:8px;
    text-decoration:none;
  }
  .btn-cyan:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(0,198,194,0.40); }

  .btn-outline {
    background:transparent;
    color:#fff; font-weight:500; padding:12px 28px;
    border-radius:12px; border:1.5px solid rgba(255,255,255,0.30);
    cursor:pointer; font-family:'Inter',sans-serif; font-size:15px;
    transition:border-color 0.2s, background 0.2s;
    display:inline-flex; align-items:center; gap:8px;
    text-decoration:none;
  }
  .btn-outline:hover { border-color:rgba(0,198,194,0.6); background:rgba(0,198,194,0.08); }

  .btn-rose {
    background:linear-gradient(135deg,#E8B890,#C8956B);
    color:#1A1060; font-weight:600; padding:13px 28px;
    border-radius:12px; border:none; cursor:pointer;
    font-family:'Inter',sans-serif; font-size:15px;
    transition:transform 0.2s, box-shadow 0.2s;
    display:inline-flex; align-items:center; gap:8px;
    text-decoration:none;
  }
  .btn-rose:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(200,149,107,0.45); }

  .faq-item button:hover { background:rgba(0,198,194,0.05); }

  .testimonial-dot { width:8px; height:8px; border-radius:50%; background:rgba(255,255,255,0.25); border:none; cursor:pointer; transition:all 0.3s; }
  .testimonial-dot.active { width:28px; border-radius:4px; background:#00C6C2; }

  .slide-dot { width:8px; height:8px; border-radius:50%; background:rgba(255,255,255,0.30); border:none; cursor:pointer; transition:all 0.3s; }
  .slide-dot.active { width:28px; border-radius:4px; background:#00C6C2; }

  .gallery-img { transition:transform 0.5s ease; }
  .gallery-item:hover .gallery-img { transform:scale(1.08); }
  .gallery-item:hover .gallery-badge { opacity:1 !important; }
`;

// ── HERO ───────────────────────────────────────────────────
const Hero = () => {
  const [active, setActive] = useState(0);
  const slides = [
    {
      title: ['Your Dream', 'Journey Awaits'],
      sub: 'Explore breathtaking destinations with handcrafted travel packages and expert local guidance.',
      cta: 'Explore Packages', ctaLink: '/travel',
      bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80',
      eyebrow: '✈  Travel Experiences',
    },
    {
      title: ['Love Stories,', 'Perfectly Told'],
      sub: 'Transform your wedding into an unforgettable celebration of elegance and heartfelt moments.',
      cta: 'Plan Your Wedding', ctaLink: '/wedding',
      bg: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80',
      eyebrow: '💍  Wedding Planning',
    },
    {
      title: ['Honeymoon', 'in Paradise'],
      sub: 'Begin your forever with the most romantic getaways, handpicked for newlyweds.',
      cta: 'See Honeymoon Packages', ctaLink: '/travel',
      bg: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1600&q=80',
      eyebrow: '🌺  Honeymoon Specials',
    },
  ];

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ position:'relative', height:'100vh', minHeight:620, overflow:'hidden' }}>
      <style>{globalStyles}</style>

      {/* Slide backgrounds */}
      {slides.map((s, i) => (
        <div key={i} className="slide-fade" style={{
          position:'absolute', inset:0,
          opacity: i === active ? 1 : 0,
          transform: i === active ? 'scale(1)' : 'scale(1.04)',
          zIndex:1,
        }}>
          <img src={s.bg} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(100deg,rgba(13,8,48,0.92) 0%,rgba(13,8,48,0.65) 55%,rgba(13,8,48,0.20) 100%)' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(13,8,48,0.70) 0%,transparent 50%)' }} />
        </div>
      ))}

      {/* Content */}
      <div style={{ position:'relative', zIndex:10, display:'flex', alignItems:'center', height:'100%' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 32px', width:'100%' }}>
          <div style={{ maxWidth:640 }}>
            {/* Eyebrow */}
            <div style={{
              display:'inline-flex', alignItems:'center', gap:8,
              background:'rgba(0,198,194,0.15)', border:'1px solid rgba(0,198,194,0.35)',
              borderRadius:999, padding:'7px 18px', marginBottom:24,
              color: T.cyanLight, fontSize:13, fontFamily:'Inter,sans-serif', fontWeight:500,
              backdropFilter:'blur(8px)',
            }}>
              {slides[active].eyebrow}
            </div>

            {/* Title */}
            <h1 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(42px,6vw,78px)', fontWeight:600, lineHeight:1.08, marginBottom:20, color:'#fff' }}>
              {slides[active].title[0]}{' '}
              <span style={{ background:'linear-gradient(135deg,#E8B890,#C8956B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                {slides[active].title[1]}
              </span>
            </h1>

            {/* Sub */}
            <p style={{ fontFamily:'Inter,sans-serif', fontSize:17, color:'rgba(255,255,255,0.68)', lineHeight:1.7, marginBottom:36, maxWidth:520 }}>
              {slides[active].sub}
            </p>

            {/* CTAs */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:14 }}>
              <Link to={slides[active].ctaLink} className="btn-cyan">
                {slides[active].cta} <FiArrowRight />
              </Link>
              <Link to="/contact" className="btn-outline">
                Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide dots */}
      <div style={{ position:'absolute', bottom:140, left:'50%', transform:'translateX(-50%)', zIndex:10, display:'flex', gap:8 }}>
        {slides.map((_, i) => (
          <button key={i} className={`slide-dot${i===active?' active':''}`} onClick={() => setActive(i)} />
        ))}
      </div>

      {/* Stats bar */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, zIndex:10 }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 32px' }}>
          <div style={{
            background:'rgba(13,8,48,0.75)', backdropFilter:'blur(20px)',
            border:'1px solid rgba(255,255,255,0.10)', borderBottom:'none',
            borderRadius:'16px 16px 0 0', padding:'20px 40px',
            display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16,
          }}>
            {[
              { num:'5,000+', label:'Happy Travelers' },
              { num:'800+',   label:'Weddings Planned' },
              { num:'50+',    label:'Destinations' },
              { num:'9+',     label:'Years of Excellence' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign:'center' }}>
                <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:28, fontWeight:600, color: T.cyan, lineHeight:1 }}>{s.num}</div>
                <div style={{ fontFamily:'Inter,sans-serif', fontSize:12, color:'rgba(255,255,255,0.50)', marginTop:4, letterSpacing:'0.04em' }}>{s.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ── SERVICES ───────────────────────────────────────────────
const Services = () => {
  const services = [
    { icon:<MdFlight size={26}/>,        title:'Flight Booking',   desc:'Best fares for domestic & international flights with instant confirmation.',    accent:'#00C6C2', link:'/travel' },
    { icon:<MdHotel size={26}/>,         title:'Hotel Booking',    desc:'Handpicked luxury resorts and boutique hotels worldwide.',                       accent:'#E8B890', link:'/travel' },
    { icon:<MdBeachAccess size={26}/>,   title:'Tour Packages',    desc:'All-inclusive itineraries with expert guides and curated experiences.',           accent:'#00C6C2', link:'/travel' },
    { icon:<GiDiamondRing size={26}/>,   title:'Wedding Planning', desc:'End-to-end wedding management — concept to celebration.',                        accent:'#E8B890', link:'/wedding' },
    { icon:<GiFlowers size={26}/>,       title:'Decoration',       desc:'Stunning floral and thematic décor that sets the perfect ambiance.',             accent:'#00C6C2', link:'/wedding' },
    { icon:<FaUtensils size={24}/>,      title:'Catering',         desc:'Exquisite menus and culinary experiences for every palate.',                     accent:'#E8B890', link:'/wedding' },
    { icon:<BsCameraVideo size={24}/>,   title:'Photography',      desc:'Professional photographers capturing every precious moment forever.',             accent:'#00C6C2', link:'/wedding' },
    { icon:<FaHeart size={22}/>,         title:'Honeymoon',        desc:'Romantic packages to paradise — tailored for newlyweds.',                        accent:'#E8B890', link:'/travel' },
  ];

  return (
    <section style={{ padding:'100px 0', background: T.offWhite }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 32px' }}>
        {/* Header */}
        <div className="sr" style={{ textAlign:'center', marginBottom:60 }}>
          <div style={{
            display:'inline-block', fontFamily:'Inter,sans-serif', fontSize:12,
            fontWeight:600, letterSpacing:'0.12em', color: T.cyan,
            background:`rgba(0,198,194,0.10)`, border:`1px solid rgba(0,198,194,0.25)`,
            borderRadius:999, padding:'5px 16px', marginBottom:14,
          }}>WHAT WE OFFER</div>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(32px,4vw,50px)', fontWeight:600, color: T.indigoDeep, lineHeight:1.15, margin:0 }}>
            Complete Services for Every Occasion
          </h2>
          <p style={{ fontFamily:'Inter,sans-serif', fontSize:16, color:'#5A5278', marginTop:14, maxWidth:560, marginLeft:'auto', marginRight:'auto', lineHeight:1.7 }}>
            From breathtaking travel to a perfect wedding — we handle every detail with expertise and passion.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:18 }}>
          {services.map((s, i) => (
            <Link to={s.link} key={i} className="svc-card sr" style={{
              background:'#fff', border:'1px solid rgba(26,16,96,0.08)',
              borderRadius:16, padding:'28px 24px', cursor:'pointer',
              textDecoration:'none', display:'block', transition:'all 0.25s',
              animationDelay:`${i*0.07}s`,
            }}>
              <div className="svc-icon" style={{
                width:52, height:52, borderRadius:14,
                background: s.accent === T.cyan ? 'rgba(0,198,194,0.12)' : 'rgba(232,184,144,0.15)',
                display:'flex', alignItems:'center', justifyContent:'center',
                color: s.accent, marginBottom:18, transition:'transform 0.25s',
              }}>{s.icon}</div>
              <h3 style={{ fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:16, color: T.indigoDeep, margin:'0 0 8px' }}>{s.title}</h3>
              <p style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'#6B6490', lineHeight:1.65, margin:'0 0 16px' }}>{s.desc}</p>
              <div style={{ display:'flex', alignItems:'center', gap:5, color: T.cyan, fontSize:13, fontFamily:'Inter,sans-serif', fontWeight:600 }}>
                Learn more <FiArrowRight size={13}/>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── FEATURED PACKAGES ─────────────────────────────────────
const FeaturedPackages = () => {
  const packages = [
    {
      name:'Kerala Backwaters Bliss', dest:'Kerala, India', dur:'5D / 4N',
      price:28999, orig:35000, rating:4.8, reviews:234,
      img:'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80',
      badge:'Best Seller', highlights:['Houseboat Stay','Ayurveda Spa','Tea Gardens'],
    },
    {
      name:'Bali Tropical Paradise',  dest:'Bali, Indonesia', dur:'6D / 5N',
      price:65999, orig:80000, rating:4.7, reviews:312,
      img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80',
      badge:'Popular', highlights:['Private Villa','Temple Tours','Sunset Dinner'],
    },
    {
      name:'Rajasthan Royal Heritage', dest:'Rajasthan, India', dur:'7D / 6N',
      price:42999, orig:55000, rating:4.9, reviews:189,
      img:'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80',
      badge:'Premium', highlights:['Palace Hotels','Desert Safari','Camel Ride'],
    },
  ];

  const discount = (orig, price) => Math.round((1 - price/orig)*100);

  return (
    <section style={{ padding:'100px 0', background:`linear-gradient(180deg,${T.indigoDeep} 0%,${T.indigo} 100%)` }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 32px' }}>
        {/* Header */}
        <div className="sr" style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:52, flexWrap:'wrap', gap:16 }}>
          <div>
            <div style={{
              display:'inline-block', fontFamily:'Inter,sans-serif', fontSize:12,
              fontWeight:600, letterSpacing:'0.12em', color: T.rose,
              background:'rgba(200,149,107,0.15)', border:'1px solid rgba(200,149,107,0.30)',
              borderRadius:999, padding:'5px 16px', marginBottom:14,
            }}>FEATURED PACKAGES</div>
            <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(30px,4vw,48px)', fontWeight:600, color:'#fff', margin:0, lineHeight:1.15 }}>
              Top Travel Experiences
            </h2>
          </div>
          <Link to="/travel" style={{ display:'flex', alignItems:'center', gap:6, color: T.cyan, fontFamily:'Inter,sans-serif', fontSize:14, fontWeight:600, textDecoration:'none' }}>
            View all packages <FiArrowRight />
          </Link>
        </div>

        {/* Cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(310px,1fr))', gap:24 }}>
          {packages.map((p, i) => (
            <div key={i} className="pkg-card sr" style={{
              background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.09)',
              borderRadius:20, overflow:'hidden', transition:'all 0.30s',
              animationDelay:`${i*0.13}s`,
            }}>
              {/* Image */}
              <div style={{ position:'relative', height:210, overflow:'hidden' }}>
                <img src={p.img} alt={p.name} className="pkg-img" style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s' }}/>
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(13,8,48,0.65) 0%,transparent 55%)' }}/>
                {/* Badge */}
                <div style={{
                  position:'absolute', top:14, left:14,
                  background:'linear-gradient(135deg,#E8B890,#C8956B)',
                  color: T.indigoDeep, fontSize:11, fontWeight:700,
                  fontFamily:'Inter,sans-serif', letterSpacing:'0.06em',
                  borderRadius:999, padding:'4px 12px',
                }}>{p.badge}</div>
                {/* Discount */}
                <div style={{
                  position:'absolute', top:14, right:14,
                  background:'rgba(0,198,194,0.90)', backdropFilter:'blur(6px)',
                  color: T.indigoDeep, fontSize:12, fontWeight:700,
                  fontFamily:'Inter,sans-serif', borderRadius:999, padding:'4px 10px',
                }}>{discount(p.orig, p.price)}% OFF</div>
                {/* Duration */}
                <div style={{
                  position:'absolute', bottom:12, left:14, display:'flex', alignItems:'center', gap:5,
                  background:'rgba(13,8,48,0.65)', backdropFilter:'blur(6px)',
                  color:'rgba(255,255,255,0.85)', fontSize:12, fontFamily:'Inter,sans-serif',
                  borderRadius:999, padding:'4px 12px',
                }}>
                  <FiClock size={12}/> {p.dur}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding:'22px 24px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:5, color:'rgba(255,255,255,0.45)', fontSize:12, fontFamily:'Inter,sans-serif', marginBottom:7 }}>
                  <FiMapPin size={11}/> {p.dest}
                </div>
                <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:22, fontWeight:600, color:'#fff', margin:'0 0 12px', lineHeight:1.2 }}>{p.name}</h3>

                {/* Highlights */}
                <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:14 }}>
                  {p.highlights.map((h, j) => (
                    <span key={j} style={{
                      background:'rgba(0,198,194,0.12)', color: T.cyanLight,
                      fontSize:11, fontFamily:'Inter,sans-serif', fontWeight:500,
                      borderRadius:999, padding:'3px 10px', border:'1px solid rgba(0,198,194,0.20)',
                    }}>{h}</span>
                  ))}
                </div>

                {/* Rating */}
                <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:18 }}>
                  {[...Array(5)].map((_,k) => <FiStar key={k} size={13} style={{ color: T.rose, fill: T.rose }}/>)}
                  <span style={{ fontSize:13, fontWeight:600, color:'#fff', fontFamily:'Inter,sans-serif' }}>{p.rating}</span>
                  <span style={{ fontSize:12, color:'rgba(255,255,255,0.38)', fontFamily:'Inter,sans-serif' }}>({p.reviews} reviews)</span>
                </div>

                {/* Price + CTA */}
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div>
                    <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:26, fontWeight:600, color: T.roseLight, lineHeight:1 }}>
                      ₹{p.price.toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontFamily:'Inter,sans-serif', fontSize:12, color:'rgba(255,255,255,0.30)', textDecoration:'line-through', marginTop:2 }}>
                      ₹{p.orig.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <Link to="/booking" className="btn-cyan" style={{ padding:'10px 22px', fontSize:14 }}>
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── GALLERY ────────────────────────────────────────────────
const Gallery = () => {
  const [modal, setModal] = useState(null);
  const images = [
    { url:'https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=80', cat:'Wedding', span:2 },
    { url:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', cat:'Travel', span:1 },
    { url:'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=80', cat:'Honeymoon', span:1 },
    { url:'https://images.unsplash.com/photo-1583939411023-14783179e581?w=600&q=80', cat:'Wedding', span:1 },
    { url:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80', cat:'Travel', span:1 },
    { url:'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80', cat:'Kerala', span:2 },
  ];

  return (
    <section style={{ padding:'100px 0', background: T.offWhite }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 32px' }}>
        {/* Header */}
        <div className="sr" style={{ textAlign:'center', marginBottom:52 }}>
          <div style={{
            display:'inline-block', fontFamily:'Inter,sans-serif', fontSize:12,
            fontWeight:600, letterSpacing:'0.12em', color: T.cyan,
            background:'rgba(0,198,194,0.10)', border:'1px solid rgba(0,198,194,0.25)',
            borderRadius:999, padding:'5px 16px', marginBottom:14,
          }}>OUR GALLERY</div>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(30px,4vw,48px)', fontWeight:600, color: T.indigoDeep, margin:0 }}>
            Moments We've Crafted
          </h2>
        </div>

        {/* Masonry-ish grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gridAutoRows:220, gap:14 }}>
          {images.map((img, i) => (
            <div key={i} className="gallery-item sr" onClick={() => setModal(img)} style={{
              gridColumn: img.span === 2 ? 'span 2' : 'span 1',
              borderRadius:16, overflow:'hidden', cursor:'pointer',
              position:'relative', animationDelay:`${i*0.08}s`,
            }}>
              <img src={img.url} alt={img.cat} className="gallery-img" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(13,8,48,0.55) 0%,transparent 50%)', transition:'opacity 0.3s' }}/>
              <div className="gallery-badge" style={{
                position:'absolute', bottom:14, left:14, opacity:0,
                background:'linear-gradient(135deg,#E8B890,#C8956B)',
                color: T.indigoDeep, fontSize:11, fontWeight:700,
                fontFamily:'Inter,sans-serif', letterSpacing:'0.06em',
                borderRadius:999, padding:'4px 12px',
                transition:'opacity 0.3s',
              }}>{img.cat}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div onClick={() => setModal(null)} style={{
          position:'fixed', inset:0, zIndex:1000,
          background:'rgba(13,8,48,0.88)', backdropFilter:'blur(10px)',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <div onClick={e => e.stopPropagation()} style={{ position:'relative', maxWidth:900, width:'90%' }}>
            <img src={modal.url} alt="" style={{ width:'100%', borderRadius:16 }}/>
            <button onClick={() => setModal(null)} style={{
              position:'absolute', top:14, right:14,
              background:'rgba(255,255,255,0.15)', backdropFilter:'blur(8px)',
              border:'none', borderRadius:'50%', width:38, height:38,
              color:'#fff', fontSize:18, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
            }}>✕</button>
            <div style={{
              position:'absolute', bottom:16, left:16,
              background:'linear-gradient(135deg,#E8B890,#C8956B)',
              color: T.indigoDeep, fontSize:12, fontWeight:700,
              fontFamily:'Inter,sans-serif', borderRadius:999, padding:'4px 14px',
            }}>{modal.cat}</div>
          </div>
        </div>
      )}
    </section>
  );
};

// ── TESTIMONIALS ───────────────────────────────────────────
const Testimonials = () => {
  const [active, setActive] = useState(0);
  const testimonials = [
    { name:'Priya & Rahul Sharma',    role:'Honeymooners — Bali',          text:'Adyant Travells made our honeymoon absolutely magical! Every detail was perfect — from the villa to the sunset dinner. We couldn\'t have asked for more.', av:'PR' },
    { name:'Anjali & Vikram Singh',   role:'Wedding Clients — Jaipur',     text:'Our wedding exceeded every dream. The décor was phenomenal and the catering left every guest amazed. Adyant team is simply exceptional!', av:'AV' },
    { name:'Rohit Gupta',             role:'Solo Traveler — Kerala',        text:'The Kerala package was worth every rupee. Seamless arrangements, the houseboat experience was surreal, and support was always one call away.', av:'RG' },
    { name:'Meera & Suresh Patel',    role:'Family Trip — Rajasthan',       text:'Traveled with a family of 8. Adyant handled every detail perfectly — hotels, transport, guided tours. Stress-free and absolutely memorable!', av:'MP' },
  ];

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % testimonials.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ padding:'100px 0', background:`linear-gradient(160deg,${T.indigoDeep} 0%,${T.indigoMid} 100%)` }}>
      <div style={{ maxWidth:800, margin:'0 auto', padding:'0 32px', textAlign:'center' }}>
        {/* Header */}
        <div className="sr" style={{ marginBottom:52 }}>
          <div style={{
            display:'inline-block', fontFamily:'Inter,sans-serif', fontSize:12,
            fontWeight:600, letterSpacing:'0.12em', color: T.rose,
            background:'rgba(200,149,107,0.15)', border:'1px solid rgba(200,149,107,0.30)',
            borderRadius:999, padding:'5px 16px', marginBottom:14,
          }}>HAPPY CLIENTS</div>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(30px,4vw,48px)', fontWeight:600, color:'#fff', margin:0 }}>
            What Our Clients Say
          </h2>
        </div>

        {/* Card */}
        <div className="sr" style={{
          background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.10)',
          borderRadius:24, padding:'44px 48px', position:'relative',
        }}>
          <FaQuoteLeft style={{ color:'rgba(0,198,194,0.30)', fontSize:42, marginBottom:20 }}/>

          {/* Stars */}
          <div style={{ display:'flex', justifyContent:'center', gap:4, marginBottom:20 }}>
            {[...Array(5)].map((_,i) => <FiStar key={i} size={18} style={{ color: T.rose, fill: T.rose }}/>)}
          </div>

          <p style={{
            fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(18px,2.5vw,24px)',
            color:'rgba(255,255,255,0.90)', lineHeight:1.65, fontStyle:'italic',
            marginBottom:36,
          }}>
            "{testimonials[active].text}"
          </p>

          {/* Author */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:14 }}>
            <div style={{
              width:48, height:48, borderRadius:'50%',
              background:'linear-gradient(135deg,#00C6C2,#009E9B)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:14, color: T.indigoDeep,
            }}>{testimonials[active].av}</div>
            <div style={{ textAlign:'left' }}>
              <div style={{ fontFamily:'Inter,sans-serif', fontWeight:600, color:'#fff', fontSize:15 }}>{testimonials[active].name}</div>
              <div style={{ fontFamily:'Inter,sans-serif', fontSize:13, color: T.cyan }}>{testimonials[active].role}</div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div style={{ display:'flex', justifyContent:'center', gap:8, marginTop:24 }}>
          {testimonials.map((_, i) => (
            <button key={i} className={`testimonial-dot${i===active?' active':''}`} onClick={() => setActive(i)} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ── FAQ ────────────────────────────────────────────────────
const FAQ = () => {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q:'How do I book a tour package?', a:'Visit our Booking page, select Travel or Wedding, fill in your details and requirements, and submit. Our team will reach out within 24 hours to confirm and finalize everything.' },
    { q:'Are prices per person or per package?', a:'Tour packages are priced per person unless stated otherwise. Wedding packages are quoted for the entire event. We provide customized pricing based on group size and requirements.' },
    { q:'What payment methods do you accept?', a:'We accept UPI, net banking, credit/debit cards, and bank transfers. A 30% advance is required to confirm any booking.' },
    { q:'Can I customize my package?', a:'Absolutely — every package is fully customizable. Share your preferences, budget, and special requirements, and we\'ll craft a tailor-made plan for you.' },
    { q:'What is your cancellation policy?', a:'30+ days before event: full refund minus processing fees. 15–30 days: 50% refund. Under 15 days: no refund. Special circumstances are handled case-by-case.' },
    { q:'Do you handle destination weddings?', a:'Yes! We specialize in destination weddings across India and internationally — Bali, Thailand, Maldives, Europe, and more. Our team coordinates all logistics seamlessly.' },
  ];

  return (
    <section style={{ padding:'100px 0', background: T.offWhite }}>
      <div style={{ maxWidth:760, margin:'0 auto', padding:'0 32px' }}>
        {/* Header */}
        <div className="sr" style={{ textAlign:'center', marginBottom:52 }}>
          <div style={{
            display:'inline-block', fontFamily:'Inter,sans-serif', fontSize:12,
            fontWeight:600, letterSpacing:'0.12em', color: T.cyan,
            background:'rgba(0,198,194,0.10)', border:'1px solid rgba(0,198,194,0.25)',
            borderRadius:999, padding:'5px 16px', marginBottom:14,
          }}>FAQ</div>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(28px,4vw,46px)', fontWeight:600, color: T.indigoDeep, margin:0 }}>
            Frequently Asked Questions
          </h2>
        </div>

        {/* Items */}
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {faqs.map((faq, i) => (
            <div key={i} className="sr faq-item" style={{
              background:'#fff', border:'1px solid rgba(26,16,96,0.09)',
              borderRadius:14, overflow:'hidden',
              animationDelay:`${i*0.07}s`,
            }}>
              <button onClick={() => setOpen(open===i?null:i)} style={{
                width:'100%', textAlign:'left', padding:'18px 24px',
                display:'flex', alignItems:'center', justifyContent:'space-between', gap:16,
                background:'transparent', border:'none', cursor:'pointer',
                transition:'background 0.2s',
              }}>
                <span style={{ fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:15, color: T.indigoDeep }}>{faq.q}</span>
                <span style={{
                  color: T.cyan, fontSize:22, flexShrink:0,
                  transition:'transform 0.25s',
                  transform: open===i ? 'rotate(45deg)' : 'rotate(0deg)',
                  display:'inline-block',
                }}>+</span>
              </button>
              {open === i && (
                <div style={{
                  padding:'0 24px 18px',
                  fontFamily:'Inter,sans-serif', fontSize:14, color:'#6B6490', lineHeight:1.7,
                  borderTop:'1px solid rgba(0,198,194,0.12)', paddingTop:14,
                }}>
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

// ── CTA ────────────────────────────────────────────────────
const CTA = () => (
  <section style={{ padding:'90px 0', background:'linear-gradient(135deg,#E8B890 0%,#C8956B 50%,#A0714A 100%)', position:'relative', overflow:'hidden' }}>
    {/* Decorative circle */}
    <div style={{ position:'absolute', right:-80, top:-80, width:400, height:400, borderRadius:'50%', background:'rgba(255,255,255,0.06)', pointerEvents:'none' }}/>
    <div style={{ position:'absolute', left:-60, bottom:-60, width:300, height:300, borderRadius:'50%', background:'rgba(255,255,255,0.06)', pointerEvents:'none' }}/>

    <div style={{ maxWidth:760, margin:'0 auto', padding:'0 32px', textAlign:'center', position:'relative', zIndex:1 }}>
      <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:22, fontStyle:'italic', color:'rgba(26,16,96,0.60)', marginBottom:10 }}>
        Begin Your Story
      </div>
      <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(32px,5vw,58px)', fontWeight:600, color: T.indigoDeep, lineHeight:1.1, margin:'0 0 18px' }}>
        Let's Create Memories Together
      </h2>
      <p style={{ fontFamily:'Inter,sans-serif', fontSize:17, color:'rgba(13,8,48,0.65)', lineHeight:1.7, marginBottom:36, maxWidth:500, marginLeft:'auto', marginRight:'auto' }}>
        Whether it's your dream vacation or the perfect wedding — we're here to make every moment extraordinary.
      </p>
      <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:14 }}>
        <Link to="/booking" style={{
          background: T.indigoDeep, color:'#E8B890',
          fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:15,
          padding:'14px 32px', borderRadius:12, border:'none', cursor:'pointer',
          textDecoration:'none', display:'inline-flex', alignItems:'center', gap:8,
          transition:'transform 0.2s, box-shadow 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 28px rgba(13,8,48,0.35)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}
        >
          Book Free Consultation <FiArrowRight />
        </Link>
        <a href="tel:+919876543210" style={{
          background:'rgba(255,255,255,0.35)',
          color: T.indigoDeep,
          fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:15,
          padding:'14px 32px', borderRadius:12, border:'1.5px solid rgba(255,255,255,0.50)',
          cursor:'pointer', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:8,
          transition:'background 0.2s',
        }}>
          📞 Call Us Now
        </a>
      </div>
    </div>
  </section>
);

// ── PAGE ───────────────────────────────────────────────────
const HomePage = () => {
  useScrollReveal();
  return (
    <>
      <Hero />
      <Services />
      <FeaturedPackages />
      <Gallery />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
};

export default HomePage;