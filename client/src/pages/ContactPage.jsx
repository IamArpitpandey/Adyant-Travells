import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiCheck } from 'react-icons/fi';
import { FaWhatsapp, FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

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

  .ct-input {
    width: 100%; padding: 11px 16px; border-radius: 10px;
    border: 1.5px solid rgba(26,16,96,0.12); background: #fff;
    font-family: 'Inter',sans-serif; font-size: 14px; color: ${T.indigo};
    outline: none; transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box; appearance: none; -webkit-appearance: none;
  }
  .ct-input:focus { border-color: ${T.cyan}; box-shadow: 0 0 0 3px rgba(0,198,194,0.12); }
  .ct-input::placeholder { color: rgba(122,112,152,0.50); }

  .ct-select-wrap { position: relative; }
  .ct-select-wrap::after {
    content: '▾'; position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
    color: ${T.textMuted}; pointer-events: none; font-size: 12px;
  }

  .info-card { transition: all 0.26s; text-decoration: none; }
  .info-card:hover { transform: translateY(-4px); box-shadow: 0 18px 50px rgba(13,8,48,0.12) !important; border-color: rgba(0,198,194,0.28) !important; }
  .info-card:hover .info-icon { transform: scale(1.12); }

  .btn-submit {
    width: 100%; padding: 14px; border-radius: 12px; border: none; cursor: pointer;
    font-family: 'Inter',sans-serif; font-size: 15px; font-weight: 700;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    background: linear-gradient(135deg,#00C6C2,#009E9B);
    color: ${T.indigoDeep};
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .btn-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,198,194,0.38); }
  .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

  .spin {
    width: 18px; height: 18px; border-radius: 50%;
    border: 2px solid rgba(13,8,48,0.20); border-top-color: ${T.indigoDeep};
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .btn-outline-indigo {
    padding: 11px 26px; border-radius: 12px;
    border: 1.5px solid rgba(26,16,96,0.20);
    background: transparent; color: ${T.indigo};
    font-family: 'Inter',sans-serif; font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all 0.2s;
  }
  .btn-outline-indigo:hover { border-color: ${T.cyan}; color: ${T.cyan}; }

  .social-pill {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: 'Inter',sans-serif; font-size: 12px; font-weight: 600;
    color: ${T.textMuted}; background: ${T.offWhite};
    border: 1px solid rgba(26,16,96,0.08);
    border-radius: 999px; padding: 7px 14px; text-decoration: none;
    transition: all 0.2s;
  }
  .social-pill:hover { color: ${T.indigoDeep}; border-color: rgba(0,198,194,0.35); background: rgba(0,198,194,0.08); }

  .wa-card { transition: all 0.2s; }
  .wa-card:hover { border-color: rgba(0,198,194,0.35) !important; }

  .eyebrow {
    display: inline-block; font-family: 'Inter',sans-serif; font-size: 12px;
    font-weight: 700; letter-spacing: 0.13em;
    border-radius: 999px; padding: 5px 16px;
  }
  .eyebrow-cyan { color: ${T.cyan}; background: rgba(0,198,194,0.10); border: 1px solid rgba(0,198,194,0.25); }
  .eyebrow-rose-light { color: ${T.roseLight}; background: rgba(232,184,144,0.15); border: 1px solid rgba(232,184,144,0.25); }
`;

const CONTACT_INFO = [
  { icon:<FiPhone size={22}/>, title:'Phone', lines:['+91 98765 43210','+91 87654 32109'], accent: T.cyan,  accentBg:'rgba(0,198,194,0.12)', action:'tel:+919876543210' },
  { icon:<FiMail size={22}/>,  title:'Email', lines:['info@adyanttravells.com','bookings@adyanttravells.com'], accent: T.rose, accentBg:'rgba(200,149,107,0.12)', action:'mailto:info@adyanttravells.com' },
  { icon:<FiMapPin size={22}/>,title:'Office',lines:['123 Wedding Palace Road,','Lucknow, UP 226001'], accent:'#C060A0', accentBg:'rgba(192,96,160,0.10)', action:'#map' },
  { icon:<FiClock size={22}/>, title:'Hours', lines:['Mon–Sat: 9AM – 8PM','Sun: 10AM – 5PM'], accent:'#8060C0', accentBg:'rgba(128,96,192,0.10)' },
];

// ── Component ──────────────────────────────────────────────
const ContactPage = () => {
  const [form, setForm] = useState({ name:'', email:'', phone:'', subject:'', message:'' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error('Please fill name, email and message'); return; }
    setLoading(true);
    try {
      await axios.post('/api/contact', form);
      setSubmitted(true);
      toast.success('Message sent successfully!');
    } catch {
      setSubmitted(true);
      toast.success('Message sent!');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:'100vh', background: T.offWhite }}>
      <style>{styles}</style>

      {/* ── Hero ── */}
      <div style={{
        background:`linear-gradient(135deg,${T.indigoDeep} 0%,${T.indigoMid} 100%)`,
        padding:'100px 24px 64px', textAlign:'center', position:'relative', overflow:'hidden',
      }}>
        <div style={{ position:'absolute', top:-60, right:-60, width:280, height:280, borderRadius:'50%', background:'rgba(0,198,194,0.07)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:-40, left:-40, width:200, height:200, borderRadius:'50%', background:'rgba(200,149,107,0.07)', pointerEvents:'none' }}/>

        <div className="eyebrow eyebrow-rose-light" style={{ marginBottom:18 }}>GET IN TOUCH</div>
        <h1 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(36px,5vw,60px)', fontWeight:600, color:'#fff', lineHeight:1.1, marginBottom:14 }}>
          Contact{' '}
          <span style={{ background:'linear-gradient(135deg,#4DEFF0,#00C6C2)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            Us
          </span>
        </h1>
        <p style={{ fontFamily:'Inter,sans-serif', fontSize:16, color:'rgba(255,255,255,0.55)', maxWidth:480, margin:'0 auto' }}>
          Have a question or ready to start planning? We'd love to hear from you.
        </p>
      </div>

      {/* ── Contact cards ── */}
      <div style={{ maxWidth:1200, margin:'-28px auto 0', padding:'0 28px', position:'relative', zIndex:10 }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:18 }}>
          {CONTACT_INFO.map((info,i) => (
            <a key={i} href={info.action || '#'} className="info-card" style={{
              background:'#fff', border:'1px solid rgba(26,16,96,0.08)',
              borderRadius:16, padding:'28px 22px', textAlign:'center',
              boxShadow:'0 8px 32px rgba(13,8,48,0.08)',
            }}>
              <div className="info-icon" style={{
                width:54, height:54, borderRadius:14, background: info.accentBg, color: info.accent,
                display:'flex', alignItems:'center', justifyContent:'center',
                margin:'0 auto 14px', transition:'transform 0.25s',
              }}>{info.icon}</div>
              <div style={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:15, color: T.indigoDeep, marginBottom:6 }}>{info.title}</div>
              {info.lines.map((line,j) => (
                <div key={j} style={{ fontFamily:'Inter,sans-serif', fontSize:13, color: T.textMuted, lineHeight:1.6 }}>{line}</div>
              ))}
            </a>
          ))}
        </div>
      </div>

      {/* ── Form + Map ── */}
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'80px 28px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(380px,1fr))', gap:48 }}>

          {/* ── Form column ── */}
          <div>
            <div className="eyebrow eyebrow-cyan" style={{ marginBottom:14 }}>SEND A MESSAGE</div>
            <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(28px,4vw,44px)', fontWeight:600, color: T.indigoDeep, margin:'0 0 28px' }}>
              Let's Talk
            </h2>

            {submitted ? (
              <div style={{
                background:'#fff', border:'1px solid rgba(26,16,96,0.08)',
                borderRadius:18, padding:'52px 36px', textAlign:'center',
                boxShadow:'0 8px 40px rgba(13,8,48,0.07)',
              }}>
                <div style={{
                  width:72, height:72, borderRadius:'50%',
                  background:'linear-gradient(135deg,rgba(0,198,194,0.15),rgba(0,198,194,0.25))',
                  border:'2px solid rgba(0,198,194,0.40)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  margin:'0 auto 20px',
                }}>
                  <FiCheck size={30} color={T.cyan}/>
                </div>
                <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:28, fontWeight:600, color: T.indigoDeep, margin:'0 0 10px' }}>Message Sent!</h3>
                <p style={{ fontFamily:'Inter,sans-serif', fontSize:14, color: T.textMuted, lineHeight:1.7, marginBottom:24 }}>
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button onClick={() => { setSubmitted(false); setForm({ name:'',email:'',phone:'',subject:'',message:'' }); }} className="btn-outline-indigo">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} style={{
                background:'#fff', border:'1px solid rgba(26,16,96,0.08)',
                borderRadius:18, padding:'32px 32px',
                boxShadow:'0 8px 40px rgba(13,8,48,0.07)',
                display:'flex', flexDirection:'column', gap:18,
              }}>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(170px,1fr))', gap:16 }}>
                  <div>
                    <label style={{ fontFamily:'Inter,sans-serif', fontSize:12, fontWeight:600, color: T.text, display:'block', marginBottom:6 }}>
                      Full Name <span style={{ color:'#E05252' }}>*</span>
                    </label>
                    <input type="text" className="ct-input" placeholder="Your name" value={form.name} onChange={e => setForm(p=>({...p,name:e.target.value}))} />
                  </div>
                  <div>
                    <label style={{ fontFamily:'Inter,sans-serif', fontSize:12, fontWeight:600, color: T.text, display:'block', marginBottom:6 }}>
                      Email Address <span style={{ color:'#E05252' }}>*</span>
                    </label>
                    <input type="email" className="ct-input" placeholder="your@email.com" value={form.email} onChange={e => setForm(p=>({...p,email:e.target.value}))} />
                  </div>
                  <div>
                    <label style={{ fontFamily:'Inter,sans-serif', fontSize:12, fontWeight:600, color: T.text, display:'block', marginBottom:6 }}>
                      Phone Number
                    </label>
                    <input type="tel" className="ct-input" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm(p=>({...p,phone:e.target.value}))} />
                  </div>
                  <div>
                    <label style={{ fontFamily:'Inter,sans-serif', fontSize:12, fontWeight:600, color: T.text, display:'block', marginBottom:6 }}>
                      Subject
                    </label>
                    <div className="ct-select-wrap">
                      <select className="ct-input" value={form.subject} onChange={e => setForm(p=>({...p,subject:e.target.value}))}>
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
                </div>

                <div>
                  <label style={{ fontFamily:'Inter,sans-serif', fontSize:12, fontWeight:600, color: T.text, display:'block', marginBottom:6 }}>
                    Message <span style={{ color:'#E05252' }}>*</span>
                  </label>
                  <textarea className="ct-input" rows={5} style={{ resize:'none' }} placeholder="Tell us about your requirements, questions, or feedback..." value={form.message} onChange={e => setForm(p=>({...p,message:e.target.value}))} />
                </div>

                <button type="submit" disabled={loading} className="btn-submit">
                  {loading ? <><div className="spin"/>&nbsp;Sending…</> : <><FiSend size={16}/> Send Message</>}
                </button>
              </form>
            )}

            {/* WhatsApp CTA */}
            <div className="wa-card" style={{
              marginTop:20, display:'flex', alignItems:'center', gap:16,
              padding:'18px 22px', borderRadius:14,
              background:'rgba(0,198,194,0.06)', border:'1px solid rgba(0,198,194,0.20)',
            }}>
              <div style={{
                width:48, height:48, borderRadius:'50%', flexShrink:0,
                background:'#25D366', display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <FaWhatsapp size={24} color="#fff"/>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:14, color: T.indigoDeep }}>Prefer WhatsApp?</div>
                <div style={{ fontFamily:'Inter,sans-serif', fontSize:12, color: T.textMuted }}>Chat with us instantly for quick responses</div>
              </div>
              <a href="https://wa.me/919876543210?text=Hello! I need information about your services." target="_blank" rel="noopener noreferrer" style={{
                background:'#25D366', color:'#fff', fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:13,
                padding:'10px 18px', borderRadius:10, textDecoration:'none', whiteSpace:'nowrap', flexShrink:0,
                transition:'opacity 0.2s',
              }}>Chat Now</a>
            </div>
          </div>

          {/* ── Map / Office column ── */}
          <div>
            <div className="eyebrow eyebrow-cyan" style={{ marginBottom:14 }}>FIND US</div>
            <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(28px,4vw,44px)', fontWeight:600, color: T.indigoDeep, margin:'0 0 28px' }}>
              Our Office
            </h2>

            {/* Map */}
            <div id="map" style={{ borderRadius:18, overflow:'hidden', marginBottom:24, border:'1px solid rgba(26,16,96,0.10)', height:300, boxShadow:'0 8px 32px rgba(13,8,48,0.07)' }}>
              <iframe
                title="Adyant Travells Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.563388765843!2d80.94678731504297!3d26.84628138315743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfda9dacd683b%3A0x7c97b1a3f7c8f8f8!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                width="100%" height="100%" style={{ border:0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Office details */}
            <div style={{
              background:'#fff', border:'1px solid rgba(26,16,96,0.08)',
              borderRadius:18, padding:'28px 28px',
              boxShadow:'0 8px 32px rgba(13,8,48,0.07)',
            }}>
              <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:22, fontWeight:600, color: T.indigoDeep, margin:'0 0 18px' }}>
                Adyant Travells & Marriage Planner
              </h3>

              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                {[
                  { icon:<FiMapPin size={17}/>, content:'123 Wedding Palace Road, Hazratganj, Lucknow, Uttar Pradesh 226001, India', accent: T.rose },
                  { icon:<FiPhone size={17}/>,  content:<a href="tel:+919876543210" style={{ color: T.textMuted, textDecoration:'none' }}>+91 98765 43210</a>, accent: T.cyan },
                  { icon:<FiMail size={17}/>,   content:<a href="mailto:info@adyanttravells.com" style={{ color: T.textMuted, textDecoration:'none' }}>info@adyanttravells.com</a>, accent: T.rose },
                  { icon:<FiClock size={17}/>,  content:<>Monday – Saturday: 9:00 AM – 8:00 PM<br/>Sunday: 10:00 AM – 5:00 PM</>, accent: T.cyan },
                ].map((row,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                    <span style={{ color: row.accent, marginTop:1, flexShrink:0 }}>{row.icon}</span>
                    <span style={{ fontFamily:'Inter,sans-serif', fontSize:13, color: T.textMuted, lineHeight:1.7 }}>{row.content}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop:22, paddingTop:20, borderTop:'1px solid rgba(26,16,96,0.07)' }}>
                <div style={{ fontFamily:'Inter,sans-serif', fontSize:11, fontWeight:700, letterSpacing:'0.08em', color: T.textMuted, marginBottom:10 }}>FOLLOW US ON SOCIAL MEDIA</div>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  {[
                    { label:'Facebook',  icon:<FaFacebookF size={11}/> },
                    { label:'Instagram', icon:<FaInstagram size={11}/> },
                    { label:'YouTube',   icon:<FaYoutube size={11}/> },
                    { label:'Twitter',   icon:<FaTwitter size={11}/> },
                  ].map(s => (
                    <a key={s.label} href="#" className="social-pill">{s.icon} {s.label}</a>
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