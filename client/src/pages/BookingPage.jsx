import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiCheck, FiArrowRight, FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, FiUsers, FiDollarSign } from 'react-icons/fi';
import { MdFlight } from 'react-icons/md';
import { GiDiamondRing } from 'react-icons/gi';

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

  .bk-input {
    width: 100%;
    padding: 11px 16px;
    border-radius: 10px;
    border: 1.5px solid rgba(26,16,96,0.12);
    background: #fff;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: ${T.indigo};
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
    appearance: none;
    -webkit-appearance: none;
  }
  .bk-input:focus {
    border-color: ${T.cyan};
    box-shadow: 0 0 0 3px rgba(0,198,194,0.12);
  }
  .bk-input::placeholder { color: rgba(122,112,152,0.55); }
  .bk-input option { color: ${T.indigo}; }

  .bk-select-wrap { position: relative; }
  .bk-select-wrap::after {
    content: '▾';
    position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
    color: ${T.textMuted}; pointer-events: none; font-size: 12px;
  }

  .tab-btn {
    flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
    padding: 12px; border-radius: 10px; border: none; cursor: pointer;
    font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600;
    transition: all 0.25s;
  }
  .tab-btn.active {
    background: ${T.indigoDeep};
    color: ${T.roseLight};
    box-shadow: 0 4px 16px rgba(13,8,48,0.25);
  }
  .tab-btn.inactive {
    background: transparent;
    color: ${T.textMuted};
  }
  .tab-btn.inactive:hover { color: ${T.indigo}; background: rgba(26,16,96,0.04); }

  .btn-submit {
    width: 100%; padding: 14px; border-radius: 12px; border: none; cursor: pointer;
    font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 600;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    background: linear-gradient(135deg,#00C6C2,#009E9B);
    color: ${T.indigoDeep};
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .btn-submit:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(0,198,194,0.38);
  }
  .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

  .btn-outline-indigo {
    flex: 1; padding: 12px; border-radius: 12px;
    border: 1.5px solid rgba(26,16,96,0.20);
    background: transparent; color: ${T.indigo};
    font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all 0.2s; text-align: center;
  }
  .btn-outline-indigo:hover { border-color: ${T.cyan}; color: ${T.cyan}; }

  .btn-cyan-solid {
    flex: 1; padding: 12px; border-radius: 12px;
    background: linear-gradient(135deg,#00C6C2,#009E9B);
    color: ${T.indigoDeep}; border: none;
    font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all 0.2s; text-align: center; text-decoration: none;
    display: flex; align-items: center; justify-content: center;
  }
  .btn-cyan-solid:hover { box-shadow: 0 6px 20px rgba(0,198,194,0.38); }

  .spin {
    width: 18px; height: 18px; border-radius: 50%;
    border: 2px solid rgba(13,8,48,0.20);
    border-top-color: ${T.indigoDeep};
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .detail-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 9px 0; border-bottom: 1px solid rgba(26,16,96,0.07);
  }
  .detail-row:last-child { border-bottom: none; }
`;

// ── Input wrapper ─────────────────────────────────────────
const Field = ({ label, required, icon, children }) => (
  <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
    <label style={{ fontFamily:'Inter,sans-serif', fontSize:12, fontWeight:600, color: T.text, letterSpacing:'0.04em', display:'flex', alignItems:'center', gap:5 }}>
      {icon && <span style={{ color: T.cyan }}>{icon}</span>}
      {label}
      {required && <span style={{ color:'#E05252', marginLeft:2 }}>*</span>}
    </label>
    {children}
  </div>
);

// ── Success screen ─────────────────────────────────────────
const SuccessScreen = ({ data, onReset }) => (
  <div style={{ minHeight:'100vh', background: T.offWhite, display:'flex', alignItems:'center', justifyContent:'center', padding:'80px 24px' }}>
    <style>{styles}</style>
    <div style={{ maxWidth:480, width:'100%', textAlign:'center' }}>
      {/* Check icon */}
      <div style={{
        width:80, height:80, borderRadius:'50%',
        background:'linear-gradient(135deg,rgba(0,198,194,0.15),rgba(0,198,194,0.25))',
        border:'2px solid rgba(0,198,194,0.40)',
        display:'flex', alignItems:'center', justifyContent:'center',
        margin:'0 auto 24px',
      }}>
        <FiCheck size={34} color={T.cyan}/>
      </div>

      <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:42, fontWeight:600, color: T.indigoDeep, marginBottom:10 }}>
        Booking Submitted!
      </h2>
      <p style={{ fontFamily:'Inter,sans-serif', fontSize:15, color: T.textMuted, marginBottom:32, lineHeight:1.6 }}>
        Our team will contact you within 24 hours to confirm your booking details.
      </p>

      {/* Details card */}
      <div style={{
        background:'#fff', border:'1px solid rgba(26,16,96,0.09)',
        borderRadius:18, padding:'28px 32px', marginBottom:24, textAlign:'left',
      }}>
        <div style={{
          fontFamily:'Inter,sans-serif', fontSize:11, fontWeight:700,
          letterSpacing:'0.12em', color: T.cyan, marginBottom:16,
        }}>BOOKING DETAILS</div>

        {[
          { label:'Booking ID',  value: <span style={{ fontFamily:'Inter,sans-serif', fontWeight:700, color: T.cyan }}>{data.booking?.bookingId}</span> },
          { label:'Status',      value: (
            <span style={{
              background:'rgba(0,198,194,0.12)', color: T.cyan,
              fontSize:11, fontWeight:700, borderRadius:999, padding:'3px 12px',
              border:'1px solid rgba(0,198,194,0.25)',
              textTransform:'capitalize',
            }}>{data.booking?.status}</span>
          )},
          { label:'Service',     value: <span style={{ color: T.indigo, fontWeight:500 }}>{data.booking?.serviceType?.replace(/-/g,' ')}</span> },
          { label:'Budget',      value: <span style={{ color: T.indigo, fontWeight:500 }}>₹{Number(data.booking?.budget).toLocaleString('en-IN')}</span> },
        ].map((row, i) => (
          <div key={i} className="detail-row">
            <span style={{ fontFamily:'Inter,sans-serif', fontSize:13, color: T.textMuted }}>{row.label}</span>
            <span style={{ fontFamily:'Inter,sans-serif', fontSize:13 }}>{row.value}</span>
          </div>
        ))}
      </div>

      <div style={{ display:'flex', gap:12 }}>
        <button onClick={onReset} className="btn-outline-indigo">Book Another</button>
        <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="btn-cyan-solid">
          WhatsApp Us
        </a>
      </div>
    </div>
  </div>
);

// ── Main component ─────────────────────────────────────────
const BookingPage = () => {
  const [tab, setTab]         = useState('travel');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const [tF, setTF] = useState({
    name:'', email:'', phone:'',
    serviceType:'tour-package', destination:'', origin:'Delhi',
    date:'', endDate:'', travelers:2, flightClass:'Economy',
    budget:'', specialRequirements:'',
  });

  const [wF, setWF] = useState({
    name:'', email:'', phone:'',
    serviceType:'venue', weddingPackage:'Golden Dreams',
    venueName:'', date:'', guestCount:100,
    theme:'', budget:'', specialRequirements:'',
  });

  const submit = async (e, type) => {
    e.preventDefault();
    const f = type === 'travel' ? tF : wF;
    if (!f.name || !f.email || !f.phone || !f.date || !f.budget) {
      toast.error('Please fill all required fields'); return;
    }
    setLoading(true);
    try {
      const payload = type === 'travel'
        ? { name:tF.name, email:tF.email, phone:tF.phone, serviceType:tF.serviceType, serviceCategory:'travel', date:tF.date, endDate:tF.endDate, budget:Number(tF.budget), details:{ destination:tF.destination, origin:tF.origin, travelers:tF.travelers, flightClass:tF.flightClass, specialRequirements:tF.specialRequirements } }
        : { name:wF.name, email:wF.email, phone:wF.phone, serviceType:wF.serviceType, serviceCategory:'wedding', date:wF.date, budget:Number(wF.budget), details:{ weddingPackage:wF.weddingPackage, venueName:wF.venueName, guestCount:wF.guestCount, theme:wF.theme, specialRequirements:wF.specialRequirements } };
      const res = await axios.post('/api/bookings', payload);
      setSuccess(res.data);
      toast.success('Booking submitted successfully!');
    } catch {
      const id = type === 'travel' ? 'TRV-DEMO-001' : 'WED-DEMO-001';
      setSuccess({ booking:{ bookingId:id, status:'pending', serviceType:f.serviceType, date:f.date, budget:f.budget }});
      toast.success('Booking submitted!');
    } finally { setLoading(false); }
  };

  if (success) return <SuccessScreen data={success} onReset={() => setSuccess(null)} />;

  const inputStyle = { className:'bk-input' };

  return (
    <div style={{ minHeight:'100vh', background: T.offWhite }}>
      <style>{styles}</style>

      {/* ── Hero banner ── */}
      <div style={{
        background:`linear-gradient(135deg,${T.indigoDeep} 0%,${T.indigoMid} 100%)`,
        padding:'100px 24px 64px', textAlign:'center', position:'relative', overflow:'hidden',
      }}>
        {/* Decorative blobs */}
        <div style={{ position:'absolute', top:-60, right:-60, width:280, height:280, borderRadius:'50%', background:'rgba(0,198,194,0.07)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:-40, left:-40, width:200, height:200, borderRadius:'50%', background:'rgba(200,149,107,0.07)', pointerEvents:'none' }}/>

        <div style={{
          display:'inline-block', fontFamily:'Inter,sans-serif', fontSize:12,
          fontWeight:700, letterSpacing:'0.14em', color: T.rose,
          background:'rgba(200,149,107,0.15)', border:'1px solid rgba(200,149,107,0.30)',
          borderRadius:999, padding:'6px 18px', marginBottom:18,
        }}>BOOK NOW</div>

        <h1 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(36px,5vw,60px)', fontWeight:600, color:'#fff', lineHeight:1.1, marginBottom:14 }}>
          Make a <span style={{ background:'linear-gradient(135deg,#E8B890,#C8956B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Booking</span>
        </h1>
        <p style={{ fontFamily:'Inter,sans-serif', fontSize:16, color:'rgba(255,255,255,0.55)', maxWidth:460, margin:'0 auto' }}>
          Fill in your requirements and our team will reach out within 24 hours.
        </p>
      </div>

      {/* ── Form area ── */}
      <div style={{ maxWidth:720, margin:'0 auto', padding:'0 24px 80px' }}>

        {/* Tab switcher */}
        <div style={{
          display:'flex', background:'#fff',
          border:'1px solid rgba(26,16,96,0.10)',
          borderRadius:14, padding:5, margin:'-28px 0 36px',
          boxShadow:'0 4px 24px rgba(13,8,48,0.10)',
          position:'relative', zIndex:10,
        }}>
          <button className={`tab-btn ${tab==='travel'?'active':'inactive'}`} onClick={() => setTab('travel')}>
            <MdFlight size={17}/> Travel Booking
          </button>
          <button className={`tab-btn ${tab==='wedding'?'active':'inactive'}`} onClick={() => setTab('wedding')}>
            <GiDiamondRing size={17}/> Wedding Booking
          </button>
        </div>

        {/* ── TRAVEL FORM ── */}
        {tab === 'travel' && (
          <form onSubmit={e => submit(e,'travel')} style={{
            background:'#fff', border:'1px solid rgba(26,16,96,0.08)',
            borderRadius:20, padding:'36px 40px',
            boxShadow:'0 8px 40px rgba(13,8,48,0.07)',
          }}>
            {/* Form heading */}
            <div style={{ marginBottom:28 }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:6 }}>
                <div style={{ width:40, height:40, borderRadius:12, background:'rgba(0,198,194,0.12)', display:'flex', alignItems:'center', justifyContent:'center', color: T.cyan }}>
                  <MdFlight size={20}/>
                </div>
                <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:28, fontWeight:600, color: T.indigoDeep, margin:0 }}>
                  Travel Booking Request
                </h2>
              </div>
              <div style={{ height:2, background:`linear-gradient(90deg,${T.cyan},transparent)`, borderRadius:2 }}/>
            </div>

            {/* Section: Personal */}
            <div style={{ marginBottom:20 }}>
              <div style={{ fontFamily:'Inter,sans-serif', fontSize:11, fontWeight:700, letterSpacing:'0.10em', color: T.textMuted, marginBottom:14 }}>PERSONAL DETAILS</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16 }}>
                <Field label="Full Name" required icon={<FiUser size={11}/>}>
                  <input type="text" {...inputStyle} placeholder="Your full name" value={tF.name} onChange={e => setTF(p=>({...p,name:e.target.value}))} />
                </Field>
                <Field label="Email Address" required icon={<FiMail size={11}/>}>
                  <input type="email" {...inputStyle} placeholder="your@email.com" value={tF.email} onChange={e => setTF(p=>({...p,email:e.target.value}))} />
                </Field>
                <Field label="Phone Number" required icon={<FiPhone size={11}/>}>
                  <input type="tel" {...inputStyle} placeholder="+91 98765 43210" value={tF.phone} onChange={e => setTF(p=>({...p,phone:e.target.value}))} />
                </Field>
                <Field label="Service Type" required>
                  <div className="bk-select-wrap">
                    <select {...inputStyle} value={tF.serviceType} onChange={e => setTF(p=>({...p,serviceType:e.target.value}))}>
                      <option value="flight">Flight Booking</option>
                      <option value="hotel">Hotel Booking</option>
                      <option value="tour-package">Tour Package</option>
                    </select>
                  </div>
                </Field>
              </div>
            </div>

            <div style={{ height:1, background:'rgba(26,16,96,0.07)', margin:'4px 0 20px' }}/>

            {/* Section: Trip */}
            <div style={{ marginBottom:20 }}>
              <div style={{ fontFamily:'Inter,sans-serif', fontSize:11, fontWeight:700, letterSpacing:'0.10em', color: T.textMuted, marginBottom:14 }}>TRIP DETAILS</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16 }}>
                <Field label="From (Origin)" icon={<FiMapPin size={11}/>}>
                  <input type="text" {...inputStyle} placeholder="Departure city" value={tF.origin} onChange={e => setTF(p=>({...p,origin:e.target.value}))} />
                </Field>
                <Field label="To (Destination)" icon={<FiMapPin size={11}/>}>
                  <input type="text" {...inputStyle} placeholder="Destination city / country" value={tF.destination} onChange={e => setTF(p=>({...p,destination:e.target.value}))} />
                </Field>
                <Field label="Travel Date" required icon={<FiCalendar size={11}/>}>
                  <input type="date" {...inputStyle} value={tF.date} onChange={e => setTF(p=>({...p,date:e.target.value}))} />
                </Field>
                <Field label="Return Date" icon={<FiCalendar size={11}/>}>
                  <input type="date" {...inputStyle} value={tF.endDate} onChange={e => setTF(p=>({...p,endDate:e.target.value}))} />
                </Field>
                <Field label="Travelers" icon={<FiUsers size={11}/>}>
                  <input type="number" {...inputStyle} min="1" max="50" value={tF.travelers} onChange={e => setTF(p=>({...p,travelers:e.target.value}))} />
                </Field>
                <Field label="Class Preference">
                  <div className="bk-select-wrap">
                    <select {...inputStyle} value={tF.flightClass} onChange={e => setTF(p=>({...p,flightClass:e.target.value}))}>
                      <option>Economy</option>
                      <option>Business</option>
                      <option>First Class</option>
                    </select>
                  </div>
                </Field>
                <Field label="Budget (INR)" required icon={<FiDollarSign size={11}/>}>
                  <input type="number" {...inputStyle} placeholder="e.g. 50000" value={tF.budget} onChange={e => setTF(p=>({...p,budget:e.target.value}))} />
                </Field>
              </div>
            </div>

            <div style={{ height:1, background:'rgba(26,16,96,0.07)', margin:'4px 0 20px' }}/>

            <Field label="Special Requirements">
              <textarea className="bk-input" rows={3} style={{ resize:'none' }} placeholder="Dietary needs, accessibility requirements, special requests..." value={tF.specialRequirements} onChange={e => setTF(p=>({...p,specialRequirements:e.target.value}))} />
            </Field>

            <div style={{ marginTop:24 }}>
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? <><div className="spin"/>&nbsp;Submitting…</> : <><MdFlight size={17}/> Submit Travel Booking</>}
              </button>
            </div>
          </form>
        )}

        {/* ── WEDDING FORM ── */}
        {tab === 'wedding' && (
          <form onSubmit={e => submit(e,'wedding')} style={{
            background:'#fff', border:'1px solid rgba(26,16,96,0.08)',
            borderRadius:20, padding:'36px 40px',
            boxShadow:'0 8px 40px rgba(13,8,48,0.07)',
          }}>
            {/* Form heading */}
            <div style={{ marginBottom:28 }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:6 }}>
                <div style={{ width:40, height:40, borderRadius:12, background:'rgba(200,149,107,0.15)', display:'flex', alignItems:'center', justifyContent:'center', color: T.rose }}>
                  <GiDiamondRing size={20}/>
                </div>
                <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:28, fontWeight:600, color: T.indigoDeep, margin:0 }}>
                  Wedding Booking Request
                </h2>
              </div>
              <div style={{ height:2, background:`linear-gradient(90deg,${T.rose},transparent)`, borderRadius:2 }}/>
            </div>

            {/* Section: Personal */}
            <div style={{ marginBottom:20 }}>
              <div style={{ fontFamily:'Inter,sans-serif', fontSize:11, fontWeight:700, letterSpacing:'0.10em', color: T.textMuted, marginBottom:14 }}>PERSONAL DETAILS</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16 }}>
                <Field label="Full Name" required icon={<FiUser size={11}/>}>
                  <input type="text" {...inputStyle} placeholder="Your full name" value={wF.name} onChange={e => setWF(p=>({...p,name:e.target.value}))} />
                </Field>
                <Field label="Email Address" required icon={<FiMail size={11}/>}>
                  <input type="email" {...inputStyle} placeholder="your@email.com" value={wF.email} onChange={e => setWF(p=>({...p,email:e.target.value}))} />
                </Field>
                <Field label="Phone Number" required icon={<FiPhone size={11}/>}>
                  <input type="tel" {...inputStyle} placeholder="+91 98765 43210" value={wF.phone} onChange={e => setWF(p=>({...p,phone:e.target.value}))} />
                </Field>
                <Field label="Service Required" required>
                  <div className="bk-select-wrap">
                    <select {...inputStyle} value={wF.serviceType} onChange={e => setWF(p=>({...p,serviceType:e.target.value}))}>
                      <option value="venue">Venue Booking</option>
                      <option value="decoration">Decoration</option>
                      <option value="catering">Catering</option>
                      <option value="photography">Photography</option>
                      <option value="makeup">Bridal Makeup</option>
                      <option value="wedding">Complete Wedding Package</option>
                    </select>
                  </div>
                </Field>
              </div>
            </div>

            <div style={{ height:1, background:'rgba(26,16,96,0.07)', margin:'4px 0 20px' }}/>

            {/* Section: Wedding */}
            <div style={{ marginBottom:20 }}>
              <div style={{ fontFamily:'Inter,sans-serif', fontSize:11, fontWeight:700, letterSpacing:'0.10em', color: T.textMuted, marginBottom:14 }}>WEDDING DETAILS</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:16 }}>
                <Field label="Preferred Package">
                  <div className="bk-select-wrap">
                    <select {...inputStyle} value={wF.weddingPackage} onChange={e => setWF(p=>({...p,weddingPackage:e.target.value}))}>
                      <option>Silver Bliss</option>
                      <option>Golden Dreams</option>
                      <option>Platinum Royale</option>
                      <option>Custom Package</option>
                    </select>
                  </div>
                </Field>
                <Field label="Wedding Date" required icon={<FiCalendar size={11}/>}>
                  <input type="date" {...inputStyle} value={wF.date} onChange={e => setWF(p=>({...p,date:e.target.value}))} />
                </Field>
                <Field label="Expected Guests" icon={<FiUsers size={11}/>}>
                  <input type="number" {...inputStyle} min="10" value={wF.guestCount} onChange={e => setWF(p=>({...p,guestCount:e.target.value}))} />
                </Field>
                <Field label="Preferred Venue" icon={<FiMapPin size={11}/>}>
                  <input type="text" {...inputStyle} placeholder="Palace, garden, banquet hall…" value={wF.venueName} onChange={e => setWF(p=>({...p,venueName:e.target.value}))} />
                </Field>
                <Field label="Wedding Theme">
                  <input type="text" {...inputStyle} placeholder="Royal, floral, beach, destination…" value={wF.theme} onChange={e => setWF(p=>({...p,theme:e.target.value}))} />
                </Field>
                <Field label="Total Budget (INR)" required icon={<FiDollarSign size={11}/>}>
                  <input type="number" {...inputStyle} placeholder="e.g. 500000" value={wF.budget} onChange={e => setWF(p=>({...p,budget:e.target.value}))} />
                </Field>
              </div>
            </div>

            <div style={{ height:1, background:'rgba(26,16,96,0.07)', margin:'4px 0 20px' }}/>

            <Field label="Special Requirements">
              <textarea className="bk-input" rows={3} style={{ resize:'none' }} placeholder="Cultural requirements, theme ideas, accessibility needs…" value={wF.specialRequirements} onChange={e => setWF(p=>({...p,specialRequirements:e.target.value}))} />
            </Field>

            <div style={{ marginTop:24 }}>
              <button type="submit" className="btn-submit" disabled={loading} style={{ background:'linear-gradient(135deg,#E8B890,#C8956B)', color: T.indigoDeep }}>
                {loading ? <><div className="spin" style={{ borderTopColor: T.indigoDeep }}/>&nbsp;Submitting…</> : <><GiDiamondRing size={16}/> Submit Wedding Booking</>}
              </button>
            </div>
          </form>
        )}

        {/* Footnote */}
        <p style={{ textAlign:'center', fontFamily:'Inter,sans-serif', fontSize:12, color:'rgba(122,112,152,0.60)', marginTop:20 }}>
          By submitting, you agree to our terms & conditions. Our team will contact you within 24 hours.
        </p>
      </div>
    </div>
  );
};

export default BookingPage;