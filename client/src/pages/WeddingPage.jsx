import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiX, FiArrowRight, FiStar } from 'react-icons/fi';
import { GiDiamondRing, GiFlowers } from 'react-icons/gi';
import { BsCameraVideo } from 'react-icons/bs';
import { FaUtensils, FaPaintBrush, FaMapMarkedAlt, FaQuoteLeft } from 'react-icons/fa';

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
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap');

  .svc-card { transition: all 0.26s; }
  .svc-card:hover { transform: translateY(-4px); box-shadow: 0 18px 50px rgba(13,8,48,0.11) !important; border-color: rgba(200,149,107,0.30) !important; }
  .svc-card:hover .svc-icon { transform: scale(1.13); }

  .pkg-card { transition: all 0.26s; }
  .pkg-card:hover { transform: translateY(-3px); }

  .gal-img { transition: transform 0.5s ease; }
  .gal-item:hover .gal-img { transform: scale(1.08); }
  .gal-item:hover .gal-cap { opacity: 1 !important; transform: translateY(0) !important; }

  .btn-rose {
    background: linear-gradient(135deg,#E8B890,#C8956B);
    color: ${T.indigoDeep}; font-weight: 700; padding: 13px 30px;
    border-radius: 12px; border: none; cursor: pointer;
    font-family: 'Inter',sans-serif; font-size: 15px;
    transition: transform 0.2s, box-shadow 0.2s;
    display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
  }
  .btn-rose:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(200,149,107,0.42); }

  .btn-indigo {
    background: ${T.indigoDeep};
    color: ${T.roseLight}; font-weight: 700; padding: 13px 30px;
    border-radius: 12px; border: none; cursor: pointer;
    font-family: 'Inter',sans-serif; font-size: 15px;
    transition: transform 0.2s, box-shadow 0.2s;
    display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
  }
  .btn-indigo:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(13,8,48,0.35); }

  .btn-ghost {
    background: rgba(255,255,255,0.15);
    color: ${T.indigoDeep}; font-weight: 600; padding: 13px 30px;
    border-radius: 12px; border: 1.5px solid rgba(255,255,255,0.40); cursor: pointer;
    font-family: 'Inter',sans-serif; font-size: 15px;
    transition: background 0.2s;
    display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
  }
  .btn-ghost:hover { background: rgba(255,255,255,0.28); }

  .pkg-choose-btn {
    width: 100%; padding: 13px; border-radius: 12px;
    font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 700;
    cursor: pointer; transition: all 0.22s; text-decoration: none;
    display: block; text-align: center;
  }
  .pkg-choose-btn.popular {
    background: linear-gradient(135deg,#E8B890,#C8956B);
    color: ${T.indigoDeep}; border: none;
    box-shadow: 0 6px 20px rgba(200,149,107,0.35);
  }
  .pkg-choose-btn.popular:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(200,149,107,0.45); }
  .pkg-choose-btn.standard {
    background: transparent;
    color: rgba(255,255,255,0.75); border: 1.5px solid rgba(255,255,255,0.20);
  }
  .pkg-choose-btn.standard:hover { border-color: rgba(0,198,194,0.50); color: #4DEFF0; }

  .eyebrow {
    display: inline-block; font-family: 'Inter',sans-serif; font-size: 12px;
    font-weight: 700; letter-spacing: 0.13em;
    border-radius: 999px; padding: 5px 16px;
  }
  .eyebrow-rose { color: ${T.rose}; background: rgba(200,149,107,0.12); border: 1px solid rgba(200,149,107,0.28); }
  .eyebrow-cyan { color: ${T.cyan}; background: rgba(0,198,194,0.10); border: 1px solid rgba(0,198,194,0.25); }
  .eyebrow-rose-light { color: ${T.roseLight}; background: rgba(232,184,144,0.15); border: 1px solid rgba(232,184,144,0.25); }
`;

// ── Data ───────────────────────────────────────────────────
const SERVICES = [
  { icon:<FaMapMarkedAlt size={26}/>, title:'Venue Booking',    accent: T.rose,  accentBg:'rgba(200,149,107,0.12)', desc:'From grand palace hotels to intimate garden settings — venues for every style and budget.', features:['5-star hotels','Heritage venues','Beach & garden','Banquet halls'] },
  { icon:<GiFlowers size={26}/>,      title:'Decoration',       accent:'#C060A0', accentBg:'rgba(192,96,160,0.10)', desc:'Transform any space into a breathtaking wedding wonderland with our award-winning decoration team.', features:['Floral arrangements','LED setups','Theme decoration','Mandap design'] },
  { icon:<FaUtensils size={24}/>,     title:'Catering',         accent: T.cyan,  accentBg:'rgba(0,198,194,0.12)', desc:'Delight guests with an extraordinary culinary experience featuring diverse cuisines.', features:['Multi-cuisine menu','Live counters','5-star chefs','Custom menu'] },
  { icon:<BsCameraVideo size={24}/>,  title:'Photography',      accent:'#8060C0', accentBg:'rgba(128,96,192,0.10)', desc:'Capture every precious moment with professional photographers and cinematographers.', features:['HD photography','Cinematic video','Drone shots','Same-day edit'] },
  { icon:<FaPaintBrush size={22}/>,   title:'Bridal Makeup',    accent: T.rose,  accentBg:'rgba(200,149,107,0.12)', desc:'Look absolutely stunning with expert bridal makeup artists and hairstylists.', features:['Bridal makeup','Hair styling','Pre-bridal care','Groom grooming'] },
  { icon:<GiDiamondRing size={26}/>,  title:'Complete Planning', accent: T.cyan,  accentBg:'rgba(0,198,194,0.12)', desc:'Sit back and relax as dedicated wedding planners handle every single detail for you.', features:['Event coordination','Vendor management','Guest management','Day-of coordination'] },
];

const PACKAGES = [
  {
    name: 'Silver Bliss', price: '₹2.5 Lakh', sub: 'Perfect for intimate weddings', popular: false,
    accentColor: '#B0B8C8',
    features: ['Venue for 200 guests','Basic floral decoration','Photography (8 hrs)','Vegetarian catering','Bridal makeup','Wedding coordination','Basic sound system'],
    excluded: ['Videography','Pre-wedding shoot','DJ & Entertainment','Honeymoon package'],
  },
  {
    name: 'Golden Dreams', price: '₹5.5 Lakh', sub: 'Our most complete package', popular: true,
    accentColor: T.roseLight,
    features: ['Venue for 500 guests','Premium theme decoration','Photography + Videography','Veg & non-veg catering','Celebrity-style makeup','Groom grooming','DJ & Entertainment','Mehendi ceremony','Pre-wedding photoshoot','Dedicated wedding planner','Luxury car rental'],
    excluded: ['Honeymoon package','Destination venue'],
  },
  {
    name: 'Platinum Royale', price: '₹12 Lakh', sub: 'The ultimate luxury experience', popular: false,
    accentColor: T.cyanLight,
    features: ['Venue for 1000+ guests','Grand luxury decoration','Cinematic photography & video','5-star catering + live stations','Celebrity-grade bridal makeup','Complete groom styling','Live band + DJ','All ceremonies covered','Luxury car fleet','Drone photography','Honeymoon package','24/7 planner team'],
    excluded: [],
  },
];

const PORTFOLIO = [
  { url:'https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=80', cap:'Royal Palace Wedding', span:2 },
  { url:'https://images.unsplash.com/photo-1583939411023-14783179e581?w=600&q=80', cap:'Garden Ceremony',      span:1 },
  { url:'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80', cap:'Floral Decoration',    span:1 },
  { url:'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80', cap:'Destination Wedding',  span:1 },
  { url:'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80', cap:'Reception Night',      span:2 },
];

// ── Component ──────────────────────────────────────────────
const WeddingPage = () => {
  const [modal, setModal] = useState(null);

  return (
    <div style={{ minHeight:'100vh', background: T.offWhite }}>
      <style>{styles}</style>

      {/* ── Hero ── */}
      <div style={{ position:'relative', height:'clamp(320px,45vw,520px)', overflow:'hidden' }}>
        <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80" alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(110deg,rgba(13,8,48,0.92) 0%,rgba(13,8,48,0.65) 55%,rgba(13,8,48,0.30) 100%)' }}/>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(13,8,48,0.65) 0%,transparent 55%)' }}/>

        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'0 24px' }}>
          <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:22, fontStyle:'italic', color:'rgba(232,184,144,0.75)', marginBottom:10 }}>
            Your Perfect Day
          </div>
          <h1 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(36px,5.5vw,70px)', fontWeight:600, color:'#fff', lineHeight:1.08, marginBottom:16, maxWidth:700 }}>
            Wedding Planning{' '}
            <span style={{ background:'linear-gradient(135deg,#E8B890,#C8956B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              Excellence
            </span>
          </h1>
          <p style={{ fontFamily:'Inter,sans-serif', fontSize:17, color:'rgba(255,255,255,0.58)', maxWidth:520, lineHeight:1.7, marginBottom:32 }}>
            We turn your wedding dreams into breathtaking reality with meticulous attention to every detail.
          </p>
          <Link to="/booking" className="btn-rose">
            Plan My Wedding <FiArrowRight/>
          </Link>
        </div>
      </div>

      {/* ── Stats ribbon ── */}
      <div style={{ background:'linear-gradient(135deg,#E8B890 0%,#C8956B 50%,#A0714A 100%)', padding:'28px 24px' }}>
        <div style={{ maxWidth:1000, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, textAlign:'center' }}>
          {[
            { num:'800+', label:'Weddings Planned' },
            { num:'50+',  label:'Expert Team Members' },
            { num:'4.9★', label:'Average Rating' },
            { num:'9+',   label:'Years of Excellence' },
          ].map((s,i) => (
            <div key={i}>
              <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:34, fontWeight:600, color: T.indigoDeep, lineHeight:1 }}>{s.num}</div>
              <div style={{ fontFamily:'Inter,sans-serif', fontSize:12, color:'rgba(13,8,48,0.60)', marginTop:4, letterSpacing:'0.04em' }}>{s.label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Services ── */}
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'88px 28px' }}>
        <div style={{ textAlign:'center', marginBottom:56 }}>
          <div className="eyebrow eyebrow-rose" style={{ marginBottom:14 }}>OUR SERVICES</div>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(30px,4vw,50px)', fontWeight:600, color: T.indigoDeep, margin:0, lineHeight:1.15 }}>
            Complete Wedding Solutions
          </h2>
          <p style={{ fontFamily:'Inter,sans-serif', fontSize:16, color: T.textMuted, marginTop:14, maxWidth:540, marginLeft:'auto', marginRight:'auto', lineHeight:1.7 }}>
            Every service you need for your dream wedding, delivered by experienced professionals.
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:20 }}>
          {SERVICES.map((s,i) => (
            <div key={i} className="svc-card" style={{
              background:'#fff', border:'1px solid rgba(26,16,96,0.08)',
              borderRadius:18, padding:'28px 26px',
            }}>
              <div className="svc-icon" style={{
                width:52, height:52, borderRadius:14,
                background: s.accentBg, color: s.accent,
                display:'flex', alignItems:'center', justifyContent:'center',
                marginBottom:18, transition:'transform 0.25s',
              }}>{s.icon}</div>

              <h3 style={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:17, color: T.indigoDeep, margin:'0 0 8px' }}>{s.title}</h3>
              <p style={{ fontFamily:'Inter,sans-serif', fontSize:14, color: T.textMuted, lineHeight:1.65, margin:'0 0 16px' }}>{s.desc}</p>

              <ul style={{ listStyle:'none', padding:0, margin:'0 0 18px', display:'flex', flexDirection:'column', gap:6 }}>
                {s.features.map((f,j) => (
                  <li key={j} style={{ display:'flex', alignItems:'center', gap:7, fontFamily:'Inter,sans-serif', fontSize:13, color: T.text }}>
                    <FiCheck size={13} style={{ color: s.accent, flexShrink:0 }}/> {f}
                  </li>
                ))}
              </ul>

              <Link to="/booking" style={{
                display:'inline-flex', alignItems:'center', gap:5,
                fontFamily:'Inter,sans-serif', fontSize:13, fontWeight:700,
                color: s.accent, textDecoration:'none',
              }}>
                Book Service <FiArrowRight size={13}/>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ── Packages ── */}
      <div style={{ background:`linear-gradient(160deg,${T.indigoDeep} 0%,${T.indigoMid} 100%)`, padding:'88px 28px', position:'relative', overflow:'hidden' }}>
        {/* Blobs */}
        <div style={{ position:'absolute', top:-80, right:-80, width:360, height:360, borderRadius:'50%', background:'rgba(0,198,194,0.06)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:-60, left:-60, width:280, height:280, borderRadius:'50%', background:'rgba(200,149,107,0.07)', pointerEvents:'none' }}/>

        <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <div className="eyebrow eyebrow-rose-light" style={{ marginBottom:14 }}>PRICING</div>
            <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(30px,4vw,50px)', fontWeight:600, color:'#fff', margin:0 }}>
              Wedding Packages
            </h2>
            <p style={{ fontFamily:'Inter,sans-serif', fontSize:16, color:'rgba(255,255,255,0.50)', marginTop:12 }}>
              Transparent pricing for every dream and budget
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(290px,1fr))', gap:22, alignItems:'start' }}>
            {PACKAGES.map((pkg,i) => (
              <div key={i} className="pkg-card" style={{
                background:'rgba(255,255,255,0.05)', backdropFilter:'blur(10px)',
                border: pkg.popular ? `2px solid ${T.roseLight}` : '1px solid rgba(255,255,255,0.10)',
                borderRadius:20, overflow:'hidden',
                ...(pkg.popular ? { transform:'scale(1.03)', boxShadow:'0 24px 60px rgba(200,149,107,0.20)' } : {}),
              }}>
                {/* Popular banner */}
                {pkg.popular && (
                  <div style={{
                    background:'linear-gradient(135deg,#E8B890,#C8956B)',
                    color: T.indigoDeep, textAlign:'center',
                    fontFamily:'Inter,sans-serif', fontSize:11, fontWeight:800,
                    letterSpacing:'0.12em', padding:'8px',
                  }}>⭐  MOST POPULAR</div>
                )}

                <div style={{ padding:'28px 28px 32px' }}>
                  {/* Package name */}
                  <div style={{
                    fontFamily:'Cormorant Garamond,serif', fontSize:30, fontWeight:600,
                    fontStyle:'italic', color: pkg.accentColor, lineHeight:1, marginBottom:4,
                  }}>{pkg.name}</div>
                  <p style={{ fontFamily:'Inter,sans-serif', fontSize:13, color:'rgba(255,255,255,0.45)', marginBottom:20 }}>{pkg.sub}</p>

                  {/* Price */}
                  <div style={{ marginBottom:24 }}>
                    <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:38, fontWeight:600, color:'#fff', lineHeight:1 }}>{pkg.price}</div>
                    <div style={{ fontFamily:'Inter,sans-serif', fontSize:12, color:'rgba(255,255,255,0.38)', marginTop:4, letterSpacing:'0.04em' }}>STARTING PRICE</div>
                  </div>

                  {/* Divider */}
                  <div style={{ height:1, background:'rgba(255,255,255,0.08)', marginBottom:20 }}/>

                  {/* Features */}
                  <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:24 }}>
                    {pkg.features.map((f,j) => (
                      <div key={j} style={{ display:'flex', alignItems:'center', gap:8, fontFamily:'Inter,sans-serif', fontSize:13, color:'rgba(255,255,255,0.75)' }}>
                        <FiCheck size={13} style={{ color:'#5AF0A0', flexShrink:0 }}/> {f}
                      </div>
                    ))}
                    {pkg.excluded.map((f,j) => (
                      <div key={j} style={{ display:'flex', alignItems:'center', gap:8, fontFamily:'Inter,sans-serif', fontSize:13, color:'rgba(255,255,255,0.25)' }}>
                        <FiX size={13} style={{ color:'rgba(240,80,80,0.45)', flexShrink:0 }}/> {f}
                      </div>
                    ))}
                  </div>

                  <Link to="/booking" state={{ service:'wedding', package:pkg.name }} className={`pkg-choose-btn ${pkg.popular?'popular':'standard'}`}>
                    Choose {pkg.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p style={{ textAlign:'center', fontFamily:'Inter,sans-serif', fontSize:12, color:'rgba(255,255,255,0.30)', marginTop:28 }}>
            * All packages are fully customizable. Contact us for a personalized quote.
          </p>
        </div>
      </div>

      {/* ── Portfolio Gallery ── */}
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'88px 28px' }}>
        <div style={{ textAlign:'center', marginBottom:52 }}>
          <div className="eyebrow eyebrow-rose" style={{ marginBottom:14 }}>PORTFOLIO</div>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(30px,4vw,50px)', fontWeight:600, color: T.indigoDeep, margin:0 }}>
            Wedding Gallery
          </h2>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gridAutoRows:220, gap:14 }}>
          {PORTFOLIO.map((img,i) => (
            <div key={i} className="gal-item" onClick={() => setModal(img)} style={{
              gridColumn: img.span === 2 ? 'span 2' : 'span 1',
              borderRadius:16, overflow:'hidden', cursor:'pointer', position:'relative',
            }}>
              <img src={img.url} alt={img.cap} className="gal-img" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(13,8,48,0.60) 0%,transparent 50%)', transition:'opacity 0.3s' }}/>
              <div className="gal-cap" style={{
                position:'absolute', bottom:14, left:14, opacity:0, transform:'translateY(6px)',
                background:'linear-gradient(135deg,#E8B890,#C8956B)',
                color: T.indigoDeep, fontSize:11, fontWeight:700,
                fontFamily:'Inter,sans-serif', letterSpacing:'0.05em',
                borderRadius:999, padding:'4px 12px',
                transition:'opacity 0.3s, transform 0.3s',
              }}>{img.cap}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 28px 80px' }}>
        <div style={{
          background:'linear-gradient(135deg,#E8B890 0%,#C8956B 50%,#A0714A 100%)',
          borderRadius:24, padding:'60px 48px', textAlign:'center', position:'relative', overflow:'hidden',
        }}>
          <div style={{ position:'absolute', right:-60, top:-60, width:280, height:280, borderRadius:'50%', background:'rgba(255,255,255,0.06)', pointerEvents:'none' }}/>
          <div style={{ position:'absolute', left:-40, bottom:-40, width:200, height:200, borderRadius:'50%', background:'rgba(255,255,255,0.06)', pointerEvents:'none' }}/>

          <div style={{ position:'relative', zIndex:1 }}>
            <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:22, fontStyle:'italic', color:'rgba(13,8,48,0.55)', marginBottom:10 }}>
              Begin Your Journey Together
            </div>
            <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(28px,4.5vw,52px)', fontWeight:600, color: T.indigoDeep, lineHeight:1.1, margin:'0 0 14px' }}>
              Ready to Plan Your Dream Wedding?
            </h3>
            <p style={{ fontFamily:'Inter,sans-serif', fontSize:17, color:'rgba(13,8,48,0.62)', marginBottom:36, maxWidth:480, marginLeft:'auto', marginRight:'auto', lineHeight:1.7 }}>
              Schedule a free consultation with our wedding expert and let's start creating magic.
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:14 }}>
              <Link to="/booking" className="btn-indigo">
                Book Free Consultation <FiArrowRight/>
              </Link>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Modal ── */}
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
              color:'#fff', fontSize:18, cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>✕</button>
            <div style={{
              position:'absolute', bottom:16, left:16,
              background:'linear-gradient(135deg,#E8B890,#C8956B)',
              color: T.indigoDeep, fontSize:12, fontWeight:700,
              fontFamily:'Inter,sans-serif', borderRadius:999, padding:'4px 14px',
            }}>{modal.cap}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeddingPage;
