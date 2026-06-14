import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiStar, FiArrowRight, FiSearch, FiMapPin, FiClock, FiUsers, FiCalendar } from 'react-icons/fi';
import { MdFlight, MdHotel } from 'react-icons/md';

// ── Design tokens ─────────────────────────────────────────
const T = {
  indigo:     '#1A1060',
  indigoDeep: '#0D0830',
  indigoMid:  '#2D2080',
  cyan:       '#00C6C2',
  cyanLight:  '#4DEFF0',
  rose:       '#C8956B',
  roseLight:  '#E8B890',
  offWhite:   '#F8F6FF',
  white:      '#FFFFFF',
  text:       '#3B3260',
  textMuted:  '#7A7098',
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');

  .tp-input {
    width: 100%; padding: 11px 16px; border-radius: 10px;
    border: 1.5px solid rgba(26,16,96,0.12); background: #fff;
    font-family: 'Inter',sans-serif; font-size: 14px; color: ${T.indigo};
    outline: none; transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box; appearance: none; -webkit-appearance: none;
  }
  .tp-input:focus { border-color: ${T.cyan}; box-shadow: 0 0 0 3px rgba(0,198,194,0.12); }
  .tp-input::placeholder { color: rgba(122,112,152,0.50); }

  .tp-select-wrap { position: relative; }
  .tp-select-wrap::after {
    content: '▾'; position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
    color: ${T.textMuted}; pointer-events: none; font-size: 12px;
  }

  .filter-btn {
    padding: 8px 18px; border-radius: 999px; border: 1.5px solid rgba(26,16,96,0.12);
    background: #fff; font-family: 'Inter',sans-serif; font-size: 13px; font-weight: 500;
    color: ${T.textMuted}; cursor: pointer; transition: all 0.2s; text-transform: capitalize;
  }
  .filter-btn:hover { border-color: ${T.cyan}; color: ${T.cyan}; }
  .filter-btn.active {
    background: ${T.cyan}; border-color: ${T.cyan};
    color: ${T.indigoDeep}; font-weight: 700;
    box-shadow: 0 4px 14px rgba(0,198,194,0.30);
  }

  .tab-btn {
    padding: 12px 4px; font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 600;
    border: none; background: transparent; cursor: pointer; transition: all 0.2s;
    border-bottom: 2.5px solid transparent; margin-bottom: -1px;
  }
  .tab-btn.active { border-bottom-color: ${T.cyan}; color: ${T.cyan}; }
  .tab-btn.inactive { color: ${T.textMuted}; }
  .tab-btn.inactive:hover { color: ${T.text}; }

  .pkg-card { transition: all 0.28s; }
  .pkg-card:hover { transform: translateY(-4px); box-shadow: 0 20px 56px rgba(13,8,48,0.13) !important; border-color: rgba(0,198,194,0.28) !important; }
  .pkg-card:hover .pkg-img { transform: scale(1.07); }

  .hotel-card { transition: all 0.28s; }
  .hotel-card:hover { transform: translateY(-4px); box-shadow: 0 20px 56px rgba(13,8,48,0.13) !important; border-color: rgba(200,149,107,0.30) !important; }
  .hotel-card:hover .hotel-img { transform: scale(1.07); }

  .btn-cyan {
    background: linear-gradient(135deg,#00C6C2,#009E9B);
    color: ${T.indigoDeep}; font-weight: 700; padding: 10px 22px;
    border-radius: 10px; border: none; cursor: pointer;
    font-family: 'Inter',sans-serif; font-size: 14px;
    transition: transform 0.2s, box-shadow 0.2s;
    display: inline-flex; align-items: center; gap: 6px; text-decoration: none;
  }
  .btn-cyan:hover { transform: translateY(-2px); box-shadow: 0 6px 22px rgba(0,198,194,0.38); }

  .btn-outline {
    background: transparent; color: ${T.indigo};
    border: 1.5px solid rgba(26,16,96,0.18);
    font-weight: 600; padding: 10px 22px; border-radius: 10px; cursor: pointer;
    font-family: 'Inter',sans-serif; font-size: 14px;
    transition: all 0.2s; display: inline-flex; align-items: center; gap: 6px; text-decoration: none;
  }
  .btn-outline:hover { border-color: ${T.cyan}; color: ${T.cyan}; }

  .btn-rose {
    background: linear-gradient(135deg,#E8B890,#C8956B);
    color: ${T.indigoDeep}; font-weight: 700; padding: 10px 22px;
    border-radius: 10px; border: none; cursor: pointer;
    font-family: 'Inter',sans-serif; font-size: 14px;
    transition: transform 0.2s, box-shadow 0.2s;
    display: inline-flex; align-items: center; gap: 6px; text-decoration: none;
  }
  .btn-rose:hover { transform: translateY(-2px); box-shadow: 0 6px 22px rgba(200,149,107,0.40); }

  .shimmer {
    background: linear-gradient(90deg,rgba(26,16,96,0.06) 25%,rgba(26,16,96,0.10) 50%,rgba(26,16,96,0.06) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
  }
  @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

  .search-input-wrap { position: relative; flex: 1; min-width: 220px; }
  .search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: ${T.textMuted}; pointer-events: none; }
  .search-input-wrap .tp-input { padding-left: 42px; }

  .star-row { display: flex; gap: 2px; }
`;

const DEMO_PACKAGES = [
  { id:1, name:'Kerala Backwaters Bliss',     destination:'Kerala, India',         duration:'5D / 4N', price:28999, originalPrice:35000, rating:4.8, reviews:234, category:'domestic',      highlights:['Houseboat Stay','Ayurveda Spa','Tea Gardens'],        image:'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80', badge:'Best Seller' },
  { id:2, name:'Rajasthan Royal Heritage',    destination:'Rajasthan, India',       duration:'7D / 6N', price:42999, originalPrice:55000, rating:4.9, reviews:189, category:'domestic',      highlights:['Palace Hotels','Desert Safari','Camel Ride'],         image:'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80', badge:'Premium' },
  { id:3, name:'Bali Tropical Paradise',      destination:'Bali, Indonesia',        duration:'6D / 5N', price:65999, originalPrice:80000, rating:4.7, reviews:312, category:'international', highlights:['Private Villa','Temple Tours','Sunset Dinner'],        image:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', badge:'Popular' },
  { id:4, name:'Switzerland Alps Adventure',  destination:'Switzerland, Europe',    duration:'8D / 7N', price:145999,originalPrice:175000,rating:4.9, reviews:156, category:'international', highlights:['Jungfraujoch','Lake Geneva','Chocolate Tour'],         image:'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&q=80', badge:'Luxury' },
  { id:5, name:'Goa Beach Getaway',           destination:'Goa, India',             duration:'4D / 3N', price:18999, originalPrice:24000, rating:4.6, reviews:445, category:'domestic',      highlights:['Beach Resort','Water Sports','Night Markets'],         image:'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80', badge:'Budget Pick' },
  { id:6, name:'Dubai Luxury Experience',     destination:'Dubai, UAE',             duration:'5D / 4N', price:89999, originalPrice:110000,rating:4.8, reviews:267, category:'international', highlights:['Burj Khalifa','Desert Safari','Dhow Cruise'],          image:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80', badge:'Trending' },
];

const HOTELS = [
  { name:'Taj Lake Palace',  location:'Udaipur, India',    stars:5, price:18000, image:'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80', amenities:['Pool','Spa','Fine Dining','Lake View'] },
  { name:'Anantara Bali',    location:'Seminyak, Bali',    stars:5, price:12500, image:'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80', amenities:['Infinity Pool','Beach','Butler','Yoga'] },
  { name:'The Leela Palace', location:'New Delhi, India',  stars:5, price:22000, image:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', amenities:['Pool','Spa','Restaurants','Gym'] },
];

const discount = (orig, price) => Math.round((1 - price / orig) * 100);

// ── Package card ───────────────────────────────────────────
const PkgCard = ({ pkg }) => (
  <div className="pkg-card" style={{
    background: '#fff', border: '1px solid rgba(26,16,96,0.08)',
    borderRadius: 18, overflow: 'hidden',
  }}>
    <div style={{ position:'relative', height:210, overflow:'hidden' }}>
      <img src={pkg.image} alt={pkg.name} className="pkg-img" style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s' }}/>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(13,8,48,0.60) 0%,transparent 55%)' }}/>
      {pkg.badge && (
        <div style={{
          position:'absolute', top:13, left:13,
          background:'linear-gradient(135deg,#E8B890,#C8956B)',
          color: T.indigoDeep, fontSize:11, fontWeight:700,
          fontFamily:'Inter,sans-serif', letterSpacing:'0.05em',
          borderRadius:999, padding:'4px 12px',
        }}>{pkg.badge}</div>
      )}
      <div style={{
        position:'absolute', top:13, right:13,
        background:'rgba(0,198,194,0.88)', backdropFilter:'blur(6px)',
        color: T.indigoDeep, fontSize:11, fontWeight:700,
        fontFamily:'Inter,sans-serif', borderRadius:999, padding:'4px 10px',
      }}>{discount(pkg.originalPrice, pkg.price)}% OFF</div>
      <div style={{
        position:'absolute', bottom:12, left:13,
        display:'flex', alignItems:'center', gap:5,
        background:'rgba(13,8,48,0.60)', backdropFilter:'blur(6px)',
        color:'rgba(255,255,255,0.85)', fontSize:11, fontFamily:'Inter,sans-serif',
        borderRadius:999, padding:'4px 12px',
      }}><FiClock size={11}/>{pkg.duration}</div>
    </div>

    <div style={{ padding:'20px 22px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:4, color: T.textMuted, fontSize:12, fontFamily:'Inter,sans-serif', marginBottom:6 }}>
        <FiMapPin size={11}/> {pkg.destination}
      </div>
      <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:21, fontWeight:600, color: T.indigoDeep, margin:'0 0 10px', lineHeight:1.2 }}>{pkg.name}</h3>

      <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:12 }}>
        {(pkg.highlights||[]).slice(0,3).map((h,j) => (
          <span key={j} style={{
            background:'rgba(0,198,194,0.10)', color:'#007E7B',
            fontSize:11, fontFamily:'Inter,sans-serif', fontWeight:500,
            borderRadius:999, padding:'3px 10px', border:'1px solid rgba(0,198,194,0.18)',
          }}>{h}</span>
        ))}
      </div>

      <div style={{ display:'flex', alignItems:'center', gap:4, marginBottom:16 }}>
        <div className="star-row">
          {[...Array(5)].map((_,k) => <FiStar key={k} size={12} style={{ color: T.rose, fill: T.rose }}/>)}
        </div>
        <span style={{ fontSize:13, fontWeight:600, color: T.indigo, fontFamily:'Inter,sans-serif' }}>{pkg.rating}</span>
        <span style={{ fontSize:12, color: T.textMuted, fontFamily:'Inter,sans-serif' }}>({pkg.reviews})</span>
      </div>

      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:26, fontWeight:600, color: T.rose, lineHeight:1 }}>
            ₹{Number(pkg.price).toLocaleString('en-IN')}
          </div>
          <div style={{ fontFamily:'Inter,sans-serif', fontSize:11, color: T.textMuted, textDecoration:'line-through', marginTop:2 }}>
            ₹{Number(pkg.originalPrice).toLocaleString('en-IN')}
          </div>
        </div>
        <Link to="/booking" state={{ service:'travel', package:pkg.name }} className="btn-cyan" style={{ padding:'9px 20px', fontSize:13 }}>
          Book Now
        </Link>
      </div>
    </div>
  </div>
);

// ── Shimmer skeleton ───────────────────────────────────────
const SkeletonCard = () => (
  <div style={{ background:'#fff', border:'1px solid rgba(26,16,96,0.08)', borderRadius:18, overflow:'hidden' }}>
    <div className="shimmer" style={{ height:210 }}/>
    <div style={{ padding:'20px 22px' }}>
      <div className="shimmer" style={{ height:12, borderRadius:6, width:'60%', marginBottom:10 }}/>
      <div className="shimmer" style={{ height:18, borderRadius:6, width:'85%', marginBottom:12 }}/>
      <div className="shimmer" style={{ height:10, borderRadius:6, width:'50%' }}/>
    </div>
  </div>
);

// ── TravelPage ─────────────────────────────────────────────
const TravelPage = () => {
  const [packages, setPackages] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [tab,      setTab]      = useState('packages');
  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => { window.scrollTo(0,0); }, []);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const params = new URLSearchParams();
        if (category !== 'all') params.set('category', category);
        if (search) params.set('search', search);
        const res = await axios.get(`/api/services/travel-packages?${params}`);
        setPackages(res.data.packages || []);
      } catch {
        let data = DEMO_PACKAGES;
        if (category !== 'all') data = data.filter(p => p.category === category);
        if (search) data = data.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.destination.toLowerCase().includes(search.toLowerCase()));
        setPackages(data);
      } finally { setLoading(false); }
    }, 400);
    return () => clearTimeout(timer);
  }, [category, search]);

  return (
    <div style={{ minHeight:'100vh', background: T.offWhite }}>
      <style>{styles}</style>

      {/* ── Hero ── */}
      <div style={{ position:'relative', height:'clamp(280px,38vw,420px)', overflow:'hidden' }}>
        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80" alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(160deg,rgba(13,8,48,0.88) 0%,rgba(13,8,48,0.65) 60%,rgba(13,8,48,0.40) 100%)' }}/>
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'0 24px' }}>
          <div style={{
            display:'inline-block', fontFamily:'Inter,sans-serif', fontSize:12,
            fontWeight:700, letterSpacing:'0.14em', color: T.rose,
            background:'rgba(200,149,107,0.15)', border:'1px solid rgba(200,149,107,0.30)',
            borderRadius:999, padding:'6px 18px', marginBottom:18,
          }}>✈  TRAVEL SERVICES</div>

          <h1 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(36px,5.5vw,66px)', fontWeight:600, color:'#fff', lineHeight:1.08, marginBottom:14 }}>
            Discover the World{' '}
            <span style={{ background:'linear-gradient(135deg,#4DEFF0,#00C6C2)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              With Us
            </span>
          </h1>
          <p style={{ fontFamily:'Inter,sans-serif', fontSize:17, color:'rgba(255,255,255,0.60)', maxWidth:480 }}>
            Handcrafted travel experiences for every kind of adventurer
          </p>
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 28px 80px' }}>

        {/* ── Search + Filter bar ── */}
        <div style={{
          background:'#fff', border:'1px solid rgba(26,16,96,0.09)',
          borderRadius:16, padding:'20px 24px',
          boxShadow:'0 8px 32px rgba(13,8,48,0.09)',
          margin:'-28px 0 36px', position:'relative', zIndex:10,
          display:'flex', flexWrap:'wrap', alignItems:'center', gap:16,
        }}>
          <div className="search-input-wrap">
            <FiSearch size={16} className="search-icon"/>
            <input
              type="text"
              className="tp-input"
              placeholder="Search destinations, packages…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {['all','domestic','international'].map(c => (
              <button key={c} className={`filter-btn${category===c?' active':''}`} onClick={() => setCategory(c)}>
                {c === 'all' ? 'All' : c}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tabs ── */}
        <div style={{ display:'flex', gap:28, borderBottom:'1px solid rgba(26,16,96,0.10)', marginBottom:32 }}>
          {[
            { id:'packages', label:'Tour Packages' },
            { id:'hotels',   label:'Hotels' },
            { id:'flights',  label:'Flights' },
          ].map(t => (
            <button key={t.id} className={`tab-btn${tab===t.id?' active':' inactive'}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── PACKAGES ── */}
        {tab === 'packages' && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(310px,1fr))', gap:22 }}>
            {loading
              ? [1,2,3].map(i => <SkeletonCard key={i}/>)
              : packages.length === 0
                ? (
                  <div style={{ gridColumn:'1/-1', textAlign:'center', padding:'60px 0' }}>
                    <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:28, color: T.indigoDeep, marginBottom:8 }}>No packages found</div>
                    <p style={{ fontFamily:'Inter,sans-serif', color: T.textMuted, fontSize:15 }}>Try a different search or category.</p>
                  </div>
                )
                : packages.map((pkg, i) => <PkgCard key={pkg.id||i} pkg={pkg}/>)
            }
          </div>
        )}

        {/* ── HOTELS ── */}
        {tab === 'hotels' && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(310px,1fr))', gap:22 }}>
            {HOTELS.map((hotel, i) => (
              <div key={i} className="hotel-card" style={{
                background:'#fff', border:'1px solid rgba(26,16,96,0.08)',
                borderRadius:18, overflow:'hidden',
              }}>
                <div style={{ position:'relative', height:200, overflow:'hidden' }}>
                  <img src={hotel.image} alt={hotel.name} className="hotel-img" style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s' }}/>
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(13,8,48,0.55) 0%,transparent 50%)' }}/>
                  {/* Stars */}
                  <div style={{
                    position:'absolute', top:13, right:13,
                    background:'rgba(13,8,48,0.65)', backdropFilter:'blur(6px)',
                    borderRadius:999, padding:'5px 12px',
                    display:'flex', gap:2,
                  }}>
                    {[...Array(hotel.stars)].map((_,k) => (
                      <FiStar key={k} size={11} style={{ color: T.roseLight, fill: T.roseLight }}/>
                    ))}
                  </div>
                </div>
                <div style={{ padding:'20px 22px' }}>
                  <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:22, fontWeight:600, color: T.indigoDeep, margin:'0 0 5px' }}>{hotel.name}</h3>
                  <div style={{ display:'flex', alignItems:'center', gap:4, color: T.textMuted, fontSize:13, fontFamily:'Inter,sans-serif', marginBottom:14 }}>
                    <FiMapPin size={11}/> {hotel.location}
                  </div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:18 }}>
                    {hotel.amenities.map((a,j) => (
                      <span key={j} style={{
                        background:'rgba(200,149,107,0.10)', color:'#7A4A1A',
                        fontSize:11, fontFamily:'Inter,sans-serif', fontWeight:500,
                        borderRadius:999, padding:'3px 10px', border:'1px solid rgba(200,149,107,0.20)',
                      }}>{a}</span>
                    ))}
                  </div>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <div>
                      <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:26, fontWeight:600, color: T.rose, lineHeight:1 }}>
                        ₹{hotel.price.toLocaleString('en-IN')}
                      </div>
                      <div style={{ fontFamily:'Inter,sans-serif', fontSize:11, color: T.textMuted, marginTop:2 }}>per night</div>
                    </div>
                    <Link to="/booking" className="btn-rose" style={{ padding:'9px 20px', fontSize:13 }}>
                      Book Room
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── FLIGHTS ── */}
        {tab === 'flights' && (
          <div style={{ maxWidth:620, margin:'0 auto' }}>
            <div style={{
              background:'#fff', border:'1px solid rgba(26,16,96,0.08)',
              borderRadius:20, padding:'36px 40px',
              boxShadow:'0 8px 40px rgba(13,8,48,0.07)',
            }}>
              {/* Header */}
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:6 }}>
                <div style={{ width:42, height:42, borderRadius:12, background:'rgba(0,198,194,0.12)', display:'flex', alignItems:'center', justifyContent:'center', color: T.cyan }}>
                  <MdFlight size={22}/>
                </div>
                <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:28, fontWeight:600, color: T.indigoDeep, margin:0 }}>
                  Search Flights
                </h3>
              </div>
              <div style={{ height:2, background:`linear-gradient(90deg,${T.cyan},transparent)`, borderRadius:2, marginBottom:28 }}/>

              <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
                {/* From / To */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  <div>
                    <label style={{ fontFamily:'Inter,sans-serif', fontSize:12, fontWeight:600, color: T.text, letterSpacing:'0.04em', display:'flex', alignItems:'center', gap:5, marginBottom:6 }}>
                      <FiMapPin size={11} style={{ color: T.cyan }}/> From
                    </label>
                    <input type="text" className="tp-input" placeholder="Departure city" defaultValue="Delhi (DEL)"/>
                  </div>
                  <div>
                    <label style={{ fontFamily:'Inter,sans-serif', fontSize:12, fontWeight:600, color: T.text, letterSpacing:'0.04em', display:'flex', alignItems:'center', gap:5, marginBottom:6 }}>
                      <FiMapPin size={11} style={{ color: T.rose }}/> To
                    </label>
                    <input type="text" className="tp-input" placeholder="Arrival city"/>
                  </div>
                </div>

                {/* Dates */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  <div>
                    <label style={{ fontFamily:'Inter,sans-serif', fontSize:12, fontWeight:600, color: T.text, letterSpacing:'0.04em', display:'flex', alignItems:'center', gap:5, marginBottom:6 }}>
                      <FiCalendar size={11} style={{ color: T.cyan }}/> Departure
                    </label>
                    <input type="date" className="tp-input"/>
                  </div>
                  <div>
                    <label style={{ fontFamily:'Inter,sans-serif', fontSize:12, fontWeight:600, color: T.text, letterSpacing:'0.04em', display:'flex', alignItems:'center', gap:5, marginBottom:6 }}>
                      <FiCalendar size={11} style={{ color: T.rose }}/> Return
                    </label>
                    <input type="date" className="tp-input"/>
                  </div>
                </div>

                {/* Passengers / Class */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  <div>
                    <label style={{ fontFamily:'Inter,sans-serif', fontSize:12, fontWeight:600, color: T.text, letterSpacing:'0.04em', display:'flex', alignItems:'center', gap:5, marginBottom:6 }}>
                      <FiUsers size={11} style={{ color: T.cyan }}/> Passengers
                    </label>
                    <div className="tp-select-wrap">
                      <select className="tp-input">
                        {[1,2,3,4,5,6].map(n => <option key={n}>{n} Passenger{n>1?'s':''}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontFamily:'Inter,sans-serif', fontSize:12, fontWeight:600, color: T.text, letterSpacing:'0.04em', marginBottom:6, display:'block' }}>
                      Class
                    </label>
                    <div className="tp-select-wrap">
                      <select className="tp-input">
                        <option>Economy</option>
                        <option>Business</option>
                        <option>First Class</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Link to="/booking" className="btn-cyan" style={{ justifyContent:'center', padding:'14px', fontSize:15, marginTop:4 }}>
                  <MdFlight size={17}/> Search Flights <FiArrowRight size={15}/>
                </Link>

                <p style={{ textAlign:'center', fontFamily:'Inter,sans-serif', fontSize:12, color: T.textMuted, margin:0 }}>
                  Our team will find the best rates and confirm within 2 hours
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── CTA Banner ── */}
        <div style={{ marginTop:60 }}>
          <div style={{
            background:`linear-gradient(135deg,${T.indigoDeep} 0%,${T.indigoMid} 100%)`,
            borderRadius:22, padding:'52px 48px', textAlign:'center', position:'relative', overflow:'hidden',
          }}>
            {/* Decorative */}
            <div style={{ position:'absolute', right:-60, top:-60, width:280, height:280, borderRadius:'50%', background:'rgba(0,198,194,0.07)', pointerEvents:'none' }}/>
            <div style={{ position:'absolute', left:-40, bottom:-40, width:200, height:200, borderRadius:'50%', background:'rgba(200,149,107,0.07)', pointerEvents:'none' }}/>

            <div style={{
              display:'inline-block', fontFamily:'Inter,sans-serif', fontSize:12,
              fontWeight:700, letterSpacing:'0.12em', color: T.rose,
              background:'rgba(200,149,107,0.15)', border:'1px solid rgba(200,149,107,0.28)',
              borderRadius:999, padding:'5px 16px', marginBottom:16,
            }}>CUSTOM PACKAGES</div>

            <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(28px,4vw,44px)', fontWeight:600, color:'#fff', margin:'0 0 12px', lineHeight:1.15 }}>
              Can't Find What You're Looking For?
            </h3>
            <p style={{ fontFamily:'Inter,sans-serif', fontSize:16, color:'rgba(255,255,255,0.55)', marginBottom:28, maxWidth:460, marginLeft:'auto', marginRight:'auto' }}>
              Tell us your dream destination — we'll craft a custom itinerary just for you.
            </p>
            <Link to="/contact" className="btn-cyan" style={{ padding:'13px 30px', fontSize:15, display:'inline-flex' }}>
              Request Custom Package <FiArrowRight/>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPage;