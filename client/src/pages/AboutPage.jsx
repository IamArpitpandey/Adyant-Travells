import React from 'react';
import { Link } from 'react-router-dom';
import { FiAward, FiHeart, FiUsers, FiGlobe, FiArrowRight } from 'react-icons/fi';

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

  .sr { opacity:0; transform:translateY(26px); transition:opacity 0.6s ease, transform 0.6s ease; }
  .sr.visible { opacity:1; transform:translateY(0); }

  .value-card { transition: all 0.26s; }
  .value-card:hover { transform: translateY(-4px); box-shadow: 0 18px 50px rgba(13,8,48,0.11) !important; border-color: rgba(0,198,194,0.28) !important; }
  .value-card:hover .value-icon { transform: scale(1.12); }

  .team-card { transition: all 0.26s; }
  .team-card:hover { transform: translateY(-4px); box-shadow: 0 18px 50px rgba(13,8,48,0.11) !important; border-color: rgba(200,149,107,0.28) !important; }
  .team-card:hover .team-avatar { transform: scale(1.06); }

  .milestone-card { transition: all 0.26s; }
  .milestone-card:hover { border-color: rgba(0,198,194,0.30) !important; box-shadow: 0 14px 40px rgba(13,8,48,0.10) !important; }

  .eyebrow {
    display: inline-block; font-family: 'Inter',sans-serif; font-size: 12px;
    font-weight: 700; letter-spacing: 0.13em;
    border-radius: 999px; padding: 5px 16px;
  }
  .eyebrow-cyan { color: ${T.cyan}; background: rgba(0,198,194,0.10); border: 1px solid rgba(0,198,194,0.25); }
  .eyebrow-rose { color: ${T.rose}; background: rgba(200,149,107,0.12); border: 1px solid rgba(200,149,107,0.28); }
  .eyebrow-rose-light { color: ${T.roseLight}; background: rgba(232,184,144,0.15); border: 1px solid rgba(232,184,144,0.25); }

  .btn-rose {
    background: linear-gradient(135deg,#E8B890,#C8956B);
    color: ${T.indigoDeep}; font-weight: 700; padding: 13px 30px;
    border-radius: 12px; border: none; cursor: pointer;
    font-family: 'Inter',sans-serif; font-size: 15px;
    transition: transform 0.2s, box-shadow 0.2s;
    display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
  }
  .btn-rose:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(200,149,107,0.42); }

  .btn-outline {
    background: transparent; color: ${T.indigo};
    border: 1.5px solid rgba(26,16,96,0.18);
    font-weight: 600; padding: 13px 30px; border-radius: 12px; cursor: pointer;
    font-family: 'Inter',sans-serif; font-size: 15px;
    transition: all 0.2s; display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
  }
  .btn-outline:hover { border-color: ${T.cyan}; color: ${T.cyan}; }
`;

const useScrollReveal = () => {
  React.useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.sr').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
};

// ── Data ───────────────────────────────────────────────────
const TEAM = [
  { name:'Shudhakar Awasthi', role:'Founder & CEO',            desc:'With 15+ years in luxury travel and wedding planning, Shudhakar built this company on a vision of perfection.', avatar:'SA', accent: T.rose },
  { name:'Anjali Shukla',     role:'Head of Wedding Planning',  desc:'An award-winning wedding planner who has orchestrated 400+ dream weddings across India and abroad.', avatar:'AS', accent: T.cyan },
  { name:'Rohan Verma',       role:'Travel Director',           desc:'12 years of expertise crafting immersive travel experiences across 50+ countries worldwide.', avatar:'RV', accent: T.rose },
  { name:'Neha Gupta',        role:'Customer Relations',        desc:'Ensures every client feels like royalty — from the first inquiry to the last goodbye.', avatar:'NG', accent: T.cyan },
  { name:'Arjun Singh',       role:'Lead Decorator',            desc:'Transforms spaces into breathtaking masterpieces with a signature artistic touch and creativity.', avatar:'AS', accent: T.rose },
  { name:'Kavita Patel',      role:'Finance & Operations',      desc:'Keeps everything running smoothly, ensuring value for money and transparent pricing always.', avatar:'KP', accent: T.cyan },
];

const MILESTONES = [
  { year:'2015', title:'Foundation',              desc:'Adyant Travells was born with a simple mission: make travel and weddings extraordinary.' },
  { year:'2017', title:'Wedding Division',        desc:'Launched our dedicated wedding planning arm, quickly becoming the region\'s top planner.' },
  { year:'2019', title:'International Expansion', desc:'Expanded to international destinations — Bali, Dubai, Europe, and Southeast Asia.' },
  { year:'2021', title:'500 Weddings',            desc:'Celebrated our 500th wedding — a grand destination ceremony in Udaipur.' },
  { year:'2023', title:'Award Recognition',       desc:'Awarded "Best Wedding Planner — North India" and "Top Travel Agency" by Tourism Board.' },
  { year:'2024', title:'Digital Platform',        desc:'Launched our digital booking platform to serve clients across India seamlessly.' },
];

const VALUES = [
  { icon:<FiAward size={26}/>, title:'Excellence',    accent: T.rose, accentBg:'rgba(200,149,107,0.12)', desc:'We set the highest standards in every service we deliver, never settling for less than perfection.' },
  { icon:<FiHeart size={26}/>, title:'Passion',       accent:'#C060A0', accentBg:'rgba(192,96,160,0.10)', desc:'We genuinely care about making your moments magical — it\'s not just a job, it\'s our calling.' },
  { icon:<FiUsers size={26}/>, title:'Personal Touch', accent: T.cyan, accentBg:'rgba(0,198,194,0.12)', desc:'Every client is unique. We listen, understand, and craft experiences tailored just for you.' },
  { icon:<FiGlobe size={26}/>, title:'Global Reach',  accent:'#8060C0', accentBg:'rgba(128,96,192,0.10)', desc:'With partners across 50+ countries, we make the world accessible and extraordinary for you.' },
];

const STATS = [
  { num:'5,000+', label:'Happy Travelers',  icon:'✈' },
  { num:'800+',   label:'Weddings Planned', icon:'💍' },
  { num:'50+',    label:'Destinations',     icon:'🌍' },
  { num:'9+',     label:'Years Experience', icon:'🏆' },
];

// ── Component ──────────────────────────────────────────────
const AboutPage = () => {
  useScrollReveal();

  return (
    <div style={{ minHeight:'100vh', background: T.offWhite }}>
      <style>{styles}</style>

      {/* ── Hero ── */}
      <div style={{ position:'relative', height:'clamp(280px,38vw,420px)', overflow:'hidden' }}>
        <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80" alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(160deg,rgba(13,8,48,0.90) 0%,rgba(13,8,48,0.65) 55%,rgba(13,8,48,0.35) 100%)' }}/>
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'0 24px' }}>
          <div className="eyebrow eyebrow-rose-light" style={{ marginBottom:18 }}>OUR STORY</div>
          <h1 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(36px,5.5vw,66px)', fontWeight:600, color:'#fff', lineHeight:1.08, marginBottom:14 }}>
            About{' '}
            <span style={{ background:'linear-gradient(135deg,#E8B890,#C8956B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              Adyant Travells
            </span>
          </h1>
          <p style={{ fontFamily:'Inter,sans-serif', fontSize:17, color:'rgba(255,255,255,0.60)', maxWidth:480 }}>
            9 years of crafting unforgettable journeys and perfect celebrations
          </p>
        </div>
      </div>

      {/* ── Story Section ── */}
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'88px 28px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(360px,1fr))', gap:64, alignItems:'center' }}>
          <div className="sr">
            <div className="eyebrow eyebrow-cyan" style={{ marginBottom:14 }}>OUR STORY</div>
            <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(28px,4vw,46px)', fontWeight:600, color: T.indigoDeep, margin:'0 0 22px', lineHeight:1.2 }}>
              Where Every Journey Becomes a Memory
            </h2>
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              {[
                "Founded in 2025 by Shudhakar Awasthi, we started with a simple yet powerful belief: every person deserves to experience the world beautifully and celebrate life's milestones with absolute perfection.",
                "What began as a small travel consultancy in Lucknow has grown into one of North India's most trusted names in both luxury travel and wedding planning — serving thousands of happy clients across India and beyond.",
                "We bridge the gap between dream and reality. Whether it's a solo adventure, a family holiday, a honeymoon in the Maldives, or the most important day of your life — we handle every detail with care, creativity, and commitment.",
              ].map((p,i) => (
                <p key={i} style={{ fontFamily:'Inter,sans-serif', fontSize:15, color: T.textMuted, lineHeight:1.8, margin:0 }}>{p}</p>
              ))}
            </div>
          </div>

          <div className="sr" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80" alt="Wedding" style={{ borderRadius:18, height:280, width:'100%', objectFit:'cover' }}/>
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80" alt="Travel" style={{ borderRadius:18, height:280, width:'100%', objectFit:'cover', marginTop:36 }}/>
          </div>
        </div>
      </div>

      {/* ── Mission & Vision ── */}
      <div style={{ background:`linear-gradient(160deg,${T.indigoDeep} 0%,${T.indigoMid} 100%)`, padding:'88px 28px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-80, right:-80, width:340, height:340, borderRadius:'50%', background:'rgba(0,198,194,0.06)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:-60, left:-60, width:260, height:260, borderRadius:'50%', background:'rgba(200,149,107,0.07)', pointerEvents:'none' }}/>

        <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:24 }}>
            {[
              { icon:'🎯', title:'Our Mission', accent: T.cyan, accentBg:'rgba(0,198,194,0.12)', text:"To deliver extraordinary travel and wedding experiences that exceed every expectation — combining impeccable service, creative excellence, and genuine care for our clients' happiness at every step of their journey with us." },
              { icon:'🌟', title:'Our Vision',  accent: T.rose, accentBg:'rgba(200,149,107,0.15)', text:"To become India's most beloved travel and wedding planning company — recognized not just for stunning experiences, but for the relationships we build, the trust we earn, and the smiles we create for thousands of families across generations." },
            ].map((b,i) => (
              <div key={i} className="sr" style={{
                background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.10)',
                borderRadius:20, padding:'36px 36px',
              }}>
                <div style={{
                  width:54, height:54, borderRadius:14, background: b.accentBg,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:24, marginBottom:20,
                }}>{b.icon}</div>
                <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:30, fontWeight:600, color:'#fff', margin:'0 0 14px' }}>{b.title}</h3>
                <p style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'rgba(255,255,255,0.55)', lineHeight:1.8, margin:0 }}>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Core Values ── */}
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'88px 28px' }}>
        <div className="sr" style={{ textAlign:'center', marginBottom:56 }}>
          <div className="eyebrow eyebrow-cyan" style={{ marginBottom:14 }}>WHAT DRIVES US</div>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(30px,4vw,50px)', fontWeight:600, color: T.indigoDeep, margin:0 }}>
            Our Core Values
          </h2>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:20 }}>
          {VALUES.map((v,i) => (
            <div key={i} className="value-card sr" style={{
              background:'#fff', border:'1px solid rgba(26,16,96,0.08)',
              borderRadius:18, padding:'32px 26px', textAlign:'center',
            }}>
              <div className="value-icon" style={{
                width:64, height:64, borderRadius:18, background: v.accentBg, color: v.accent,
                display:'flex', alignItems:'center', justifyContent:'center',
                margin:'0 auto 18px', transition:'transform 0.25s',
              }}>{v.icon}</div>
              <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:23, fontWeight:600, color: T.indigoDeep, margin:'0 0 10px' }}>{v.title}</h3>
              <p style={{ fontFamily:'Inter,sans-serif', fontSize:14, color: T.textMuted, lineHeight:1.7, margin:0 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats ribbon ── */}
      <div style={{ background:'linear-gradient(135deg,#E8B890 0%,#C8956B 50%,#A0714A 100%)', padding:'48px 28px' }}>
        <div style={{ maxWidth:1000, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20, textAlign:'center' }}>
          {STATS.map((s,i) => (
            <div key={i} className="sr">
              <div style={{ fontSize:26, marginBottom:6 }}>{s.icon}</div>
              <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(26px,4vw,38px)', fontWeight:600, color: T.indigoDeep, lineHeight:1 }}>{s.num}</div>
              <div style={{ fontFamily:'Inter,sans-serif', fontSize:12, color:'rgba(13,8,48,0.60)', marginTop:4, letterSpacing:'0.04em' }}>{s.label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Timeline ── */}
      <div style={{ maxWidth:880, margin:'0 auto', padding:'88px 28px' }}>
        <div className="sr" style={{ textAlign:'center', marginBottom:56 }}>
          <div className="eyebrow eyebrow-rose" style={{ marginBottom:14 }}>OUR JOURNEY</div>
          <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(28px,4vw,46px)', fontWeight:600, color: T.indigoDeep, margin:0 }}>
            Milestones That Define Us
          </h2>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
          {MILESTONES.map((m,i) => (
            <div key={i} className="milestone-card sr" style={{
              display:'flex', alignItems:'flex-start', gap:20,
              background:'#fff', border:'1px solid rgba(26,16,96,0.08)',
              borderRadius:16, padding:'22px 26px',
            }}>
              <div style={{
                flexShrink:0, width:58, height:58, borderRadius:'50%',
                background: i % 2 === 0 ? 'linear-gradient(135deg,#00C6C2,#009E9B)' : 'linear-gradient(135deg,#E8B890,#C8956B)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontFamily:'Cormorant Garamond,serif', fontWeight:700, fontSize:17, color: T.indigoDeep,
              }}>{`'${m.year.slice(2)}`}</div>
              <div>
                <div style={{ fontFamily:'Inter,sans-serif', fontSize:12, fontWeight:700, letterSpacing:'0.08em', color: i % 2 === 0 ? T.cyan : T.rose, marginBottom:4 }}>{m.year}</div>
                <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:21, fontWeight:600, color: T.indigoDeep, margin:'0 0 4px' }}>{m.title}</h3>
                <p style={{ fontFamily:'Inter,sans-serif', fontSize:14, color: T.textMuted, lineHeight:1.6, margin:0 }}>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Team ── */}
      <div style={{ background:'#fff', padding:'88px 28px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div className="sr" style={{ textAlign:'center', marginBottom:56 }}>
            <div className="eyebrow eyebrow-cyan" style={{ marginBottom:14 }}>THE PEOPLE</div>
            <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(30px,4vw,50px)', fontWeight:600, color: T.indigoDeep, margin:0 }}>
              Meet Our Team
            </h2>
            <p style={{ fontFamily:'Inter,sans-serif', fontSize:16, color: T.textMuted, marginTop:14 }}>
              The passionate professionals behind every perfect experience
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(290px,1fr))', gap:22 }}>
            {TEAM.map((member,i) => (
              <div key={i} className="team-card sr" style={{
                background: T.offWhite, border:'1px solid rgba(26,16,96,0.07)',
                borderRadius:18, padding:'32px 26px', textAlign:'center',
              }}>
                <div className="team-avatar" style={{
                  width:74, height:74, borderRadius:'50%',
                  background: member.accent === T.cyan ? 'linear-gradient(135deg,#00C6C2,#009E9B)' : 'linear-gradient(135deg,#E8B890,#C8956B)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontFamily:'Cormorant Garamond,serif', fontWeight:700, fontSize:24, color: T.indigoDeep,
                  margin:'0 auto 18px', transition:'transform 0.25s',
                }}>{member.avatar}</div>
                <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:22, fontWeight:600, color: T.indigoDeep, margin:'0 0 4px' }}>{member.name}</h3>
                <div style={{ fontFamily:'Inter,sans-serif', fontSize:13, fontWeight:600, color: member.accent, marginBottom:12 }}>{member.role}</div>
                <p style={{ fontFamily:'Inter,sans-serif', fontSize:14, color: T.textMuted, lineHeight:1.7, margin:0 }}>{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ maxWidth:760, margin:'0 auto', padding:'88px 28px', textAlign:'center' }}>
        <div className="sr">
          <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(30px,4.5vw,50px)', fontWeight:600, color: T.indigoDeep, margin:'0 0 16px', lineHeight:1.15 }}>
            Ready to Create Your Story With Us?
          </h3>
          <p style={{ fontFamily:'Inter,sans-serif', fontSize:16, color: T.textMuted, marginBottom:32, lineHeight:1.7 }}>
            Whether you're planning a trip or a wedding, we're here to make it unforgettable.
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:14 }}>
            <Link to="/booking" className="btn-rose">
              Book a Consultation <FiArrowRight/>
            </Link>
            <Link to="/contact" className="btn-outline">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;